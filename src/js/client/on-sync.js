import { ERROR } from '../constants.js'
import { dom } from './dom.js'
import { state } from './state.js'

/**
 * Replay synced state.
 *
 * @param {object} details
 * @param {Array<*>} details.points
 * @param {string} details.role
 */
export function onSync (details) {
  const { points, role } = details

  // @ts-ignore
  if (role === ROLE_HOST) {
    if (dom.host === null) {
      throw new Error(ERROR)
    }

    const value = points.map((point) => point.join(',')).join(' ')
    dom.host.setAttribute('points', value)
  }

  // @ts-ignore
  if (role === ROLE_OPPONENT && dom.edges) {
    let avatar

    if (dom.edges.children.length === 0) {
      const ns = 'http://www.w3.org/2000/svg'
      avatar = document.createElementNS(ns, 'circle')
      avatar.setAttribute('r', '1')
      dom.edges.append(avatar)

      const polygon = document.createElementNS(ns, 'polygon')
      dom.edges.appendChild(polygon)
    } else {
      avatar = dom.edges.children[0]
    }

    const { cx, cy } = { cx: '0', cy: '0' }
    avatar.setAttribute('cx', cx)
    avatar.setAttribute('cy', cy)
    state.opponentPoints.push([parseInt(cx, 10), parseInt(cy, 10)])
    updateOpponent()
  }
}

function updateOpponent () {
  if (!dom.edges) {
    throw new Error(ERROR)
  }

  const polygon = dom.edges.children[1]

  if (!polygon) {
    throw new Error(ERROR)
  }

  const value = state.opponentPoints.map((point) => point.join(',')).join(' ')
  polygon.setAttribute('points', value)
}
