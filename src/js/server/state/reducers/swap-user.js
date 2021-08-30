/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:point} point */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {string} payload.replacedId
 */

/**
 * Swaps the role of an user in the state.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function swapUser (state, payload) {
  const games = state.games.map((/** @type {game} */g) => {
    return {
      ...g,
      opponents: g.opponents.map((/** @type {string} */o) => {
        return o === payload.id ? payload.replacedId : payload.id
      })
    }
  })

  const modes = state.modes.map((/** @type {mode} */m) => {
    if (m.id === payload.id) {
      return {
        id: payload.id, mode: null
      }
    }

    return m
  })

  const points = state.points.map((/** @type {point} */p) => {
    if (p.id === payload.id) {
      return {
        ...p,
        id: payload.replacedId
      }
    }

    return p
  })

  return Object.assign({}, state, { games, modes, points })
}
