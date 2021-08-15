import { length, subtract } from '../../src/js/vector.js'

/** @typedef {import('./shape').Shape} Shape */

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
