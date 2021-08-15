import { RigidShape } from './shape.js'
import { Vec2 } from './vector.js'

/** @typedef {import('./shape').Shape} Shape */

/**
 * Creates player avatar.
 *
 * @returns {Shape}
 */
export function makeAstronaut () {
  const center = Vec2(200, 200)
  const friction = 20
  const restitution = 0
  const mass = 400
  const bounds = 20
  const width = 20
  const height = 20

  const shape = RigidShape({
    center,
    mass,
    friction,
    restitution,
    bounds,
    width,
    height
  })

  return shape
}

/**
 * Creates a boundary at the bottom of the screen.
 *
 * @param {object} config
 * @param {number} config.x
 * @param {number} config.y
 * @param {number} config.height
 * @param {number} config.width
 * @returns {Shape}
 */
export function makeBottomBoundary ({ x, y, height, width }) {
  const center = Vec2(x + width / 2, y + height / 2)
  const friction = 20
  const restitution = 0
  const mass = 0
  const bounds = 25

  const shape = RigidShape({
    center,
    mass,
    friction,
    restitution,
    bounds,
    width,
    height
  })

  return shape
}
