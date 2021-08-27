/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 * @property {string} payload.name
 */
/**
 * Action creator for updating name of an user.
 *
 * @param {string} id
 * @param {string} name
 * @returns {Action}
 */
export function updateName(id: string, name: string): Action;
export type Action = {
    type: string;
    payload: {
        id: string;
        name: string;
    };
};
