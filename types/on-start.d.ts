/**
 * Game is ready to play.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {number} details.opponents
 * @param {number} details.spectators
 */
export function onStart({ role, opponents, spectators }: {
    role: string;
    opponents: number;
    spectators: number;
}): void;
