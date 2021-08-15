/** @typedef {import('./shape').Shape} Shape */
/** @typedef {import('./vector').Vector2D} Vector2D */
/**
 * Draws a shape onto the canvas.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 */
export function drawShape(context: CanvasRenderingContext2D, shape: Shape): void;
export type Shape = import('./shape').Shape;
export type Vector2D = import('./vector').Vector2D;
