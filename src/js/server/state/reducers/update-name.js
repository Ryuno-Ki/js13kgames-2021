/**
 * @typedef {object} user
 * @property {string} user.id
 * @property {string} user.name
 */

/**
 * @typedef {object} state
 * @property {Array<user>} state.users
 */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {string} payload.name
 */

/**
 * Updates the state for an user.
 *
 * @param {state} state
 * @param {payload} payload
 * @returns {state}
 */
export function updateName (state, payload) {
  const { id, name } = payload
  const users = state.users.map((user) => {
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
