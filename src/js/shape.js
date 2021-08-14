import { gravity } from './constants.js'
import { Vec2 } from './vector.js'

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
export function RigidShape ({
  center,
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
    A: mass ? gravity : Vec2(0, 0), // acceleration
    G: 0, // angle
    v: 0, // angle velocity
    a: 0, // angle acceleration
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

  return shape
}
