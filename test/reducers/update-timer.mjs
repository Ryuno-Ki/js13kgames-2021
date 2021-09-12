import assert from 'assert'

import { updateTimer } from '../../src/js/server/state/reducers/update-timer.js'

describe('updateTimer', () => {
  it('should update the state of the game', () => {
    const oldState = {
      timers: [{
        id: 'socket.io hash',
        turns: 0
      }]
    }
    const id = oldState.timers[0].id

    const newState = updateTimer(oldState, { id })

    assert.equal(newState.timers.length, oldState.timers.length)
    assert.equal(newState.timers[0].id, id)
    assert.equal(newState.timers[0].turns, oldState.timers[0].turns + 1)
  })
})
