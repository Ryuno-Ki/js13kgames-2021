import { SCENE_TITLE } from '../../../constants.js'

/** @typedef {module:index.js:State} State */
/** @typedef {module:index.js:scene} scene */

/**
 * @typedef {object} payload
 * @property {string} payload.id
 */

/**
 * Adds a connection to the state.
 *
 * @param {State} state
 * @param {payload} payload
 * @returns {State}
 */
export function connect (state, payload) {
  const connections = /** @type {Array<string>} */([])
    .concat(state.connections)
    .concat(payload.id)

  const scenes = /** @type {Array<scene>} */([])
    .concat(state.scenes)
    .concat({ id: payload.id, scene: SCENE_TITLE })

  return Object.assign({}, state, { connections, scenes })
}
