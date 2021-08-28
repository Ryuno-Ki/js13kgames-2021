/**
 * Update the history and move to new scene.
 *
 * @param {string} target
 */
export function navigate (target) {
  const state = {}
  const title = ''
  const url = new URL(window.location.href)
  url.hash = `#scene-${target}`

  window.history.pushState(state, title, url.href)
  window.location.hash = url.hash
}
