/** @typedef {module:index.js:State} State */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 */

/**
 * Adds a connection to the state.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function connect (state, payload) {
  const connections = /** @type {Array<string>} */([])
    .concat(state.connections)
    .concat(payload.id)

  return Object.assign({}, state, { connections })
}
