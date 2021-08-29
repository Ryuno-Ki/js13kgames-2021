import { ADD_POINT } from '../../../constants.js'

/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 * @property {object} payload.point
 * @property {number} payload.point.x
 * @property {number} payload.point.y
 */

/**
 * Action creator for adding a point for an user.
 *
 * @param {string} id
 * @param {object} point
 * @param {number} point.x
 * @param {number} point.y
 * @returns {Action}
 */
export function addPoint (id, point) {
  return {
    type: ADD_POINT,
    payload: {
      id,
      point
    }
  }
}
