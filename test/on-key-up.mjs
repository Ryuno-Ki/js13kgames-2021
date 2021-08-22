import assert from 'assert'

import { onKeyUp } from '../src/js/on-key-up.js'
import { state } from '../src/js/state.js'

describe('onKeyUp', () => {
  it('should update the upTime and isPressed state', () => {
    const { upTime } = state

    onKeyUp()

    assert(upTime !== state.upTime)
    assert(state.isPressed === false)
  })
})
