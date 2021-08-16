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
/**
 * Checks for intersection of two lines given by v1 and v2, resp. v3 and v4.
 *
 * @param {Array<Vector2D>} vertices
 * @returns {boolean}
 * @see {@link https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment}
 * @see {@link https://en.wikipedia.org/wiki/Cramer%27s_rule}
 */
export function testIntersection([v1, v2, v3, v4]: Array<Vector2D>): boolean;
export type Shape = import('./shape').Shape;
export type Vector2D = import('./vector').Vector2D;
