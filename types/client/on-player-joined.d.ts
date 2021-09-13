/**
 * Updates the player names and colours.
 *
 * @param {object} details
 * @param {*} details.host
 * @param {Array<*>} details.opponents
 */
export function onPlayerJoined({ host, opponents }: {
    host: any;
    opponents: Array<any>;
}): void;
