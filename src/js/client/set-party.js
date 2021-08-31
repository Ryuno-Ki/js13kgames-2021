import { ERROR } from '../constants.js'
import { dom } from './dom.js'

/**
 * Updates the UI with given stats of the current party.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {*} details.host
 * @param {Array<*>} details.opponents
 * @param {Array<string>} details.spectators
 */
export function setParty ({ role, host, opponents, spectators }) {
  if (!dom.opponentsState || !dom.roleState || !dom.spectatorsState) {
    throw new Error(ERROR)
  }

  dom.roleState.innerHTML = `<span class="tile" style="--user-color: ${host.color};">
    ${host.name} (${role})
  </span>`
  dom.opponentsState.innerHTML = ''

  opponents.forEach((/** @type {*} */opponent) => {
    const tile = `<span class="tile" style="--user-color: ${opponent.color};">
      ${opponent.name}
    </span>`
    // @ts-ignore
    dom.opponentsState.innerHTML += tile
  })

  dom.spectatorsState.textContent = spectators.join(', ')
}
