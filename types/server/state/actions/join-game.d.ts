/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 * @property {string} payload.host
 */
/**
 * Action creator for joining a game by given host
 *
 * @param {string} id
 * @param {string} host
 * @returns {Action}
 */
export function joinGame(id: string, host: string): Action;
export type Action = {
    type: string;
    payload: {
        id: string;
        host: string;
    };
};
