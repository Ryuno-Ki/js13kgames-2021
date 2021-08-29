/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:point} point */
/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {string} payload.mode
 */
/**
 * Select mode for an user.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function selectMode(state: any, payload: payload): any;
export type State = any;
export type game = any;
export type mode = any;
export type point = any;
export type payload = {
    id: string;
    mode: string;
};
