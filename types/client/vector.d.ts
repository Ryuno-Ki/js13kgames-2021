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
export function Vec2(x: number, y: number): Vector2D;
/**
 * Computes the dot product of two vectors.
 *
 * @param {Vector2D} v
 * @param {Vector2D} w
 * @returns {number}
 */
export function dot(v: Vector2D, w: Vector2D): number;
/**
 * Computes the sum of two vectors.
 *
 * @param {Vector2D} v
 * @param {Vector2D} w
 * @returns {Vector2D}
 */
export function add(v: Vector2D, w: Vector2D): Vector2D;
/**
 * Computes the scalar product of a vector with a number.
 *
 * @param {Vector2D} v
 * @param {number} n
 * @returns {Vector2D}
 */
export function scale(v: Vector2D, n: number): Vector2D;
/**
 * Computes the difference between two vectors.
 *
 * @param {Vector2D} v
 * @param {Vector2D} w
 * @returns {Vector2D}
 */
export function subtract(v: Vector2D, w: Vector2D): Vector2D;
/**
 * Computes the determinant of two vectors interpreted as 2x2 matrix.
 *
 * @param {Vector2D} v
 * @param {Vector2D} w
 * @returns {number}
 */
export function determinant(v: Vector2D, w: Vector2D): number;
/**
 * Computes the length of a vector.
 *
 * @param {Vector2D} v
 * @returns {number}
 */
export function length(v: Vector2D): number;
export type Vector2D = {
    x: number;
    y: number;
};
