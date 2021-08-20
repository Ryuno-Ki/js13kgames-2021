import { normalize, subtract, Vec2 } from './vector.js'

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
export function RigidShape ({
  center,
  color,
  mass,
  friction,
  restitution, // bouncing
  bounds, // radius
  width,
  height
}) {
  const immobile = 0

  const shape = {
    C: center,
    F: friction,
    R: restitution,
    M: mass ? 1 / mass : immobile,
    V: Vec2(0, 0), // velocity, i.e. speed
    G: 0, // angle
    v: 0, // angle velocity
    a: 0, // angle acceleration
    c: color || `hsl(${~~(Math.random() * 360)}, 80%, 80%)`,
    B: bounds,
    W: width,
    H: height,
    N: [], // face normals array
    X: [
      Vec2(center.x - width / 2, center.y - height / 2), // top-left
      Vec2(center.x + width / 2, center.y - height / 2), // top-right
      Vec2(center.x + width / 2, center.y + height / 2), // bottom-right
      Vec2(center.x - width / 2, center.y + height / 2) // bottom-left
    ]
  }

  computeNormals(shape)
  return shape
}

/**
 * Compute face normals
 *
 * @param {Shape} shape
 */
export function computeNormals (shape) {
  shape.N.forEach(function (normal, index) {
    shape.N[index] = normalize(
      subtract(shape.X[(index + 1) % 4], shape.X[(index + 2) % 4])
    )
  })
}
