import assert from 'assert'

import { disconnect } from '../../src/js/server/state/reducers/disconnect.js'

describe('disconnect', () => {
  it('should remove a connection from the state', () => {
    const id = 'socket.io hash'
    const oldState = {
      connections: [id],
      games: [{ host: id, opponents: [], spectators: [] }],
      modes: [{ id, mode: 'new' }],
      users: [{ id, name: 'Test' }]
    }

    const newState = disconnect(oldState, { id })

    assert.equal(
      newState.connections.length,
      oldState.connections.length - 1
    )
  })
})
