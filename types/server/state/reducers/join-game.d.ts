/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {string} payload.host
 */
/**
 * Join game by given host.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function joinGame(state: any, payload: payload): any;
export type State = any;
export type game = any;
export type payload = {
    id: string;
    host: string;
};
