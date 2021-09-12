import assert from 'assert'

import { FINISH_GAME } from '../../src/js/constants.js'
import { finishGame } from '../../src/js/server/state/actions/finish-game.js'

describe('finishGame', () => {
  it('should create an action for FINISH_GAME', () => {
    const id = 'Socket.io hash'

    const action = finishGame(id)

    assert.equal(action.type, FINISH_GAME)
    assert.equal(action.payload.id, id)
  })
})
