/** @typedef {import('./vector.js').Vector2D} Vector2D

/**
 * @typedef {object} Shape
 * @property {Vector2D} C
 * @property {string} c
 * @property {number} F
 * @property {number} R
 * @property {number} M
 * @property {Vector2D} V
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
 * @param {string}   [config.color]
 * @param {number}   config.mass
 * @param {number}   config.friction
 * @param {number}   config.restitution
 * @param {number}   config.bounds
 * @param {number}   config.width
 * @param {number}   config.height
 * @returns {Shape}
 */
export function RigidShape({ center, color, mass, friction, restitution, bounds, width, height }: {
    center: Vector2D;
    color?: string | undefined;
    mass: number;
    friction: number;
    restitution: number;
    bounds: number;
    width: number;
    height: number;
}): Shape;
/**
 * Compute face normals
 *
 * @param {Shape} shape
 */
export function computeNormals(shape: Shape): void;
/**
 * /**
 */
export type Vector2D = import('./vector.js').Vector2D;
export type Shape = {
    C: Vector2D;
    c: string;
    F: number;
    R: number;
    M: number;
    V: Vector2D;
    G: number;
    v: number;
    a: number;
    B: number;
    W: number;
    H: number;
    N: Array<any>;
    X: Array<Vector2D>;
};
