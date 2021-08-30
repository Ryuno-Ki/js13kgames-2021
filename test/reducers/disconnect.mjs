import assert from 'assert'

import { disconnect } from '../../src/js/server/state/reducers/disconnect.js'

describe('disconnect', () => {
  it('should remove a connection from the state', () => {
    const id = 'socket.io hash'
    const oldState = {
      connections: [id],
      games: [{ host: id, opponents: [], spectators: [] }],
      modes: [{ id, mode: 'new' }],
      points: [{ id, x: 0, y: 1 }],
      scenes: [{ id, scene: 'fin' }],
      users: [{ id, name: 'Test' }]
    }

    const newState = disconnect(oldState, { id })

    assert.equal(
      newState.connections.length,
      oldState.connections.length - 1
    )

    assert.equal(
      newState.games.length,
      oldState.games.length - 1
    )

    assert.equal(
      newState.modes.length,
      oldState.modes.length - 1
    )

    assert.equal(
      newState.points.length,
      oldState.points.length - 1
    )

    assert.equal(
      newState.scenes.length,
      oldState.scenes.length - 1
    )

    assert.equal(
      newState.users.length,
      oldState.users.length - 1
    )
  })
})
