import {
  ADD_NAME,
  ADD_POINT,
  CONNECT,
  DISCONNECT,
  JOIN_GAME,
  NAVIGATE,
  REMOVE_USER,
  SELECT_MODE,
  SWAP_USER,
  UPDATE_NAME
} from '../../../constants.js'
import { addName } from './add-name.js'
import { addPoint } from './add-point.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { joinGame } from './join-game.js'
import { navigate } from './navigate.js'
import { removeUser } from './remove-user.js'
import { selectMode } from './select-mode.js'
import { swapUser } from './swap-user.js'
import { updateName } from './update-name.js'

/**
 * @typedef {object} color
 * @property {string} color.id
 * @property {string} color.value
 */

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
 * @typedef {object} point
 * @property {string} point.id
 * @property {number} point.x
 * @property {number} point.y
 */

/**
 * @typedef {object} scene
 * @property {string} scene.id
 * @property {string} scene.scene
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
 * @property {Array<color>} colors
 * @property {Array<string>} connections
 * @property {Array<game>} games
 * @property {Array<mode>} modes
 * @property {Array<point>} points
 * @property {Array<user>} users
 */

const initialState = {
  colors: [],
  connections: [],
  games: [],
  modes: [],
  points: [],
  scenes: [],
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
    case ADD_POINT:
      return addPoint(state, action.payload)
    case CONNECT:
      return connect(state, action.payload)
    case DISCONNECT:
      return disconnect(state, action.payload)
    case JOIN_GAME:
      return joinGame(state, action.payload)
    case NAVIGATE:
      return navigate(state, action.payload)
    case REMOVE_USER:
      return removeUser(state, action.payload)
    case SELECT_MODE:
      return selectMode(state, action.payload)
    case SWAP_USER:
      return swapUser(state, action.payload)
    case UPDATE_NAME:
      return updateName(state, action.payload)
    default:
      return state
  }
}
