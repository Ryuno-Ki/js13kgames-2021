/** @typedef {import('./index.js').State} State */
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
export function removeUser(state: State, payload: payload): State;
export type State = import('./index.js').State;
export type payload = {
    id: string;
};
