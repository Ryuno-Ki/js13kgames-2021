import assert from 'assert'

import { init } from '../src/js/client/init.js'
import { state } from '../src/js/client/state.js'

describe('init', () => {
  it('should initialise the game', () => {
    init()

    assert(state.host !== null)
    assert(state.hostPoints.length === 0)
    assert(state.socket !== null)
    assert(state.startTime > 0)
  })
})
