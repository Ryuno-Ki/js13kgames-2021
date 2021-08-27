import assert from 'assert'

import { REMOVE_USER } from '../../src/js/constants.js'
import { removeUser } from '../../src/js/server/state/actions/remove-user.js'

describe('removeUser', () => {
  it('should create an action for REMOVE_USER', () => {
    const id = 'Socket.io hash'

    const action = removeUser(id)

    assert.equal(action.type, REMOVE_USER)
    assert.equal(action.payload.id, id)
  })
})
