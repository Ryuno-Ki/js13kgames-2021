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
export function disconnect(state: any, payload: payload): any;
export type State = any;
export type payload = {
    id: string;
};
