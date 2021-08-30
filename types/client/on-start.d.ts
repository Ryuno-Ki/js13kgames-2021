/**
 * Game is ready to play.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {Array<string>} details.opponents
 * @param {Array<string>} details.spectators
 */
export function onStart({ role, opponents, spectators }: {
    role: string;
    opponents: Array<string>;
    spectators: Array<string>;
}): void;
