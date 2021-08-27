import { REMOVE_USER } from '../../../constants.js'

/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 */

/**
 * Action creator for removing an user.
 *
 * @param {string} id
 * @returns {Action}
 */
export function removeUser (id) {
  return {
    type: REMOVE_USER,
    payload: {
      id
    }
  }
}
