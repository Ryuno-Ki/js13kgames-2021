import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAXIMUM_GAME_SIZE,
  SOCKET_ADD_USER,
  SOCKET_KEY_UP,
  SOCKET_NAVIGATE,
  SOCKET_SELECT_MODE,
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
 * @property {number} OnKeyUpDetails.delta
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
    if (details.mode === 'new') {
      populateWithBots(socket.id)
    }

    socket.emit(
      'start',
      { role: ROLE_HOST, ...store.getGameForHost(socket.id) }
    )
  })

  socket.on(SOCKET_KEY_UP, (/** @type {OnKeyUpDetails} */details) => {
    // TODO: Differentiate between host and opponent via socket.id
    store.dispatch(addPoint(socket.id, mapDeltaToPoint(details.delta)))
    store.dispatch(addPoint(socket.id, { ...center }))
    // TODO: Also emit a SYNC for all opponents if they triggered the KEY_UP
    socket.emit(
      SOCKET_SYNC,
      { role: ROLE_HOST, points: store.getPointsForHost(socket.id) }
    )
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
