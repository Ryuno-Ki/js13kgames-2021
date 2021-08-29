/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:point} point */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {object} payload.point
 * @property {number} payload.point.x
 * @property {number} payload.point.y
 */

/**
 * Adds a point for an user to the state.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function addPoint (state, payload) {
  const point = {
    id: payload.id,
    ...payload.point
  }

  const points = /** @type {Array<point>} */([])
    .concat(state.points)
    .concat(point)

  return Object.assign({}, state, { points })
}
