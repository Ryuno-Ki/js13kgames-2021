import assert from 'assert'

import { SELECT_MODE } from '../../src/js/constants.js'
import { selectMode } from '../../src/js/server/state/actions/select-mode.js'

describe('selectMode', () => {
  it('should select a mode', () => {
    const id = 'Socket.io hash'
    const mode = 'new'

    const action = selectMode(id, mode)

    assert.equal(action.type, SELECT_MODE)
    assert.equal(action.payload.id, id)
    assert.equal(action.payload.mode, mode)
  })
})
