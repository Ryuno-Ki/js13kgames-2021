/** @typedef {import('./shape').Shape} Shape */
/**
 * Draws a shape onto the canvas.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 */
export function drawShape(context: CanvasRenderingContext2D, shape: Shape): void;
export type Shape = import('./shape').Shape;
