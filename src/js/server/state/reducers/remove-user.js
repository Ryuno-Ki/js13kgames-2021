/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:user} user */

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
  const users = state.users.filter((/** @type {user} */user) => {
    return user.id !== id
  })

  return Object.assign({}, state, { users })
}
