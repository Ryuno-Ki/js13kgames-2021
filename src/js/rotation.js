import { FPS } from './constants.js'
import { computeNormals } from './shape.js'
import { rotate } from './vector.js'

/** @typedef {import('./shape').Shape} Shape */
/** @typedef {import('./vector').Vector2D} Vector2D */

/**
 * Update the rotation of the shape.
 *
 * @param {Shape} shape
 */
export function updateRotation (shape) {
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
