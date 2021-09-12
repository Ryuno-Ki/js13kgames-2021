import { ERROR } from '../constants.js'
import { dom } from './dom.js'

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
    if (!dom.opponents) {
      throw new Error(ERROR)
    }

    const { opponents } = dom

    points.forEach((opponentPoints, index) => {
      const avatar = opponents.children[index * 2]
      const polygon = opponents.children[index * 2 + 1]
      const avatarPoints = opponentPoints[opponentPoints.length - 1]

      if (!avatar || !polygon) {
        throw new Error(ERROR)
      }

      const [cx, cy] = avatarPoints
      avatar.setAttribute('cx', cx)
      avatar.setAttribute('cy', cy)

      // const value = opponentPoints.map((point) => point.join(',')).join(' ')
      const value = opponentPoints.join(',')
      polygon.setAttribute('points', value)
    })
  }
}
