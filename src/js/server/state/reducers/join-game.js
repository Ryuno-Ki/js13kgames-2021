/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {string} payload.host
 */

/**
 * Join game by given host.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function joinGame (state, payload) {
  const games = state.games.map((/** @type {game} */game) => {
    if (game.host === payload.host) {
      return {
        ...game,
        opponents: /** @type {Array<string>} */([])
          .concat(game.opponents)
          .concat(payload.id)
      }
    }

    return game
  })

  return Object.assign({}, state, { games })
}
