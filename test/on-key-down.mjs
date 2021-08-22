import assert from 'assert'

import { onKeyDown } from '../src/js/on-key-down.js'
import { state } from '../src/js/state.js'

describe('onKeyDown', () => {
  it('should update the downTime and isPressed state', () => {
    const { downTime } = state
    assert(state.isPressed === false)

    onKeyDown()

    assert(downTime !== state.downTime)
    assert(state.isPressed === true)
  })
})
