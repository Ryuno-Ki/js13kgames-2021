/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 * @property {string | null} payload.role
 */
/**
 * Finishes a game.
 *
 * @param {string} id
 * @param {string | null} role
 * @returns {Action}
 */
export function finishGame(id: string, role: string | null): Action;
export type Action = {
    type: string;
    payload: {
        id: string;
        role: string | null;
    };
};
