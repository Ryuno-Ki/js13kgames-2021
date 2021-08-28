/**
 * Define a logger with given prefix.
 *
 * @param {string} name
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
