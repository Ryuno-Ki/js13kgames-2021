import assert from 'assert'

import { joinGame } from '../../src/js/server/state/reducers/join-game.js'

describe('joinGame', () => {
  it('should join game by given host', () => {
    const host = 'socket.io hash'
    const id = 'Another socket.io hash'

    const oldState = {
      games: [{
        host: 'socket.io hash',
	opponents: [],
	spectators: []
      }]
    }

    const newState = joinGame(oldState, { id, host })

    assert.equal(newState.games.length, oldState.games.length)
    assert.equal(
      newState.games[0].opponents.length,
      oldState.games[0].opponents.length + 1
    )
    assert.equal(newState.games[0].host, host)
    assert.equal(newState.games[0].opponents[0], id)
  })
})
