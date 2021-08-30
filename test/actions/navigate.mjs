import assert from 'assert'

import { NAVIGATE } from '../../src/js/constants.js'
import { navigate } from '../../src/js/server/state/actions/navigate.js'

describe('navigate', () => {
  it('should create an action for NAVIGATE', () => {
    const id = 'Socket.io hash'
    const scene = 'home'

    const action = navigate(id, scene)

    assert.equal(action.type, NAVIGATE)
    assert.equal(action.payload.id, id)
    assert.equal(action.payload.scene, scene)
  })
})
