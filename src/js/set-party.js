import { dom } from './dom.js'

/**
 * Updates the UI with given stats of the current party.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {number} details.opponents
 * @param {number} details.spectators
 */
export function setParty ({ role, opponents, spectators }) {
  if (!dom.opponentsState || !dom.roleState || !dom.spectatorsState) {
    throw new Error('Bogus HTML')
  }

  dom.roleState.textContent = role
  dom.opponentsState.textContent = opponents + ''
  dom.spectatorsState.textContent = spectators + ''
}
