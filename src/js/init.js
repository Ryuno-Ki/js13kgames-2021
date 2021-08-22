import { bind } from './bind.js'
import { state } from './state.js'
import { updateHost } from './update-host.js'

/**
 * Setup the client code.
 */
export function init () {
  const el = document.getElementById('host')

  if (!el) {
    throw new Error('Cannot start game!')
  }

  state.host = /** @type {*} */(el)
  state.points = []
  // @ts-ignore
  state.socket = window.io({ upgrade: false, transports: ['websocket'] })
  bind()
  state.startTime = (new Date()).valueOf()
  updateHost()
}
