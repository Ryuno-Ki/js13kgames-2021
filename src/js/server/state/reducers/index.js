import {
  ADD_NAME,
  CONNECT,
  DISCONNECT,
  REMOVE_USER,
  SELECT_MODE,
  UPDATE_NAME
} from '../../../constants.js'
import { addName } from './add-name.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { removeUser } from './remove-user.js'
import { selectMode } from './select-mode.js'
import { updateName } from './update-name.js'

/**
 * @typedef {object} game
 * @property {string} game.host
 * @property {Array<string>} game.opponents
 * @property {Array<string>} game.spectators
 */

/**
 * @typedef {object} mode
 * @property {string} mode.id
 * @property {string} mode.mode
 */

/**
 * @typedef {object} user
 * @property {string} user.id
 * @property {string} user.name
 */

/**
 * @typedef {object} Action
 * @property {string} type
 * @property {*} payload
 */

/**
 * @typedef {object} State
 * @property {Array<string>} connections
 * @property {Array<game>} games
 * @property {Array<mode>} modes
 * @property {Array<user>} users
 */

const initialState = {
  connections: [],
  games: [],
  modes: [],
  users: []
}

/**
 * Combined reducer to delegate depending on action.type.
 *
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export function reducer (state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
    case ADD_NAME:
      return addName(state, action.payload)
    case CONNECT:
      return connect(state, action.payload)
    case DISCONNECT:
      return disconnect(state, action.payload)
    case REMOVE_USER:
      return removeUser(state, action.payload)
    case SELECT_MODE:
      return selectMode(state, action.payload)
    case UPDATE_NAME:
      return updateName(state, action.payload)
    default:
      return state
  }
}
