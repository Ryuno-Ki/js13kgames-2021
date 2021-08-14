/**
 * @typedef {Object} Vector2D
 * @property {number} x
 * @property {number} y
 */

/**
 * Turns two digits into a 2D Vector.
 *
 * @param {number} x
 * @param {number} y
 * @returns {Vector2D}
 */
export function Vec2 (x, y) {
  return { x, y }
}

/**
 * Computes the dot product of two vectors.
 *
 * @param {Vector2D} v
 * @param {Vector2D} w
 * @returns {number}
 */
export function dot (v, w) {
  return v.x * w.x + v.y * w.y
}

/**
 * Computes the sum of two vectors.
 *
 * @param {Vector2D} v
 * @param {Vector2D} w
 * @returns {Vector2D}
 */
export function add (v, w) {
  return Vec2(v.x + w.x, v.y + w.y)
}

/**
 * Computes the scalar product of a vector with a number.
 *
 * @param {Vector2D} v
 * @param {number} n
 * @returns {Vector2D}
 */
export function scale (v, n) {
  return Vec2(v.x * n, v.y * n)
}

/**
 * Computes the difference between two vectors.
 *
 * @param {Vector2D} v
 * @param {Vector2D} w
 * @returns {Vector2D}
 */
export function subtract (v, w) {
  return add(v, scale(w, -1))
}

/**
 * Computes the determinant of two vectors interpreted as 2x2 matrix.
 *
 * @param {Vector2D} v
 * @param {Vector2D} w
 * @returns {number}
 */
export function determinant (v, w) {
  return v.x * w.y - v.y * w.x
}

/**
 * Computes the length of a vector.
 *
 * @param {Vector2D} v
 * @returns {number}
 */
export function length (v) {
  return dot(v, v) ** 0.5
}

/**
 * Computes the distance of two vectors.
 *
 * @param {Vector2D} v
 * @param {Vector2D} w
 * @returns {number}
 */
export function distance (v, w) {
  return length(subtract(v, w))
}

/**
 * Scale a vector so it has length 1.
 *
 * @param {Vector2D} v
 * @returns {Vector2D}
 */
export function normalize (v) {
  return scale(v, 1 / (length(v) || 1))
}
