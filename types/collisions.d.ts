/** @typedef {import('./shape').Shape} Shape */
/**
 * Test two shapes on intersecting boundary circles (since rotation).
 *
 * @param {Shape} shape1
 * @param {Shape} shape2
 * @returns {boolean}
 */
export function testBoundaries(shape1: Shape, shape2: Shape): boolean;
export type Shape = import('./shape').Shape;
