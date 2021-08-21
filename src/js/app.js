/**
 * @typedef {object} cartesian
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {object} polar
 * @property {number} radius
 * @property {number} angle
 */

/** @type {number} */
let downTime
/** @type {SVGPolylineElement} */
let host
let isPressed = false
/** @type {Array<number>} */
let points = []
/** @type {*} */
let socket
/** @type {number} */
let startTime
/** @type {number} */
let upTime

/**
 * Execute the client side JavaScript.
 */
export function app () {
  window.addEventListener('load', init, false)
}

/**
 * Setup the client code.
 */
function init () {
  const el = document.getElementById('host')

  if (!el) {
    throw new Error('Cannot start game!')
  }

  host = /** @type {*} */(el)
  points = []
  // @ts-ignore
  socket = window.io({ upgrade: false, transports: ['websocket'] })
  bind()
  startTime = (new Date()).valueOf()
  updateHost()
}

/**
 * Bind to event listeners.
 */
function bind () {
  document.body.addEventListener('keydown', onKeyDown, false)
  document.body.addEventListener('keyup', onKeyUp, false)
  socket.on('start', onStart)
  socket.on('win', onWin)
  socket.on('lose', onLoose)
  socket.on('end', onEnd)
  socket.on('connect', onConnect)
  socket.on('disconnect', onDisconnect)
  socket.on('error', onError)
}

/**
 * React on keydown events.
 */
function onKeyDown () {
  if (isPressed) {
    return
  }

  downTime = (new Date()).valueOf()
  isPressed = true
}

/**
 * React on keyup events.
 */
function onKeyUp () {
  upTime = (new Date()).valueOf()
  const delta = upTime - downTime

  // TODO: Why not both?
  if (!Number.isNaN(delta / 1000)) {
    points.push((startTime - upTime) / 1000)
    updateHost()
  }

  isPressed = false
}

/**
 * @deprecated
 */
function onStart () {
  setMessage('Round ')
}

/**
 * @deprecated
 */
function onWin () {
  displayScore('You win!')
}

/**
 * @deprecated
 */
function onLoose () {
  displayScore('You lost')
}

/**
 * @deprecated
 */
function onEnd () {
  setMessage('Waiting for opponent…')
}

/**
 * @deprecated
 */
function onConnect () {
  setMessage('Waiting for opponent…')
}

/**
 * @deprecated
 */
function onDisconnect () {
  setMessage('Connection lost!')
}

/**
 * @deprecated
 */
function onError () {
  setMessage('Connection error!')
}

/**
 * Shows a message.
 *
 * @deprecated
 * @param {string} message
 */
function setMessage (message) {
  console.log(message)
}

/**
 * Shows the score.
 *
 * @deprecated
 * @param {string} message
 */
function displayScore (message) {
  console.log(displayScore)
}

/**
 * Updates the UI for the Host part.
 */
function updateHost () {
  // const ns = 'http://www.w3.org/2000/svg'
  const value = getCoordinates()
    .map(function (point) { return point.join(',') })
    .join(' ')

  host.setAttribute('points', value)
}

/**
 * Computes the coordinates for the polyline.
 *
 * @returns {Array<Array<number>>}
 */
function getCoordinates () {
  const center = [160, 100]
  const coords = /** @type {Array<Array<number>>} */([]).concat([center])
  const distanceFromCenter = 10 * 13
  const fullCircle = 13
  const maxCoords = 2 * 13

  points.forEach(function (/** @type {number} */point) {
    const [cx, cy] = center
    const { x, y } = polarToCartesian({
      radius: distanceFromCenter * Math.random(),
      angle: degToRad(360 * point / fullCircle)
    })
    coords.push([cx + x, cy + y])
    coords.push([cx, cy])
  })

  return coords.slice(-1 * maxCoords)
}

/**
 * Maps degree to radians.
 *
 * @param {number} degree
 * @returns {number}
 */
function degToRad (degree) {
  return degree * Math.PI / 180
}

/**
 * Maps polar coordinates to cartesian ones.
 *
 * @param {polar} Polar
 * @returns {cartesian}
 */
function polarToCartesian ({ radius, angle }) {
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  }
}
