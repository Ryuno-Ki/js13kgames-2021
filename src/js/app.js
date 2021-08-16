import { testCollision } from './collisions.js'
import { drawShape } from './draw.js'
import { makeAstronaut, makeBoundary } from './world.js'

/** @typedef {import('./shape').Shape} Shape */

// Global on purpose
/** @type {Shape} */
let astronaut
/** @type {Array<Shape>} */
const boundaries = []
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

  const boundaryHeight = 2
  boundaries.push(
    makeBoundary({
      x: 0,
      y: canvas.height - boundaryHeight,
      height: boundaryHeight,
      width: canvas.width
    })
  )

  boundaries.push(
    makeBoundary({
      x: 0,
      y: 0 + boundaryHeight,
      height: boundaryHeight,
      width: canvas.width
    })
  )

  tick()
}

/* TODO: Add some paint-FPS to UI */
// See https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#notes
function tick () {
  context.clearRect(0, 0, canvas.width, canvas.height)
  boundaries.forEach(function (boundary) {
    drawShape(context, boundary)
  })

  drawShape(context, astronaut)

  boundaries.forEach(function (boundary) {
    if (testCollision(boundary, astronaut)) {
      throw new Error('Game Over!')
    }
  })

  window.requestAnimationFrame(tick)
}
