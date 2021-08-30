import assert from 'assert'

import { swapUser } from '../../src/js/server/state/reducers/swap-user.js'

describe('swapUser', () => {
  it('should swap an user', () => {
    const id = 'socket.io hash'
    const replacedId = 'another socket.io hash'

    const oldState = {
      games: [{
        opponents: [
	  id
	]
      }],
      modes: [{
        id,
	mode: 'join'
      }, {
        id: replacedId,
	mode: 'join'
      }],
      points: [{
        id,
	x: 0,
	y: 1
      }]
    }

    const newState = swapUser(oldState, { id, replacedId })

    assert.equal(newState.games.length, oldState.games.length)
    assert.equal(newState.games[0].opponents[0], replacedId)

    assert.equal(newState.modes.length, oldState.modes.length)
    assert.equal(newState.modes[0].id, id)
    assert.equal(newState.modes[0].mode, null)
    assert.equal(newState.modes[1].id, replacedId)
    assert.equal(newState.modes[1].mode, oldState.modes[1].mode)

    assert.equal(newState.points.length, oldState.points.length)
    assert.equal(newState.points[0].id, replacedId)
    assert.equal(newState.points[0].x, oldState.points[0].x)
    assert.equal(newState.points[0].y, oldState.points[0].y)
  })
})
