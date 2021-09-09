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
export function subtract(v: Point, w: Point): Point;
/**
 * Computes the determinant of two points interpreted as 2x2 matrix.
 *
 * @param {Point} v
 * @param {Point} w
 * @returns {number}
 */
export function determinant(v: Point, w: Point): number;
export type Point = {
    x: number;
    y: number;
};
