import { setMessage } from './set-message.js'

/**
 * @deprecated
 */
export function onConnect () {
  setMessage('Waiting for opponent…')
}
