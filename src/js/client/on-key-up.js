import { SOCKET_KEY_UP } from '../constants.js'
import { dom } from './dom.js'
import { state } from './state.js'

/**
 * React on keyup events.
 */
export function onKeyUp () {
  state.upTime = (new Date()).valueOf()
  const delta = (state.upTime - state.downTime) / 1000

  if (!Number.isNaN(delta)) {
    dom.socket.emit(SOCKET_KEY_UP, { delta })
  }

  state.isPressed = false
}
