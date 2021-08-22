import { onConnect } from './on-connect.js'
import { onDisconnect } from './on-disconnect.js'
import { onEnd } from './on-end.js'
import { onError } from './on-error.js'
import { onKeyDown } from './on-key-down.js'
import { onKeyUp } from './on-key-up.js'
import { onLoose } from './on-loose.js'
import { onStart } from './on-start.js'
import { onWin } from './on-win.js'
import { state } from './state.js'

/**
 * Bind to event listeners.
 */
export function bind () {
  document.body.addEventListener('keydown', onKeyDown, false)
  document.body.addEventListener('keyup', onKeyUp, false)

  if (state.socket === null) {
    throw new Error('Game not properly initialised!')
  }

  state.socket.on('start', onStart)
  state.socket.on('win', onWin)
  state.socket.on('lose', onLoose)
  state.socket.on('end', onEnd)
  state.socket.on('connect', onConnect)
  state.socket.on('disconnect', onDisconnect)
  state.socket.on('error', onError)
}
