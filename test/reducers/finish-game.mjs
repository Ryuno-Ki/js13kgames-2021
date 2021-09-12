import assert from 'assert'

import { finishGame } from '../../src/js/server/state/reducers/finish-game.js'

describe('finishGame', () => {
  it('should finish a game', () => {
    const id = 'socket.io hash'
    const oldState = {
      colors: [{ id, value: 'orange' }],
      games: [{ host: id, opponents: [] }],
      modes: [{ id, mode: 'new' }],
      points: [{ id, x: 0, y: 1 }],
      scenes: [{ id, scene: 'game' }],
      timers: [{ id, turns: 13 }]
    }

    const newState = finishGame(oldState, { id })

    assert.equal(newState.colors.length, oldState.colors.length - 1)
    assert.equal(newState.games.length, oldState.games.length - 1)
    assert.equal(newState.modes.length, oldState.modes.length)
    assert.equal(newState.modes[0].mode, 'fin')
    assert.equal(newState.points.length, oldState.points.length - 1)
    assert.equal(newState.scenes.length, oldState.scenes.length)
    assert.equal(newState.scenes[0].scene, 'fin')
    assert.equal(newState.timers.length, oldState.timers.length - 1)
  })
})
