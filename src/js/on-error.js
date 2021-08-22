import { setMessage } from './set-message.js'

/**
 * @deprecated
 */
export function onError () {
  setMessage('Connection error!')
}
