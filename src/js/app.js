import { drawShape } from './draw.js'
import { RigidShape } from './shape.js'
import { Vec2 } from './vector.js'

/** @typedef {import('./shape').Shape} Shape */

// Global on purpose
/** @type {Shape} */
let astronaut
/** @type {HTMLCanvasElement} */
let canvas
/** @type {CanvasRenderingContext2D} */
let context

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

  canvas = /** @type {HTMLCanvasElement} */(game)
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    console.error('Could not start game!')
    return
  }

  context = ctx
  astronaut = makeAstronaut()
  tick()
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

/* TODO: Add some paint-FPS to UI */
// See https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#notes
function tick () {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawShape(context, astronaut)
  window.requestAnimationFrame(tick)
}
