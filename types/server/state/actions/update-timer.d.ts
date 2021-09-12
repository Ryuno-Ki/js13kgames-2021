/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 */
/**
 * Action creator for adding an user.
 *
 * @param {string} id
 * @returns {Action}
 */
export function updateTimer(id: string): Action;
export type Action = {
    type: string;
    payload: {
        id: string;
    };
};
