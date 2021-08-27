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
export function updateName(state: state, payload: payload): state;
export type user = {
    id: string;
    name: string;
};
export type state = {
    users: Array<user>;
};
export type payload = {
    id: string;
    name: string;
};
