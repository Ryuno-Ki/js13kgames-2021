import assert from 'assert'

import { connect } from '../../src/js/server/state/reducers/connect.js'

describe('connect', () => {
  it('should add a connection to the state', () => {
    const oldState = {
      connections: []
    }

    const id = 'socket.io hash'

    const newState = connect(oldState, { id })

    assert.equal(
      newState.connections.length,
      oldState.connections.length + 1
    )
    assert.equal(newState.connections[0], id)
  })
})
