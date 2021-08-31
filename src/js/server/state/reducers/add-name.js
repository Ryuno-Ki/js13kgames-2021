/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:color} color */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:user} user */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {string} payload.name
 */

/**
 * Adds an user to the state.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function addName (state, payload) {
  const hue = Math.floor(360 * Math.random())
  const color = `hsl(${hue}, 80%, 50%)`

  const colors = /** @type {Array<mode>} */([])
    .concat(state.colors)
    .concat({ id: payload.id, value: color })

  const modes = /** @type {Array<mode>} */([])
    .concat(state.modes)
    .concat({ id: payload.id, mode: null })

  const users = /** @type {Array<user>} */([])
    .concat(state.users)
    .concat(payload)

  return Object.assign({}, state, { colors, modes, users })
}
