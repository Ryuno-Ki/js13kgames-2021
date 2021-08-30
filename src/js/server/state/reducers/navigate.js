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
export function navigate (state, payload) {
  console.log('navigate', state.scenes, payload)
  const scenes = state.scenes
    .map((/** @type {scene} */scene) => {
      if (scene.id === payload.id) {
        return {
          ...payload
        }
      }

      return scene
    })

  return Object.assign({}, state, { scenes })
}
