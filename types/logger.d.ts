/**
 * Define a logger with given prefix.
 *
 * @param {string} name
 */
export function getLogger(name: string): {
    debug: (...args: any[]) => void;
    log: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
