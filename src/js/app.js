import { drawShape } from './draw.js'
import { makeAstronaut, makeBottomBoundary } from './world.js'

/** @typedef {import('./shape').Shape} Shape */

// Global on purpose
/** @type {Shape} */
let astronaut
/** @type {Shape} */
let bottomBoundary
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
  bottomBoundary = makeBottomBoundary({
    x: 0,
    y: canvas.height - boundaryHeight,
    height: boundaryHeight,
    width: canvas.width
  })
  tick()
}

/* TODO: Add some paint-FPS to UI */
// See https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#notes
function tick () {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawShape(context, bottomBoundary)
  drawShape(context, astronaut)
  window.requestAnimationFrame(tick)
}
