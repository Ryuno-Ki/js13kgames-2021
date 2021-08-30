import { SWAP_USER } from '../../../constants.js'

/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 * @property {string} payload.replacedId
 */

/**
 * Action creator for swapping an user.
 *
 * @param {string} id
 * @param {string} replacedId
 * @returns {Action}
 */
export function swapUser (id, replacedId) {
  return {
    type: SWAP_USER,
    payload: {
      id,
      replacedId
    }
  }
}
