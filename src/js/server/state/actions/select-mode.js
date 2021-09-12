import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  SELECT_MODE
} from '../../../constants.js'

/** @typedef {module:index.js:point} point */

/**
 * Creates an action for SELECT_MODE
 *
 * @param {string} id
 * @param {string} mode
 */
export function selectMode (id, mode) {
  let points = /** @type {Array<point>} */([])

  switch (mode) {
    case 'new':
      points = initialPointsForHost(id)
      break
    case 'join':
      points = initialPointsForOpponent(id)
      break
    default:
      // noop
  }

  return {
    type: SELECT_MODE,
    payload: {
      id,
      mode,
      points
    }
  }
}

/**
 * Populate the points with the center for the host.
 *
 * @param {string} id
 * @returns {Array<point>}
 */
function initialPointsForHost (id) {
  return [{ id, x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 }]
}

/**
 * Populate the points with the center for the host.
 *
 * @param {string} id
 * @returns {Array<point>}
 */
function initialPointsForOpponent (id) {
  let index = 0

  if (id.startsWith('AI-')) {
    const numberAsString = /\d+/.exec(id)
    if (numberAsString) {
      index = parseInt(numberAsString[0], 10) % 4
    }
  }

  const points = [
    { x: 0, y: CANVAS_HEIGHT / 2 },
    { x: CANVAS_WIDTH, y: CANVAS_HEIGHT / 2 },
    { x: CANVAS_WIDTH / 2, y: 0 },
    { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT }
  ]
  const point = points[index]

  return [{ id, ...point }]
}
