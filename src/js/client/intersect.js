import { determinant, subtract } from './vector.js'

/**
 * Checks for intersection of two lines given by v1 and v2, resp. v3 and v4.
 *
 * @param {Array<*>} vertices
 * @returns {boolean}
 * @see {@link https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment}
 * @see {@link https://en.wikipedia.org/wiki/Cramer%27s_rule}
 */
export function testIntersection ([v1, v2, v3, v4]) {
  const divisor = determinant(subtract(v1, v2), subtract(v3, v4))

  if (divisor === 0) {
    // Parallel lines never intersect
    return false
  }

  const tdivident = determinant(subtract(v1, v3), subtract(v3, v4))
  const udivident = determinant(subtract(v2, v1), subtract(v1, v3))
  // + 0 turns -0 into +0
  const t = tdivident / divisor + 0
  const u = udivident / divisor + 0

  return (t >= 0 && t <= 1) && (u >= 0 && u <= 1)
}
