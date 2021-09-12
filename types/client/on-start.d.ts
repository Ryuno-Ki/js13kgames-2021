/**
 * Game is ready to play.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {*} details.host
 * @param {Array<*>} details.opponents
 */
export function onStart({ role, host, opponents }: {
    role: string;
    host: any;
    opponents: Array<any>;
}): void;
