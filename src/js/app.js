import { drawShape } from './draw.js'
import { RigidShape } from './shape.js'
import { Vec2 } from './vector.js'

/** @typedef {import('./shape').Shape} Shape */

/**
 * Entry point into the game.
 *
 * @returns {void}
 */
export function app () {
  const game = document.getElementById('game')
  if (!game) {
    console.error('Could not start game!')
    return
  }

  const context = /** @type {HTMLCanvasElement} */(game).getContext('2d')

  if (!context) {
    console.error('Could not start game!')
    return
  }

  const astronaut = makeAstronaut()
  drawShape(context, astronaut)
}

/**
 * Creates player avatar.
 *
 * @returns {Shape}
 */
function makeAstronaut () {
  const center = Vec2(200, 200)
  const friction = 20
  const restitution = 0
  const mass = 400
  const bounds = 1
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
