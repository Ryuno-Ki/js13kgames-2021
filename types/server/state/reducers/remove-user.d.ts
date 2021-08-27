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
export function removeUser(state: any, payload: payload): any;
export type State = any;
export type user = any;
export type payload = {
    id: string;
};
