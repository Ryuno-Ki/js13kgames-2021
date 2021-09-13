import { ERROR } from '../constants.js'
import { dom } from './dom.js'

/**
 * Updates the UI with given stats of the current party.
 *
 * @param {object} details
 * @param {*} details.host
 * @param {Array<*>} details.opponents
 */
export function setParty ({ host, opponents }) {
  if (!dom.opponentsState || !dom.roleState) {
    throw new Error(ERROR)
  }

  dom.roleState.innerHTML = `<span class="tile" style="--user-color: ${host.color};">
    ${host.name}
  </span>`
  dom.opponentsState.innerHTML = ''

  opponents.forEach((/** @type {*} */opponent) => {
    const tile = `<span class="tile" style="--user-color: ${opponent.color};">
      ${opponent.name}
    </span>`
    // @ts-ignore
    dom.opponentsState.innerHTML += tile
  })
}
