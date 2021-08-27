/**
 * Updates the UI with given stats of the current party.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {number} details.opponents
 * @param {number} details.spectators
 */
export function setParty({ role, opponents, spectators }: {
    role: string;
    opponents: number;
    spectators: number;
}): void;
