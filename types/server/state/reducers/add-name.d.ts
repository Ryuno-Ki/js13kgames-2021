/** @typedef {import('./index.js').State} State */
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
export function addName(state: State, payload: payload): State;
export type State = import('./index.js').State;
export type payload = {
    id: string;
    name: string;
};
