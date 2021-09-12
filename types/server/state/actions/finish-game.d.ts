/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 */
/**
 * Finishes a game.
 *
 * @param {string} id
 * @returns {Action}
 */
export function finishGame(id: string): Action;
export type Action = {
    type: string;
    payload: {
        id: string;
    };
};
