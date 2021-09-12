/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:color} color */
/** @typedef {module:index.js:mode} mode */
/** @typedef {module:index.js:user} user */
/**
 * @typedef {object} payload
 * @property {number} payload.hue
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
export function addName(state: any, payload: payload): any;
export type State = any;
export type color = any;
export type mode = any;
export type user = any;
export type payload = {
    hue: number;
    id: string;
    name: string;
};
