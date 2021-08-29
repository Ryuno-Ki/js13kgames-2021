import { SOCKET_ADD_USER, SOCKET_SELECT_MODE } from '../constants.js'
import { getLogger } from '../logger.js'
import { addName } from './state/actions/add-name.js'
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
 * @typedef {object} SelectModeDetails
 * @property {string} SelectModeDetails.mode
 */

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
  })

  socket.on('keyUp', (/** @type {object} */details) => {
    onKeyUp(socket, user, details)
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
 * Sync all players about keyup.
 *
 * @param {Socket} socket
 * @param {User} user
 * @param {object} details
 */
async function onKeyUp (socket, user, details) {
  try {
    await updateStorage()
  } catch (exc) {
    console.error(exc)
  }

  user.opponents.forEach((opponent) => {
    opponent.socket.emit('sync', details)
  })
}

/**
 * Update this session in storage.
 * */
async function updateStorage () {
  // @ts-ignore
  const games = storage.get('games', 0)
  // @ts-ignore
  await storage.set('games', games + 1)
}
