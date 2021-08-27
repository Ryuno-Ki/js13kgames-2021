/** @typedef {import('./index.js').State} State */
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
export function updateName(state: State, payload: payload): State;
export type State = import('./index.js').State;
export type payload = {
    id: string;
    name: string;
};
