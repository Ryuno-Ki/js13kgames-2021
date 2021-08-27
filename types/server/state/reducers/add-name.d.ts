/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:user} user */
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
export function addName(state: any, payload: payload): any;
export type State = any;
export type user = any;
export type payload = {
    id: string;
    name: string;
};
