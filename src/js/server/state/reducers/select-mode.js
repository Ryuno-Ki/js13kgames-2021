import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH
} from '../../../constants.js'

/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:point} point */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {string} payload.mode
 */

/**
 * Select mode for an user.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function selectMode (state, payload) {
  let games = state.games
  let points = state.points

  switch (payload.mode) {
    case 'new':
      games = newGame(state, payload)
      points = initialPointsForHost(state, payload)
      break
    case 'join':
      points = initialPointsForOpponent(state, payload)
      break
    default:
      // Noop
  }

  const modes = state.modes.map((/** @type {mode} */mode) => {
    if (mode.id === payload.id) {
      return { ...payload }
    }

    return mode
  })

  return Object.assign({}, state, { games, modes, points })
}

/**
 * Creates a new game.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
function newGame (state, payload) {
  return /** @type {Array<game>} */[]
    .concat(state.games)
    .concat(/** @type {game} */({
      host: payload.id,
      opponents: /** @type {Array<string>} */([])
    }))
}

/**
 * Populate the points with the center for the host.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
function initialPointsForHost (state, payload) {
  return /** @type {Array<point>} */([])
    .concat(state.points)
    .concat({ id: payload.id, x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 })
}

/**
 * Populate the points with the center for the host.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
function initialPointsForOpponent (state, payload) {
  let index = 0

  if (payload.id.startsWith('AI-')) {
    const id = /\d+/.exec(payload.id)
    if (id) {
      index = parseInt(id[0], 10) % 4
    }
  }

  const points = [
    { x: 0, y: CANVAS_HEIGHT / 2 },
    { x: CANVAS_WIDTH, y: CANVAS_HEIGHT / 2 },
    { x: CANVAS_WIDTH / 2, y: 0 },
    { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT }
  ]
  const point = points[index]

  return /** @type {Array<point>} */([])
    .concat(state.points)
    .concat({ id: payload.id, ...point })
}
