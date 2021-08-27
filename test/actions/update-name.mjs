import assert from 'assert'

import { UPDATE_NAME } from '../../src/js/constants.js'
import { updateName } from '../../src/js/server/state/actions/update-name.js'

describe('updateName', () => {
  it('should create an action for UPDATE_NAME', () => {
    const id = 'Socket.io hash'
    const name = 'Test'

    const action = updateName(id, name)

    assert.equal(action.type, UPDATE_NAME)
    assert.equal(action.payload.id, id)
    assert.equal(action.payload.name, name)
  })
})
