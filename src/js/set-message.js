import { state } from './state.js'

/**
 * Shows a message.
 *
 * @param {string} message
 */
export function setMessage (message) {
  if (state.socketState === null) {
    throw new Error('HTML broken')
  }

  state.socketState.textContent = message
}
