/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:point} point */
/** @typedef {module:index.js:scene} scene */
/** @typedef {module:index.js:user} user */
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
export type game = any;
export type mode = any;
export type point = any;
export type scene = any;
export type user = any;
export type payload = {
    id: string;
};
