export const dom = {
  canvas: getCanvas(),
  xinput: getXInput(),
  yinput: getYInput()
}

/**
 * Queries the DOM for a reference to the canvas element.
 *
 * @returns {HTMLCanvasElement}
 * @throws {Error}
 */
function getCanvas () {
  const canvas = document.getElementById('game')

  if (!canvas) {
    throw new Error('Canvas element not found!')
  }

  return /** @type {HTMLCanvasElement} */(canvas)
}

/**
 * Queries the DOM for a reference to the xinput element.
 *
 * @returns {HTMLInputElement}
 * @throws {Error}
 */
function getXInput () {
  const xinput = document.getElementById('xgravity')

  if (!xinput) {
    throw new Error('Input element xgravity not found!')
  }

  return /** @type {HTMLInputElement} */(xinput)
}

/**
 * Queries the DOM for a reference to the yinput element.
 *
 * @returns {HTMLInputElement}
 * @throws {Error}
 */
function getYInput () {
  const yinput = document.getElementById('ygravity')

  if (!yinput) {
    throw new Error('Input element ygravity not found!')
  }

  return /** @type {HTMLInputElement} */(yinput)
}
