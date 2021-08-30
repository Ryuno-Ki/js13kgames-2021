import { NAVIGATE } from '../../../constants.js'

/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 * @property {string} payload.scene
 */

/**
 * Action creator for navigating to another scene.
 *
 * @param {string} id
 * @param {string} scene
 * @returns {Action}
 */
export function navigate (id, scene) {
  return {
    type: NAVIGATE,
    payload: {
      id,
      scene
    }
  }
}
