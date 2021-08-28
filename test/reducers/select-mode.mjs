import assert from 'assert'

import { selectMode } from '../../src/js/server/state/reducers/select-mode.js'

describe('selectMode', () => {
  it('should select the mode', () => {
    const oldState = {
      modes: [{
        id: 'socket.io hash',
	mode: null
      }]
    }

    const id = oldState.modes[0].id
    const mode = 'new'

    const newState = selectMode(oldState, { id, mode })

    assert.equal(newState.modes.length, oldState.modes.length)
    assert.equal(newState.modes[0].id, id)
    assert.equal(newState.modes[0].mode, mode)
  })
})
