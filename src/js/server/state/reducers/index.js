import {
  ADD_NAME,
  REMOVE_USER,
  SELECT_MODE,
  UPDATE_NAME
} from '../../../constants.js'
import { addName } from './add-name.js'
import { removeUser } from './remove-user.js'
import { selectMode } from './select-mode.js'
import { updateName } from './update-name.js'

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
 * @property {Array<mode>} modes
 * @property {Array<user>} users
 */

const initialState = {
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
