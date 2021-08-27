/**
 * Reply synced state.
 *
 * @param {object} details
 * @param {number} details.delta
 * @param {object} details.position
 * @param {string} details.position.cx
 * @param {string} details.position.cy
 * @param {string} details.role
 */
export function onSync(details: {
    delta: number;
    position: {
        cx: string;
        cy: string;
    };
    role: string;
}): void;
