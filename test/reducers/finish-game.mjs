import assert from 'assert'

import { finishGame } from '../../src/js/server/state/reducers/finish-game.js'

describe('finishGame', () => {
  it('should finish a game', () => {
    const id = 'socket.io hash'
    const oldState = {
      modes: [{ id, mode: 'new' }],
      scenes: [{ id, scene: 'game' }],
    }

    const newState = finishGame(oldState, { id })

    assert.equal(newState.modes.length, oldState.modes.length)
    assert.equal(newState.modes[0].mode, 'fin')
    assert.equal(newState.scenes.length, oldState.scenes.length)
    assert.equal(newState.scenes[0].scene, 'fin')
  })
})
