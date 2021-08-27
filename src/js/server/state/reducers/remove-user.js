/** @typedef {import('./index.js').State} State */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 */

/**
 * Removes an user from the state.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function removeUser (state, payload) {
  const { id } = payload
  const users = state.users.filter((user) => user.id !== id)

  return Object.assign({}, state, { users })
}
