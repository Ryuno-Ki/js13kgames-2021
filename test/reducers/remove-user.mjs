import assert from 'assert'

import { removeUser } from '../../src/js/server/state/reducers/remove-user.js'

describe('removeUser', () => {
  it('should remove a user from the state', () => {
    const id = 'socket.io hash'
    const users = [{ id, name: 'Test' }]
    const oldState = {
      users
    }

    const newState = removeUser(oldState, { id })

    assert.equal(newState.users.length, oldState.users.length - 1)
  })
})
