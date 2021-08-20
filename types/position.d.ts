/** @typedef {import('./shape').Shape} Shape */
/** @typedef {import('./vector').Vector2D} Vector2D */
/**
 * Update the position of the shape.
 *
 * @param {Shape} shape
 * @param {Vector2D} [g=gravity]
 */
export function updatePosition(shape: Shape, g?: import("./vector.js").Vector2D | undefined): void;
export type Shape = import('./shape').Shape;
export type Vector2D = import('./vector').Vector2D;
