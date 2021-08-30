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
export function onSync ({ points, role }) {
  // @ts-ignore
  if (role === ROLE_HOST) {
    if (dom.host === null) {
      throw new Error(ERROR)
    }

    const value = points.map((point) => point.join(',')).join(' ')
    dom.host.setAttribute('points', value)
  }

  // @ts-ignore
  if (role === ROLE_OPPONENT) {
    if (!dom.edges) {
      throw new Error(ERROR)
    }

    const { edges } = dom
    points.forEach((opponentPoints, index) => {
      const avatar = edges.children[index * 2]
      const polygon = edges.children[index * 2 + 1]

      if (!avatar || !polygon) {
        throw new Error(ERROR)
      }

      const [cx, cy] = opponentPoints
      avatar.setAttribute('cx', cx)
      avatar.setAttribute('cy', cy)
      state.opponentPoints.push([cx, cy])

      // const value = opponentPoints.map((point) => point.join(',')).join(' ')
      const value = opponentPoints.join(',')
      polygon.setAttribute('points', value)
    })
  }
}
