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
export function updateName(state: any, payload: payload): any;
export type State = any;
export type user = any;
export type payload = {
    id: string;
    name: string;
};
