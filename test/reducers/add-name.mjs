import assert from 'assert'

import { addName } from '../../src/js/server/state/reducers/add-name.js'

describe('addName', () => {
  it('should add a user to the state', () => {
    const oldState = {
      users: []
    }

    const id = 'socket.io hash'
    const name = 'New name'

    const newState = addName(oldState, { id, name })

    assert.equal(newState.users.length, oldState.users.length + 1)
    assert.equal(newState.users[0].id, id)
    assert.equal(newState.users[0].name, name)
  })
})
