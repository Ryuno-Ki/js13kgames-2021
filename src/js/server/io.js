import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  MAXIMUM_GAME_SIZE,
  MAXIMUM_TURNS,
  SOCKET_ADD_USER,
  SOCKET_KEY_UP,
  SOCKET_NAVIGATE,
  SOCKET_SELECT_MODE,
  SOCKET_START,
  SOCKET_SYNC
} from '../constants.js'
import { getLogger } from '../logger.js'

import { degToRad } from './deg-to-rad.js'
import { polarToCartesian } from './polar-to-cartesian.js'
import { addName } from './state/actions/add-name.js'
import { addPoint } from './state/actions/add-point.js'
import { connect } from './state/actions/connect.js'
import { disconnect } from './state/actions/disconnect.js'
import { joinGame } from './state/actions/join-game.js'
import { navigate } from './state/actions/navigate.js'
import { selectMode } from './state/actions/select-mode.js'
import { swapUser } from './state/actions/swap-user.js'
import { updateTimer } from './state/actions/update-timer.js'
import store from './state/store.js'

/** @typedef {*} Socket */

/**
 * @typedef {object} AddUserDetails
 * @property {string} AddUserDetails.name
 */

/**
 * @typedef {object} NavigateDetails
 * @property {string} NavigateDetails.scene
 */

/**
 * @typedef {object} OnKeyUpDetails
 * @property {number} [OnKeyUpDetails.delta]
 * @property {number} [OnKeyUpDetails.direction]
 */

/**
 * @typedef {object} SelectModeDetails
 * @property {string} SelectModeDetails.mode
 */

const center = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 }
const delay = 1000
const logger = getLogger('io')
/** @type {Record<string, *>} */
const sockets = {}

let nextAi = 0

/**
 * Socket.io wrapper
 *
 * @param {Socket} socket
 */
export async function io (socket) {
  /** @type {* | null} */
  let handle = null

  await store.dispatch(connect(socket.id))
  sockets[socket.id] = socket

  socket.on('disconnect', async () => await onDisconnect(socket))
  socket.on(SOCKET_ADD_USER, async (/** @type {AddUserDetails} */details) => {
    await store.dispatch(addName(socket.id, details.name))
  })

  socket.on(SOCKET_NAVIGATE, async (/** @type {NavigateDetails} */details) => {
    await store.dispatch(navigate(socket.id, details.scene))
  })

  socket.on(
    SOCKET_SELECT_MODE,
    async (/** @type {SelectModeDetails} */details) => {
      await store.dispatch(selectMode(socket.id, details.mode))
      let game

      switch (details.mode) {
        case 'new':
          await populateWithBots(socket.id)

          socket.emit(
            SOCKET_START,
            { role: ROLE_HOST, ...store.getGameForHost(socket.id) }
          )

          syncPoints(socket.id)
          break

        case 'join':
          game = store.findGameAvailableForJoin()

          if (game) {
            await store.dispatch(
              swapUser(
                socket.id,
                game.opponents.find(
                  (/** @type {string} */o) => o.startsWith('AI-')
                )
              )
            )

            // TODO: This breaks setParty() on the client right now
            socket.emit(
              SOCKET_START,
              { role: ROLE_OPPONENT, ...store.getPointsForOpponents(socket.id) }
            )
            syncPoints(socket.id)
          }
          break
        default:
          // noop
      }
    }
  )

  socket.on(SOCKET_KEY_UP, async (/** @type {OnKeyUpDetails} */details) => {
    if (details.delta) {
      // Host case
      await store.dispatch(addPoint(socket.id, mapDeltaToPoint(details.delta)))
      await store.dispatch(addPoint(socket.id, { ...center }))
      syncPoints(socket.id)
    } else if (details.direction) {
      // Opponents case
      await store.dispatch(
        addPoint(socket.id, mapDirectionToPoint(socket.id, details.direction))
      )

      socket.emit(
        SOCKET_SYNC,
        { role: ROLE_OPPONENT, points: store.getPointsForOpponents(socket.id) }
      )
    }
  })

  // TODO: Figure out how to not leak memory here
  // It should be cleared if all bots were replaced ideally
  handle = setInterval(async () => {
    const game = store.getGameForHost(socket.id)

    if (!game) {
      return
    }

    store
      .getOpponentIdsOfHost(socket.id)
      .filter((/** @type {string} */id) => id.startsWith('AI-'))
      .forEach(async (/** @type {string} */opponentId) => {
        await moveBot(opponentId)
        socket.emit(
          SOCKET_SYNC,
          { role: ROLE_OPPONENT, points: store.getPointsForOpponents(opponentId) }
        )
      })

    await store.dispatch(updateTimer(socket.id))
    const gameOver = await isGameOver(socket.id)

    if (gameOver) {
      clearInterval(handle)
    }
  }, delay)

  logger.info(`Connected: ${socket.id}`)
}

