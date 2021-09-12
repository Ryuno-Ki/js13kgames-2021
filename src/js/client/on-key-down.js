import { state } from './state.js'

/**
 * React on keydown events.
 */
export function onKeyDown () {
  if (state.isPressed) {
    return
  }

  state.downTime = (new Date()).valueOf()
  state.upTime = 0
  state.isPressed = true
}
