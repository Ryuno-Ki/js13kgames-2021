import assert from 'assert'

import { disconnect } from '../../src/js/server/state/reducers/disconnect.js'

describe('disconnect', () => {
  it('should remove a connection from the state', () => {
    const oldState = {
      connections: ['socket.io hash']
    }

    const id = oldState.connections[0]

    const newState = disconnect(oldState, { id })

    assert.equal(
      newState.connections.length,
      oldState.connections.length - 1
    )
  })
})
