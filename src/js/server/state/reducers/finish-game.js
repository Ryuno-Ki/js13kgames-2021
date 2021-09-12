/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:scene} scene */

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

  return Object.assign({}, state, { modes, scenes })
}
