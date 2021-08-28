import { DISCONNECT } from '../../../constants.js'

/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 */

/**
 * Removes a connection.
 *
 * @param {string} id
 * @returns {Action}
 */
export function disconnect (id) {
  return {
    type: DISCONNECT,
    payload: {
      id
    }
  }
}
