import { state } from './state.js'
import { updateHost } from './update-host.js'

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
export function onSync (details) {
  const { delta, position, role } = details

  // @ts-ignore
  if (role === ROLE_HOST) {
    state.hostPoints.push(delta)
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
