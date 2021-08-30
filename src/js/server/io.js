import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  MAXIMUM_GAME_SIZE,
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
const logger = getLogger('io')
let nextAi = 0

/**
 * Socket.io wrapper
 *
 * @param {Socket} socket
 */
export function io (socket) {
  store.dispatch(connect(socket.id))

  socket.on('disconnect', () => onDisconnect(socket))
  socket.on(SOCKET_ADD_USER, (/** @type {AddUserDetails} */details) => {
    store.dispatch(addName(socket.id, details.name))
  })

  socket.on(SOCKET_NAVIGATE, (/** @type {NavigateDetails} */details) => {
    store.dispatch(navigate(socket.id, details.scene))
  })

  socket.on(SOCKET_SELECT_MODE, (/** @type {SelectModeDetails} */details) => {
    store.dispatch(selectMode(socket.id, details.mode))
    let game

    switch (details.mode) {
      case 'new':
        populateWithBots(socket.id)

        socket.emit(
          SOCKET_START,
          { role: ROLE_HOST, ...store.getGameForHost(socket.id) }
        )

        syncPoints(socket, socket.id)
        break
      case 'join':
        game = store.findGameAvailableForJoin()

        if (game) {
          store.dispatch(
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
          syncPoints(socket, socket.id)
        }
        break
      default:
        // noop
    }
  })

  socket.on(SOCKET_KEY_UP, (/** @type {OnKeyUpDetails} */details) => {
    if (details.delta) {
      // Host case
      store.dispatch(addPoint(socket.id, mapDeltaToPoint(details.delta)))
      store.dispatch(addPoint(socket.id, { ...center }))
      syncPoints(socket, socket.id)
    } else if (details.direction) {
      // Opponents case
      store.dispatch(
        addPoint(socket.id, mapDirectionToPoint(socket.id, details.direction))
      )

      socket.emit(
        SOCKET_SYNC,
        { role: ROLE_OPPONENT, points: store.getPointsForOpponents(socket.id) }
      )
    }
  })

  logger.info(`Connected: ${socket.id}`)
}

/**
 * Clean up on disconnect.
 *
 * @param {*} socket
 */
function onDisconnect (socket) {
  logger.info(`Disconnected: ${socket.id}`)
  store.dispatch(disconnect(socket.id))
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
  // Number of vertices of the imaginary polygon
  const fullCircle = 13

  const { x, y } = polarToCartesian({
    radius: distanceFromCenter * Math.random(),
    angle: degToRad(360 * delta / fullCircle)
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
function populateWithBots (socketId) {
  for (let i = 0; i < MAXIMUM_GAME_SIZE - 1; i++) {
    const id = `AI-${nextAi}`
    store.dispatch(addName(id, `Bot No. ${nextAi}`))
    store.dispatch(selectMode(id, 'join'))
    store.dispatch(joinGame(id, socketId))

    nextAi += 1
  }
}

/**
 * Trigger an update on all client regarding the points.
 *
 * @param {*} socket
 * @param {string} socketId
 */
function syncPoints (socket, socketId) {
  socket.emit(
    SOCKET_SYNC,
    { role: ROLE_HOST, points: store.getPointsForHost(socket.id) }
  )

  store.getOpponentIdsOfHost(socket.id)
    .forEach((/** @type {string} */opponentId) => {
      socket.emit(
        SOCKET_SYNC,
        {
          role: ROLE_OPPONENT,
          points: store.getPointsForOpponents(opponentId)
        }
      )
    })
}
