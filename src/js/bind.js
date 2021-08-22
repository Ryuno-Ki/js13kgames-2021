import { onConnect } from './on-connect.js'
import { onDisconnect } from './on-disconnect.js'
import { onEnd } from './on-end.js'
import { onError } from './on-error.js'
import { onLoose } from './on-loose.js'
import { onStart } from './on-start.js'
import { onWin } from './on-win.js'
import { state } from './state.js'
import { updateHost } from './update-host.js'

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

/**
 * Reply synced state.
 *
 * @param {object} details
 * @param {number} details.delta
 * @param {object} details.position
 * @param {string} details.position.cx
 * @param {string} details.position.cy
 * @param {string} details.role
 */
function onSync (details) {
  const { delta, position, role } = details

  // @ts-ignore
  if (role === ROLE_HOST) {
    state.points.push(delta)
    updateHost()
  }

  // @ts-ignore
  if (role === ROLE_OPPONENT && state.edges) {
    let avatar

    if (state.edges.children.length === 0) {
      const ns = 'http://www.w3.org/2000/svg'
      avatar = document.createElementNS(ns, 'circle')
      avatar.setAttribute('r', '1')
      state.edges.append(avatar)
    } else {
      avatar = state.edges.children[0]
    }

    const { cx, cy } = position
    avatar.setAttribute('cx', cx)
    avatar.setAttribute('cy', cy)
  }
}
