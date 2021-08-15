/** @typedef {import('./shape').Shape} Shape */
/**
 * Creates player avatar.
 *
 * @returns {Shape}
 */
export function makeAstronaut(): Shape;
/**
 * Creates a boundary at the bottom of the screen.
 *
 * @param {object} config
 * @param {number} config.x
 * @param {number} config.y
 * @param {number} config.height
 * @param {number} config.width
 * @returns {Shape}
 */
export function makeBottomBoundary({ x, y, height, width }: {
    x: number;
    y: number;
    height: number;
    width: number;
}): Shape;
export type Shape = import('./shape').Shape;
