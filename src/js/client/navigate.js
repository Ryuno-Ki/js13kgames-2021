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

  hideAll()
  show(url.hash)
}

/**
 * Hides all sections.
 */
function hideAll () {
  Array
    .from(document.querySelectorAll('section'))
    .forEach((section) => { section.style.display = 'none' })
}

/**
 * Show selected section.
 *
 * @param {string} selector
 */
function show (selector) {
  const el = /** @type {HTMLElement} */(document.querySelector(selector))

  if (el) {
    el.style.display = ''
  }
}
