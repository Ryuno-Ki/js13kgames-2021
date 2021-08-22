import { init } from './init.js'

/**
 * Execute the client side JavaScript.
 */
export function app () {
  window.addEventListener('load', init, false)
}
