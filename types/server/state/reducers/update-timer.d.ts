/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:timer} timer */
/**
 * @typedef {object} payload
 * @property {string} payload.id
 */
/**
 * Updates the state for a game.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function updateTimer(state: any, payload: payload): any;
export type State = any;
export type timer = any;
export type payload = {
    id: string;
};
