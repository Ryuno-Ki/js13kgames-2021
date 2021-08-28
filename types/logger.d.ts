/**
 * Define a logger with given prefix.
 *
 * @param {string} name
 * @see {@link https://www.saninnsalas.com/keep-console-log-line-number-in-an-wrapper-function-that-also-add-an-prefix-text/}
 */
export function getLogger(name: string): {
    debug: (...args: any[]) => void;
    log: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
