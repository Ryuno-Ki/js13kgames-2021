/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 */
/**
 * Register a new connection.
 *
 * @param {string} id
 * @returns {Action}
 */
export function connect(id: string): Action;
export type Action = {
    type: string;
    payload: {
        id: string;
    };
};