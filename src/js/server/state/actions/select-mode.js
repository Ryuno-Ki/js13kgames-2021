import { SELECT_MODE } from '../../../constants.js'

/**
 * Creates an action for SELECT_MODE
 *
 * @param {string} id
 * @param {string} mode
 */
export function selectMode (id, mode) {
  return {
    type: SELECT_MODE,
    payload: {
      id,
      mode
    }
  }
}
