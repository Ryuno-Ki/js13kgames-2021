/**
 * Replay synced state.
 *
 * @param {object} details
 * @param {Array<*>} details.points
 * @param {string} details.role
 */
export function onSync(details: {
    points: Array<any>;
    role: string;
}): void;
