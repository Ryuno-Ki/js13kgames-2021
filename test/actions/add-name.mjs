import assert from 'assert'

import { ADD_NAME } from '../../src/js/constants.js'
import { addName } from '../../src/js/server/state/actions/add-name.js'

describe('addName', () => {
  it('should create an action for ADD_NAME', () => {
    const id = 'Socket.io hash'
    const name = 'Test'

    const action = addName(id, name)

    assert.equal(action.type, ADD_NAME)
    assert(action.payload.hue >= 0)
    assert.equal(action.payload.id, id)
    assert.equal(action.payload.name, name)
  })
})
