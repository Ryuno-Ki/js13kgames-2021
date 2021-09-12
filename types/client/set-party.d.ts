/**
 * Updates the UI with given stats of the current party.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {*} details.host
 * @param {Array<*>} details.opponents
 */
export function setParty({ role, host, opponents }: {
    role: string;
    host: any;
    opponents: Array<any>;
}): void;
