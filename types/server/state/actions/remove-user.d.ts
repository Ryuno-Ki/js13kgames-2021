/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 */
/**
 * Action creator for removing an user.
 *
 * @param {string} id
 * @returns {Action}
 */
export function removeUser(id: string): Action;
export type Action = {
    type: string;
    payload: {
        id: string;
    };
};