/**
 * Clean up on disconnect.
 *
 * @param {*} socket
 */
async function onDisconnect (socket) {
  logger.info(`Disconnected: ${socket.id}`)
  await store.dispatch(disconnect(socket.id))
}

/**
 * Computes the cartesian coordinates for a pointed added by host.
 *
 * @param {number} delta
 * @returns {*}
 */
function mapDeltaToPoint (delta) {
  // Arbitrary
  const distanceFromCenter = 10 * 13

  const { x, y } = polarToCartesian({
    radius: delta * distanceFromCenter % center.y,
    angle: degToRad(Math.floor((Date.now() / 100) % 360))
  })

  return {
    x: Math.floor(center.x + x),
    y: Math.floor(center.y + y)
  }
}

/**
 * Computes the next point based on the chosen direction.
 *
 * @param {string} socketId
 * @param {number} direction
 * @returns {*}
 */
function mapDirectionToPoint (socketId, direction) {
  let xDelta = 0
  let yDelta = 0

  const points = store.getPointsForOpponent(socketId)
  const [x, y] = points[points.length - 1]

  switch (direction) {
    case DIRECTION_BOTTOM:
      if (y + CANVAS_HEIGHT / 10 <= CANVAS_HEIGHT) {
        yDelta = CANVAS_HEIGHT / 10
      }
      break
    case DIRECTION_LEFT:
      if (x - CANVAS_WIDTH / 10 >= 0) {
        xDelta = -1 * CANVAS_WIDTH / 10
      }
      break
    case DIRECTION_RIGHT:
      if (x + CANVAS_WIDTH / 10 <= CANVAS_WIDTH) {
        xDelta = CANVAS_WIDTH / 10
      }
      break
    case DIRECTION_TOP:
      if (y - CANVAS_HEIGHT / 10 >= 0) {
        yDelta = -1 * CANVAS_HEIGHT / 10
      }
      break
    default:
      // noop
  }

  return {
    x: x + xDelta,
    y: y + yDelta
  }
}

/**
 * Populate a game with bots until human players join.
 *
 * @param {string} socketId
 */
async function populateWithBots (socketId) {
  for (let i = 0; i < MAXIMUM_GAME_SIZE - 1; i++) {
    const id = `AI-${nextAi}`
    await store.dispatch(addName(id, `Bot No. ${nextAi}`))
    await store.dispatch(selectMode(id, 'join'))
    await store.dispatch(joinGame(id, socketId))
    nextAi += 1
  }
}

/**
 * Move bot.
 *
 * @param {string} socketId
 */
async function moveBot (socketId) {
  const direction = pick([
    DIRECTION_BOTTOM,
    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_TOP
  ])

  const point = mapDirectionToPoint(socketId, direction)
  await store.dispatch(addPoint(socketId, point))
}

/**
 * Selects a random element from a list.
 *
 * @param {Array<*>} list
 * @return {*}
 */
function pick (list) {
  return list[Math.floor(Math.random() * list.length)]
}

/**
 * Trigger an update on all client regarding the points.
 *
 * @param {string} socketId
 */
function syncPoints (socketId) {
  const opponents = store.getOpponentIdsOfHost(socketId)

  // Sync current user
  sockets[socketId].emit(
    SOCKET_SYNC,
    { role: ROLE_HOST, points: store.getPointsForHost(socketId) }
  )

  opponents.forEach((/** @type {string} */opponentId) => {
    sockets[socketId].emit(
      SOCKET_SYNC,
      {
        role: ROLE_OPPONENT,
        points: store.getPointsForOpponents(opponentId)
      }
    )
  })

  // Sync other participants
  opponents
    .map((/** @type {string} */opponentId) => sockets[opponentId])
    // TODO: Investigate, why the map can return undefined
    .filter(Boolean)
    .forEach((/** @type {*} */s) => {
      s.emit(
        SOCKET_SYNC,
        { role: ROLE_HOST, points: store.getPointsForHost(socketId) }
      )

      opponents.forEach((/** @type {string} */opponentId) => {
        s.emit(
          SOCKET_SYNC,
          {
            role: ROLE_OPPONENT,
            points: store.getPointsForOpponents(opponentId)
          }
        )
      })
    })
}

/**
 * Checks, whether the maximum number of turns was reached.
 *
 * @param {string} socketId
 * @returns boolean
 */
function isGameOver (socketId) {
  return store.getTurns(socketId) >= MAXIMUM_TURNS
}
