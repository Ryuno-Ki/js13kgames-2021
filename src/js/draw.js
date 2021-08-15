import { FPS } from './constants.js'
import { computeNormals } from './shape.js'
import { add, rotate, scale } from './vector.js'

/** @typedef {import('./shape').Shape} Shape */
/** @typedef {import('./vector').Vector2D} Vector2D */

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
  updatePosition(shape)
  updateRotation(shape)
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
  const { W, H } = shape
  context.strokeRect(-W / 2, -H / 2, W, H)
}

/**
 * Update the position of the shape.
 *
 * @param {Shape} shape
 */
function updatePosition (shape) {
  shape.V = add(shape.V, scale(shape.A, 1 / FPS))
  moveShape(shape, scale(shape.V, 1 / FPS))
}

/**
 * Move a shape along a vector.
 *
 * @param {Shape} shape
 * @param {Vector2D} v
 */
function moveShape (shape, v) {
  shape.C = add(shape.C, v)

  shape.X.forEach(function (vertex, index) {
    shape.X[index] = add(vertex, v)
  })
}

/**
 * Update the rotation of the shape.
 *
 * @param {Shape} shape
 */
function updateRotation (shape) {
  shape.v = shape.v + shape.a * 1 / FPS
  rotateShape(shape, shape.v * 1 / FPS)
}

/**
 * Rotate a shape around its centre.
 *
 * @param {Shape} shape
 * @param {number} angle
 */
function rotateShape (shape, angle) {
  shape.G = shape.G + angle

  shape.X.forEach(function (vertex, index) {
    shape.X[index] = rotate(vertex, shape.C, angle)
    computeNormals(shape)
  })
}
