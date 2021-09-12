/**
 * Checks for intersection of two lines given by v1 and v2, resp. v3 and v4.
 *
 * @param {Array<*>} vertices
 * @returns {boolean}
 * @see {@link https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment}
 * @see {@link https://en.wikipedia.org/wiki/Cramer%27s_rule}
 */
export function testIntersection([v1, v2, v3, v4]: Array<any>): boolean;
