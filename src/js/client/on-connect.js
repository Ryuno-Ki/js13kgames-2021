import { setMessage } from './set-message.js'

/**
 * @deprecated
 */
export function onConnect () {
  setMessage('Connected and waiting for opponent…')
}
