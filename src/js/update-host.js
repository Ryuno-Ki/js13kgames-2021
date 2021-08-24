import { getCoordinates } from './get-coordinates.js'
import { dom } from './dom.js'

/**
 * Updates the UI for the Host part.
 */
export function updateHost () {
  if (dom.host === null) {
    throw new Error('Game not properly initialised!')
  }

  const value = getCoordinates()
    .map(function (point) { return point.join(',') })
    .join(' ')

  dom.host.setAttribute('points', value)
}
