import { UPDATE_TIMER } from '../../../constants.js'

/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 */

/**
 * Action creator for adding an user.
 *
 * @param {string} id
 * @returns {Action}
 */
export function updateTimer (id) {
  return {
    type: UPDATE_TIMER,
    payload: {
      id
    }
  }
}
