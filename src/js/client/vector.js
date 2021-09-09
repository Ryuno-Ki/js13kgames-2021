/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * Computes the difference between two points.
 *
 * @param {Point} v
 * @param {Point} w
 * @returns {Point}
 */
export function subtract (v, w) {
  return {
    x: v.x - w.x,
    y: v.y - w.y
  }
}

/**
 * Computes the determinant of two points interpreted as 2x2 matrix.
 *
 * @param {Point} v
 * @param {Point} w
 * @returns {number}
 */
export function determinant (v, w) {
  return v.x * w.y - v.y * w.x
}
