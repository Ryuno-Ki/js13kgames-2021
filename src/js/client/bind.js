import {
  ERROR,
  SOCKET_CONNECT,
  SOCKET_START,
  SOCKET_SYNC
} from '../constants.js'
import { onConnect } from './on-connect.js'
import { onDisconnect } from './on-disconnect.js'
import { onEnd } from './on-end.js'
import { onError } from './on-error.js'
import { onStart } from './on-start.js'
import { onSync } from './on-sync.js'
import { dom } from './dom.js'

/**
 * Bind to event listeners.
 */
export function bind () {
  if (dom.socket === null) {
    throw new Error(ERROR)
  }

  dom.socket.on(SOCKET_START, onStart)
  dom.socket.on(SOCKET_SYNC, onSync)
  dom.socket.on('end', onEnd)
  dom.socket.on(SOCKET_CONNECT, onConnect)
  dom.socket.on('disconnect', onDisconnect)
  dom.socket.on('error', onError)
}
