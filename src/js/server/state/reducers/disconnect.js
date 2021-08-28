/** @typedef {module:index.js:State} State */

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

  return Object.assign({}, state, { connections })
}
