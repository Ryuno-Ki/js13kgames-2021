/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:point} point */
/** @typedef {module:index.js:scene} scene */
/** @typedef {module:index.js:timer} timer */
/** @typedef {module:index.js:user} user */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 */

/**
 * Removes a connection from the state.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function disconnect (state, payload) {
  const colors = state
    .colors
    .filter((/** @type {scene} */s) => s.id !== payload.id)

  const connections = state
    .connections
    .filter((/** @type {string} */connection) => connection !== payload.id)

  const games = state
    .games
    .filter((/** @type {game} */g) => g.host !== payload.id)
    .map((/** @type {game} */g) => {
      return {
        ...g,
        opponents: g.opponents.filter((/** @type {string} */opponent) => {
          return opponent !== payload.id
        })
      }
    })

  const modes = state
    .modes
    .filter((/** @type {mode} */m) => m.id !== payload.id)

  const points = state
    .points
    .filter((/** @type {point} */p) => p.id !== payload.id)

  const scenes = state
    .scenes
    .filter((/** @type {scene} */s) => s.id !== payload.id)

  const timers = state
    .timers
    .filter((/** @type {timer} */t) => t.id !== payload.id)

  const users = state
    .users
    .filter((/** @type {user} */u) => u.id !== payload.id)

  return Object.assign(
    {},
    state,
    { colors, connections, games, modes, points, scenes, timers, users }
  )
}
