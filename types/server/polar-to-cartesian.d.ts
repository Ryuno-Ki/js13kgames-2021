/**
 * @typedef {object} cartesian
 * @property {number} x
 * @property {number} y
 */
/**
 * @typedef {object} polar
 * @property {number} radius
 * @property {number} angle
 */
/**
 * Maps polar coordinates to cartesian ones.
 *
 * @param {polar} Polar
 * @returns {cartesian}
 */
export function polarToCartesian({ radius, angle }: polar): cartesian;
export type cartesian = {
    x: number;
    y: number;
};
export type polar = {
    radius: number;
    angle: number;
};
