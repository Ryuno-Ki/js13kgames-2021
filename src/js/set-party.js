import { state } from './state.js'

/**
 * Updates the UI with given stats of the current party.
 *
 * @param {object} details
 * @param {string} details.role
 * @param {number} details.opponents
 * @param {number} details.spectators
 */
export function setParty ({ role, opponents, spectators }) {
  if (!state.opponentsState || !state.roleState || !state.spectatorsState) {
    throw new Error('Bogus HTML')
  }

  state.roleState.textContent = role
  state.opponentsState.textContent = opponents + ''
  state.spectatorsState.textContent = spectators + ''
}
