import { ERROR } from '../constants.js'
import { dom } from './dom.js'

/**
 * Updates the UI with given stats of the current party.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {Array<string>} details.opponents
 * @param {Array<string>} details.spectators
 */
export function setParty ({ role, opponents, spectators }) {
  if (!dom.opponentsState || !dom.roleState || !dom.spectatorsState) {
    throw new Error(ERROR)
  }

  dom.roleState.textContent = `You (${role})`
  dom.opponentsState.innerHTML = ''

  opponents.forEach((/** @type {string} */opponent) => {
    const tile = `<span class="tile">${opponent}</span>`
    // @ts-ignore
    dom.opponentsState.innerHTML += tile
  })

  dom.spectatorsState.textContent = spectators.join(', ')
}
