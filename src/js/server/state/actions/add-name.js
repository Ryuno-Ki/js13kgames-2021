import { ADD_NAME } from '../../../constants.js'

/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {number} payload.hue
 * @property {string} payload.id
 * @property {string} payload.name
 */

/**
 * Action creator for adding an user.
 *
 * @param {string} id
 * @param {string} name
 * @returns {Action}
 */
export function addName (id, name) {
  const hue = Math.floor(360 * Math.random())

  return {
    type: ADD_NAME,
    payload: {
      hue,
      id,
      name
    }
  }
}
