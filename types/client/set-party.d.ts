/**
 * Updates the UI with given stats of the current party.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {Array<string>} details.opponents
 * @param {Array<string>} details.spectators
 */
export function setParty({ role, opponents, spectators }: {
    role: string;
    opponents: Array<string>;
    spectators: Array<string>;
}): void;
