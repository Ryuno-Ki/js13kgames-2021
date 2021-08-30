/**
 * Replay synced state.
 *
 * @param {object} details
 * @param {Array<*>} details.points
 * @param {string} details.role
 */
export function onSync({ points, role }: {
    points: Array<any>;
    role: string;
}): void;
