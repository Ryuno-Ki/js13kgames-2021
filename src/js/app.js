import { testCollision } from './collisions.js'
import { drawShape } from './draw.js'
import { add, Vec2 } from './vector.js'
import { makeAstronaut, makeBoundary } from './world.js'

/** @typedef {import('./shape').Shape} Shape */
/** @typedef {import('./vector').Vector2D} Vector2D */

// Global on purpose
/** @type {Shape} */
let astronaut
/** @type {Array<Shape>} */
const boundaries = []
/** @type {HTMLCanvasElement} */
let canvas
/** @type {CanvasRenderingContext2D} */
let context
/** @type {Vector2D} */
let gravity = Vec2(0, 0)

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

  const xinput = document.getElementById('xgravity')
  const yinput = document.getElementById('ygravity')
  if (!xinput || !yinput) {
    console.error('Could not start game!')
    return
  }

  xinput.addEventListener('input', updateGravity)
  yinput.addEventListener('input', updateGravity)

  canvas = /** @type {HTMLCanvasElement} */(game)
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    console.error('Could not start game!')
    return
  }

  context = ctx
  createObjectsInWorld()
  tick()
}

/* TODO: Add some paint-FPS to UI */
// See https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#notes
function tick () {
  context.clearRect(0, 0, canvas.width, canvas.height)
  boundaries.forEach(function (boundary) {
    drawShape(context, boundary)
  })

  drawShape(context, astronaut, gravity)

  boundaries.forEach(function (boundary) {
    if (testCollision(boundary, astronaut)) {
      throw new Error('Game Over!')
    }
  })

  window.requestAnimationFrame(tick)
}

function createObjectsInWorld () {
  astronaut = makeAstronaut()

  const boundarySize = 2
  boundaries.push(
    makeBoundary({
      x: 0,
      y: canvas.height - boundarySize,
      height: boundarySize,
      width: canvas.width
    })
  )

  boundaries.push(
    makeBoundary({
      x: 0,
      y: 0 + boundarySize,
      height: boundarySize,
      width: canvas.width
    })
  )

  boundaries.push(
    makeBoundary({
      x: 0 + boundarySize,
      y: 0,
      height: canvas.height,
      width: boundarySize
    })
  )

  boundaries.push(
    makeBoundary({
      x: canvas.width - boundarySize,
      y: 0,
      height: canvas.height,
      width: boundarySize
    })
  )
}

/**
 * Updates the applied gravity.
 *
 * @param {Event} event
 */
function updateGravity (event) {
  if (!event.target) {
    return
  }

  const input = /** @type {HTMLInputElement} */(event.target)
  const value = parseFloat(input.value)

  if (input.id === 'xgravity') {
    gravity = add(gravity, Vec2(value, 0))
  } else if (input.id === 'ygravity') {
    gravity = add(gravity, Vec2(0, value))
  } else {
    console.error(input)
    throw new Error('What input is this?!')
  }
}
