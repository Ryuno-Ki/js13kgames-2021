import assert from 'assert'

import { DISCONNECT } from '../../src/js/constants.js'
import { disconnect } from '../../src/js/server/state/actions/disconnect.js'

describe('disconnect', () => {
  it('should remove a connection', () => {
    const id = 'Socket.io hash'

    const action = disconnect(id)

    assert.equal(action.type, DISCONNECT)
    assert.equal(action.payload.id, id)
  })
})
