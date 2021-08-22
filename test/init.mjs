import assert from 'assert'

import { init } from '../src/js/init.js'
import { state } from '../src/js/state.js'

describe('init', () => {
  it('should initialise the game', () => {
    init()

    assert(state.host !== null)
    assert(state.hostPoints.length === 0)
    assert(state.socket !== null)
    assert(state.startTime > 0)
  })
})
