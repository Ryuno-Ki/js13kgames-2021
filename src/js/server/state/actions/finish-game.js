import { FINISH_GAME } from '../../../constants.js'

/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 * @property {string | null} payload.role
 */

/**
 * Finishes a game.
 *
 * @param {string} id
 * @param {string | null} role
 * @returns {Action}
 */
export function finishGame (id, role) {
  return {
    type: FINISH_GAME,
    payload: {
      id,
      role
    }
  }
}
