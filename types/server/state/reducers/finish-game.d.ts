/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:game} game */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:point} point */
/** @typedef {module:index.js:scene} scene */
/** @typedef {module:index.js:timer} timer */
/**
 * @typedef {object} payload
 * @property {string} payload.id
 */
/**
 * Ends a game.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function finishGame(state: any, payload: payload): any;
export type State = any;
export type game = any;
export type mode = any;
export type point = any;
export type scene = any;
export type timer = any;
export type payload = {
    id: string;
};
