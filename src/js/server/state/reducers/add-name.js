/** @typedef {import('./index.js').State} State */

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
  const users = /** @type {State["users"]} */([])
    .concat(state.users)
    .concat(payload)

  return Object.assign({}, state, { users })
}
