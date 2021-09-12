import assert from 'assert'

import { init } from '../src/js/client/init.js'
import { state } from '../src/js/client/state.js'

describe('init', () => {
  it('should initialise the game', () => {
    init()

    assert.equal(state.downTime, 0)
    assert.equal(state.isPressed, false)
    assert.equal(state.upTime, 0)
  })
})
