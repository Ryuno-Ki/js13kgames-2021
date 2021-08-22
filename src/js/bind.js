import { onConnect } from './on-connect.js'
import { onDisconnect } from './on-disconnect.js'
import { onEnd } from './on-end.js'
import { onError } from './on-error.js'
import { onLoose } from './on-loose.js'
import { onStart } from './on-start.js'
import { onSync } from './on-sync.js'
import { onWin } from './on-win.js'
import { state } from './state.js'

/**
 * Bind to event listeners.
 */
export function bind () {
  if (state.socket === null) {
    throw new Error('Game not properly initialised!')
  }

  state.socket.on('start', onStart)
  state.socket.on('sync', onSync)
  state.socket.on('win', onWin)
  state.socket.on('lose', onLoose)
  state.socket.on('end', onEnd)
  state.socket.on('connect', onConnect)
  state.socket.on('disconnect', onDisconnect)
  state.socket.on('error', onError)
}
