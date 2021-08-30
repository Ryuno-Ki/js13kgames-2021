/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:scene} scene */
/**
 * @typedef {object} payload
 * @property {string} payload.id
 * @property {string} payload.scene
 */
/**
 * Navigates an user to another scene.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function navigate(state: any, payload: payload): any;
export type State = any;
export type scene = any;
export type payload = {
    id: string;
    scene: string;
};
