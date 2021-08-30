import assert from 'assert'

import { JOIN_GAME } from '../../src/js/constants.js'
import { joinGame } from '../../src/js/server/state/actions/join-game.js'

describe('joinGame', () => {
  it('should create an action for JOIN_GAME', () => {
    const id = 'Socket.io hash'
    const host = 'Another socket.io hash'

    const action = joinGame(id, host)

    assert.equal(action.type, JOIN_GAME)
    assert.equal(action.payload.id, id)
    assert.equal(action.payload.host, host)
  })
})
