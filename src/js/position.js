import { FPS, gravity } from './constants.js'
import { add, scale, Vec2 } from './vector.js'

/** @typedef {import('./shape').Shape} Shape */
/** @typedef {import('./vector').Vector2D} Vector2D */

/**
 * Update the position of the shape.
 *
 * @param {Shape} shape
 * @param {Vector2D} [g=gravity]
 */
export function updatePosition (shape, g = gravity) {
  // Apply gravity to all shapes with mass
  const acceleration = shape.M > 0 ? g : Vec2(0, 0)
  shape.V = add(shape.V, scale(acceleration, 1 / FPS))
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
