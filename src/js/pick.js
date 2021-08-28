/**
 * Selects a random element from a list.
 *
 * @param {Array<*>} list
 * @return {*}
 */
export function pick (list) {
  const length = list.length
  return list[Math.floor(Math.random() * length)]
}
