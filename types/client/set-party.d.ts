/**
 * Updates the UI with given stats of the current party.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {*} details.host
 * @param {Array<*>} details.opponents
 * @param {Array<string>} details.spectators
 */
export function setParty({ role, host, opponents, spectators }: {
    role: string;
    host: any;
    opponents: Array<any>;
    spectators: Array<string>;
}): void;
