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

  dom.roleState.textContent = role
  dom.opponentsState.textContent = opponents.join(', ')
  dom.spectatorsState.textContent = spectators.join(', ')
}
