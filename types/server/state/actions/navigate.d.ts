/**
 * @typedef {object} Action
 * @property {string} type
 * @property {object} payload
 * @property {string} payload.id
 * @property {string} payload.scene
 */
/**
 * Action creator for navigating to another scene.
 *
 * @param {string} id
 * @param {string} scene
 * @returns {Action}
 */
export function navigate(id: string, scene: string): Action;
export type Action = {
    type: string;
    payload: {
        id: string;
        scene: string;
    };
};
