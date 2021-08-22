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

      const polygon = document.createElementNS(ns, 'polygon')
      state.edges.appendChild(polygon)
    } else {
      avatar = state.edges.children[0]
    }

    const { cx, cy } = position
    avatar.setAttribute('cx', cx)
    avatar.setAttribute('cy', cy)
    state.opponentPoints.push([parseInt(cx, 10), parseInt(cy, 10)])
    updateOpponent()
  }
}

function updateOpponent () {
  if (!state.edges) {
    throw new Error('Boom')
  }

  const polygon = state.edges.children[1]

  if (!polygon) {
    throw new Error('Boom')
  }

  const value = state.opponentPoints.map((point) => point.join(',')).join(' ')
  polygon.setAttribute('points', value)
}
