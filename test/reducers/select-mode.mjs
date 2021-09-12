import assert from 'assert'

import { selectMode } from '../../src/js/server/state/reducers/select-mode.js'

describe('selectMode', () => {
  it('should select a new mode', () => {
    const id = 'socket.io hash'
    const oldState = {
      games: [],
      modes: [{
        id,
	mode: null
      }],
      points: []
    }

    const mode = 'new'
    const points = [{ id, x: 2, y: 1 }]

    const newState = selectMode(oldState, { id, mode, points })

    assert.equal(newState.games.length, oldState.games.length + 1)
    assert.equal(newState.games[0].host, id)
    assert.equal(newState.games[0].opponents.length, 0)

    assert.equal(newState.modes.length, oldState.modes.length)
    assert.equal(newState.modes[0].id, id)
    assert.equal(newState.modes[0].mode, mode)

    assert.equal(newState.points.length, oldState.points.length + 1)
    assert.equal(newState.points[0].id, id)
    assert.equal(newState.points[0].x, points[0].x)
    assert.equal(newState.points[0].y, points[0].y)
  })

  it('should select a join mode', () => {
    const id = 'AI-3'
    const oldState = {
      games: [{
        host: 'Another socket.io hash',
	opponents: []
      }],
      modes: [{
        id,
	mode: null
      }],
      points: []
    }

    const mode = 'join'
    const points = [{ id, x: 2, y: 1 }]

    const newState = selectMode(oldState, { id, mode, points })

    assert.equal(newState.games.length, oldState.games.length)
    assert.equal(newState.games[0].host, 'Another socket.io hash')
    assert.equal(newState.games[0].opponents.length, 0)

    assert.equal(newState.modes.length, oldState.modes.length)
    assert.equal(newState.modes[0].id, id)
    assert.equal(newState.modes[0].mode, mode)

    assert.equal(newState.points.length, oldState.points.length + 1)
    assert.equal(newState.points[0].id, id)
    assert.equal(newState.points[0].x, points[0].x)
    assert.equal(newState.points[0].y, points[0].y)
  })
})
