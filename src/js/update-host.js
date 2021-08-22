import { getCoordinates } from './get-coordinates.js'
import { state } from './state.js'

/**
 * Updates the UI for the Host part.
 */
export function updateHost () {
  if (state.host === null) {
    throw new Error('Game not properly initialised!')
  }

  // const ns = 'http://www.w3.org/2000/svg'
  const value = getCoordinates()
    .map(function (point) { return point.join(',') })
    .join(' ')

  state.host.setAttribute('points', value)
}
