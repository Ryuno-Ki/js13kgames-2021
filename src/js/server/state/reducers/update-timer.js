/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:timer} timer */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 */

/**
 * Updates the state for a game.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function updateTimer (state, payload) {
  const { id } = payload
  const timers = state.timers.map((/** @type {timer} */timer) => {
    if (timer.id === id) {
      return {
        ...timer,
        turns: timer.turns + 1
      }
    }

    return timer
  })

  return Object.assign({}, state, { timers })
}
