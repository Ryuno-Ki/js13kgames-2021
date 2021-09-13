import { ERROR } from '../constants.js'
import { dom } from './dom.js'
import { setParty } from './set-party.js'

/**
 * Updates the player names and colours.
 *
 * @param {object} details
 * @param {*} details.host
 * @param {Array<*>} details.opponents
 */
export function onPlayerJoined ({ host, opponents }) {
  paintElements({ host, opponents })
  setParty({ host, opponents })
}

/**
 * Apply colour to SVG elements.
 *
 * @param {*} payload
 */
function paintElements ({ host, opponents }) {
  if (!dom.host || !dom.opponents) {
    throw new Error(ERROR)
  }

  // @ts-ignore
  dom.host.style.stroke = host.color
  const el = dom.opponents

  // @ts-ignore
  opponents.forEach((o, index) => {
    const avatar = el.children[index * 2]
    const polygon = el.children[index * 2 + 1]

    if (!avatar || !polygon) {
      throw new Error(ERROR)
    }

    // @ts-ignore
    avatar.style.fill = o.color
    // @ts-ignore
    polygon.style.fill = o.color
  })
}
