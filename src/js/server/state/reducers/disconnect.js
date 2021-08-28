/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/** @typedef {module:index.js:mode} mode */
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
  const connections = state
    .connections
    .filter((/** @type {string} */connection) => connection !== payload.id)

  // TODO: Add tests for this
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
    .map((/** @type {game} */g) => {
      return {
        ...g,
        spectators: g.spectators.filter((/** @type {string} */spectator) => {
          return spectator !== payload.id
        })
      }
    })

  const modes = state
    .users
    .filter((/** @type {mode} */m) => m.id !== payload.id)

  const users = state
    .users
    .filter((/** @type {user} */u) => u.id !== payload.id)

  return Object.assign({}, state, { connections, games, modes, users })
}
