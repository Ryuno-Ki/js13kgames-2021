/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:point} point */
/** @typedef {module:index.js:scene} scene */
/** @typedef {module:index.js:timer} timer */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 */

/**
 * Ends a game.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function finishGame (state, payload) {
  const colors = state
    .colors
    .filter((/** @type {scene} */s) => s.id !== payload.id)

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
    .map((/** @type {mode} */m) => {
      if (m.id === payload.id) {
        return {
          ...m,
          mode: 'fin'
        }
      }

      return m
    })

  const points = state
    .points
    .filter((/** @type {point} */p) => p.id !== payload.id)

  const scenes = state
    .scenes
    .map((/** @type {scene} */s) => {
      if (s.id === payload.id) {
        return {
          ...s,
          scene: 'fin'
        }
      }

      return s
    })

  const timers = state
    .timers
    .filter((/** @type {timer} */t) => t.id !== payload.id)

  return Object.assign(
    {},
    state,
    { colors, games, modes, points, scenes, timers }
  )
}
