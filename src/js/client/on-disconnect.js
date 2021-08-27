import { setMessage } from './set-message.js'

/**
 * @deprecated
 */
export function onDisconnect () {
  setMessage('Connection lost!')
}
