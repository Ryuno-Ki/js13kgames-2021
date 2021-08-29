import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  SOCKET_ADD_USER,
  SOCKET_KEY_UP,
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
import { selectMode } from './state/actions/select-mode.js'
import store from './state/store.js'
import { User } from './user.js'

/** @typedef {*} Socket */

/**
 * @typedef {object} AddUserDetails
 * @property {string} AddUserDetails.name
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

/**
 * Socket.io wrapper
 *
 * @param {Socket} socket
 */
export function io (socket) {
  const user = new User(socket)
  store.dispatch(connect(socket.id))

  socket.on('disconnect', () => onDisconnect(socket, user))
  socket.on(SOCKET_ADD_USER, (/** @type {AddUserDetails} */details) => {
    store.dispatch(addName(socket.id, details.name))
  })

  socket.on(SOCKET_SELECT_MODE, (/** @type {SelectModeDetails} */details) => {
    store.dispatch(selectMode(socket.id, details.mode))
    socket.emit('start', { role: ROLE_HOST, opponents: [], spectators: [] })
  })

  socket.on(SOCKET_KEY_UP, (/** @type {OnKeyUpDetails} */details) => {
    store.dispatch(addPoint(socket.id, mapDeltaToPoint(details.delta)))
    store.dispatch(addPoint(socket.id, { ...center }))
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
 * @param {User} user
 */
function onDisconnect (socket, user) {
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
