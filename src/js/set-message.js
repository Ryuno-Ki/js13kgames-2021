import { dom } from './dom.js'

/**
 * Shows a message.
 *
 * @param {string} message
 */
export function setMessage (message) {
  if (dom.socketState === null) {
    throw new Error('HTML broken')
  }

  dom.socketState.textContent = message
}
