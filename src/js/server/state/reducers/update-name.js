/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:user} user */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {string} payload.name
 */

/**
 * Updates the state for an user.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function updateName (state, payload) {
  const { id, name } = payload
  const users = state.users.map((/** @type {user} */user) => {
    if (user.id === id) {
      return {
        ...user,
        name
      }
    }

    return user
  })

  return Object.assign({}, state, { users })
}
