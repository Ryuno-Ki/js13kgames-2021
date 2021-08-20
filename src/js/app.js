import { testCollision } from './collisions.js'
import { FPS } from './constants.js'
import { drawShape } from './draw.js'
import { updatePosition } from './position.js'
import { computeNormals } from './shape.js'
import { add, rotate, scale, Vec2 } from './vector.js'
import { makeAstronaut, makeBoundary, makeIceCream } from './world.js'

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
/** @type {Shape} */
let iceCream
/** @type {Vector2D} */
let iceCreamG = Vec2(-20, 0)

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
    update(context, boundary)
  })

  update(context, astronaut, gravity)
  update(context, iceCream, iceCreamG)

  try {
    boundaries.forEach(function (boundary) {
      if (testCollision(boundary, iceCream)) {
        throw new Error('Outa world')
      }
    })
  } catch (_) {
    // TODO: Refactor into function
    iceCream = makeIceCream({
      x: canvas.width - 50,
      y: Math.random() * canvas.height
    })
    iceCreamG = scale(iceCreamG, 1.1)
  }

  try {
    boundaries.forEach(function (boundary) {
      if (testCollision(boundary, astronaut)) {
        throw new Error('Game Over!')
      }
    })

    window.requestAnimationFrame(tick)
  } catch (_) {
    console.log('Catched')
    // FIXME: clean up using https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
    navigateTo('gameover')
  }
}

function createObjectsInWorld () {
  astronaut = makeAstronaut()
  iceCream = makeIceCream({
    x: canvas.width - 50,
    y: Math.random() * canvas.height
  })

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

/**
 * Updates the canvas as well as the state of the game.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 * @param {Vector2D} [g]
 */
function update (context, shape, g) {
  drawShape(context, shape)
  updatePosition(shape, g)
  updateRotation(shape)
}

/**
 * Update the rotation of the shape.
 *
 * @param {Shape} shape
 */
function updateRotation (shape) {
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

/**
 * Navigate to another scene.
 *
 * @param {string} target
 */
function navigateTo (target) {
  const state = {}
  const title = ''
  const url = new URL(window.location.href)
  url.hash = `#scene-${target}`

  history.pushState(state, title, url.href)
  // Required to update CSS
  window.location.hash = `#scene-${target}`
}
