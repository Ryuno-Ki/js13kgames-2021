/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:point} point */
/** @typedef {module:index.js:timer} timer */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {string} payload.mode
 * @property {Array<point>} payload.points
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
  let timers = state.timers

  switch (payload.mode) {
    case 'new':
      games = newGame(state, payload)
      points = /** @type {Array<point>} */([])
        .concat(state.points)
        .concat(payload.points)
      timers = /** @type {Array<timer>} */([])
        .concat(state.timers)
        .concat({ id: payload.id, turns: 0 })
      break
    case 'join':
      points = /** @type {Array<point>} */([])
        .concat(state.points)
        .concat(payload.points)
      break
    default:
      // Noop
  }

  const modes = state.modes.map((/** @type {mode} */mode) => {
    if (mode.id === payload.id) {
      return { id: payload.id, mode: payload.mode }
    }

    return mode
  })

  return Object.assign({}, state, { games, modes, points, timers })
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
