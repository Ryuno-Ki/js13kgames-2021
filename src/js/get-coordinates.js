import { degToRad } from './deg-to-rad.js'
import { polarToCartesian } from './polar-to-cartesian.js'
import { state } from './state.js'

/**
 * Computes the coordinates for the polyline.
 *
 * @returns {Array<Array<number>>}
 */
export function getCoordinates () {
  const center = [160, 100]
  const coords = /** @type {Array<Array<number>>} */([]).concat([center])
  const distanceFromCenter = 10 * 13
  const fullCircle = 13
  const maxCoords = 2 * 13

  state.points.forEach(function (/** @type {number} */point) {
    const [cx, cy] = center
    const { x, y } = polarToCartesian({
      radius: distanceFromCenter * Math.random(),
      angle: degToRad(360 * point / fullCircle)
    })
    coords.push([cx + x, cy + y])
    coords.push([cx, cy])
  })

  return coords.slice(-1 * maxCoords)
}
