/** @typedef {module:index.js:point} point */
/**
 * Creates an action for SELECT_MODE
 *
 * @param {string} id
 * @param {string} mode
 */
export function selectMode(id: string, mode: string): {
    type: string;
    payload: {
        id: string;
        mode: string;
        points: any[];
    };
};
export type point = any;
