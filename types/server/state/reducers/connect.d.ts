/** @typedef {module:index.js:State} State */
/**
 * @typedef {object} payload
 * @property {string} payload.id
 */
/**
 * Adds a connection to the state.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function connect(state: any, payload: payload): any;
export type State = any;
export type payload = {
    id: string;
};
