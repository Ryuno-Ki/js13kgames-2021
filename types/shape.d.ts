/** @typedef {import('./vector.js').Vector2D} Vector2D

/**
 * @typedef {object} Shape
 * @property {Vector2D} C
 * @property {number} F
 * @property {number} R
 * @property {number} M
 * @property {Vector2D} V
 * @property {Vector2D} A
 * @property {number} G
 * @property {number} v
 * @property {number} a
 * @property {number} B
 * @property {number} W
 * @property {number} H
 * @property {Array<*>} N
 * @property {Array<Vector2D>} X
 */
/**
 * Defines a rigid shape.
 *
 * @param {object} config
 * @param {Vector2D} config.center
 * @param {number}   config.mass
 * @param {number}   config.friction
 * @param {number}   config.restitution
 * @param {number}   config.bounds
 * @param {number}   config.width
 * @param {number}   config.height
 * @returns {Shape}
 */
export function RigidShape({ center, mass, friction, restitution, bounds, width, height }: {
    center: Vector2D;
    mass: number;
    friction: number;
    restitution: number;
    bounds: number;
    width: number;
    height: number;
}): Shape;
/**
 * /**
 */
export type Vector2D = import('./vector.js').Vector2D;
export type Shape = {
    C: Vector2D;
    F: number;
    R: number;
    M: number;
    V: Vector2D;
    A: Vector2D;
    G: number;
    v: number;
    a: number;
    B: number;
    W: number;
    H: number;
    N: Array<any>;
    X: Array<Vector2D>;
};
