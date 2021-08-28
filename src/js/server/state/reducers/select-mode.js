/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:mode} mode */

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
  const modes = state.modes.map((/** @type {mode} */mode) => {
    if (mode.id === payload.id) {
      return { ...payload }
    }

    return mode
  })

  return Object.assign({}, state, { modes })
}
