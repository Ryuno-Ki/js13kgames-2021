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
/**
 * Computes the distance of two vectors.
 *
 * @param {Vector2D} v
 * @param {Vector2D} w
 * @returns {number}
 */
export function distance(v: Vector2D, w: Vector2D): number;
/**
 * Scale a vector so it has length 1.
 *
 * @param {Vector2D} v
 * @returns {Vector2D}
 */
export function normalize(v: Vector2D): Vector2D;
/**
 * Rotate a vector around a given centre for a given angle in radians.
 *
 * @param {Vector2D} v
 * @param {Vector2D} centre
 * @param {number} angle
 */
export function rotate(v: Vector2D, centre: Vector2D, angle: number): Vector2D;
export type Vector2D = {
    x: number;
    y: number;
};
