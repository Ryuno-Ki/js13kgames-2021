/** @typedef {import('./shape').Shape} Shape */
/** @typedef {import('./vector').Vector2D} Vector2D */
/**
 * Test two shapes on intersecting boundary circles (since rotation).
 *
 * @param {Shape} shape1
 * @param {Shape} shape2
 * @returns {boolean}
 */
export function testBoundaries(shape1: Shape, shape2: Shape): boolean;
/**
 * Test two shapes on intersection.
 *
 * @param {Shape} shape1
 * @param {Shape} shape2
 * @returns {boolean}
 */
export function testCollision(shape1: Shape, shape2: Shape): boolean;
export type Shape = import('./shape').Shape;
export type Vector2D = import('./vector').Vector2D;
