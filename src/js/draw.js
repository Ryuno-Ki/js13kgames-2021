/** @typedef {import('./shape').Shape} Shape */

/**
 * Draws a shape onto the canvas.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 */
export function drawShape (context, shape) {
  context.save()
  prepareCanvas(context, shape)
  draw(context, shape)
  context.restore()
}

/**
 * Transforms the coordination system for easier execution.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 */
function prepareCanvas (context, shape) {
  const { C, G } = shape
  const { x, y } = C
  context.translate(x, y)
  context.rotate(G)
}

/**
 * Draws a shape.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 */
function draw (context, shape) {
  const { c, H, W } = shape
  context.strokeRect(-W / 2, -H / 2, W, H)
  context.fillStyle = c
  context.fillRect(-W / 2, -H / 2, W * 0.8, H * 0.8)
}
