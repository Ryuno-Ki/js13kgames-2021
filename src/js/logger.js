/**
 * Define a logger with given prefix.
 *
 * @param {string} name
 * @see {@link https://www.saninnsalas.com/keep-console-log-line-number-in-an-wrapper-function-that-also-add-an-prefix-text/}
 */
export function getLogger (name) {
  const prefix = `${name}:`

  return {
    debug: console.log.bind(console, prefix),
    log: console.log.bind(console, prefix),
    info: console.info.bind(console, prefix),
    warn: console.warn.bind(console, prefix),
    error: console.error.bind(console, prefix)
  }
}
