import { state } from './state.js'
import { updateHost } from './update-host.js'

/**
 * React on keyup events.
 */
export function onKeyUp () {
  state.upTime = (new Date()).valueOf()
  const delta = state.upTime - state.downTime

  // TODO: Why not both?
  if (!Number.isNaN(delta / 1000)) {
    state.points.push((state.startTime - state.upTime) / 1000)
    updateHost()
    state.socket.emit(
      'keyUp',
      {
        delta: (state.startTime - state.upTime) / 1000
        // TODO: Add meta information about the key being released
      }
    )
  }

  state.isPressed = false
}
