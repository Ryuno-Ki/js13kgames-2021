import { determinant, length, subtract } from '../../src/js/vector.js'

/** @typedef {import('./shape').Shape} Shape */
/** @typedef {import('./vector').Vector2D} Vector2D */

/**
 * Test two shapes on intersecting boundary circles (since rotation).
 *
 * @param {Shape} shape1
 * @param {Shape} shape2
 * @returns {boolean}
 */
export function testBoundaries (shape1, shape2) {
  return length(subtract(shape2.C, shape1.C)) <= shape2.B + shape1.B
}

/**
 * Test two shapes on intersection.
 *
 * @param {Shape} shape1
 * @param {Shape} shape2
 * @returns {boolean}
 */
export function testCollision (shape1, shape2) {
  const vertices1 = getVertices(shape1)
  const vertices2 = getVertices(shape2)

  try {
    vertices1.forEach(function (vertex1) {
      vertices2.forEach(function (vertex2) {
        const vertices = [...vertex1, ...vertex2]

        if (testIntersection(vertices)) {
          console.debug(shape1, shape2, vertices)
          throw new Error('Intersection!')
        }
      })
    })
  } catch (_) {
    // Discovered an intersection!
    return true
  }

  return false
}

/**
 * Computes all vertices as point-direction pairs.
 *
 * @param {Shape} shape
 * @returns {Array<Array<Vector2D>>}
 */
function getVertices (shape) {
  return [
    [
      shape.X[0],
      subtract(shape.X[0], shape.X[1])
    ],
    [
      shape.X[0],
      subtract(shape.X[0], shape.X[3])
    ],
    [
      shape.X[2],
      subtract(shape.X[2], shape.X[1])
    ],
    [
      shape.X[2],
      subtract(shape.X[2], shape.X[3])
    ]
  ]
}

/**
 * Checks for intersection of two lines given by v1 and v2, resp. v3 and v4.
 *
 * @param {Array<Vector2D>} vertices
 * @returns {boolean}
 * @see {@link https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment}
 */
function testIntersection ([v1, v2, v3, v4]) {
  const tdivident = determinant(subtract(v1, v3), subtract(v3, v4))
  const tdivisor = determinant(subtract(v1, v2), subtract(v3, v4))
  const t = tdivident / tdivisor

  const udivident = determinant(subtract(v2, v1), subtract(v1, v3))
  const udivisor = determinant(subtract(v1, v2), subtract(v3, v4))
  const u = udivident / udivisor

  console.debug(t, u)
  return (t <= 0 && t <= 1) || (u <= 0 && u <= 1)
}
