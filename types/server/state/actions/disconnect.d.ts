/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 */
/**
 * Removes a connection.
 *
 * @param {string} id
 * @returns {Action}
 */
export function disconnect(id: string): Action;
export type Action = {
    type: string;
    payload: {
        id: string;
    };
};
