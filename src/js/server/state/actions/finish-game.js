import { FINISH_GAME } from '../../../constants.js'

/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 */

/**
 * Finishes a game.
 *
 * @param {string} id
 * @returns {Action}
 */
export function finishGame (id) {
  return {
    type: FINISH_GAME,
    payload: {
      id
    }
  }
}
