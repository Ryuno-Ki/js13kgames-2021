import assert from 'assert'

import { UPDATE_TIMER } from '../../src/js/constants.js'
import { updateTimer } from '../../src/js/server/state/actions/update-timer.js'

describe('update-timer', () => {
  it('should update a timer', () => {
    const id = 'Socket.io hash'

    const action = updateTimer(id)

    assert.equal(action.type, UPDATE_TIMER)
    assert.equal(action.payload.id, id)
  })
})
