import assert from 'assert'

import { updateName } from '../src/js/server/state/reducers/update-name.js'

describe('updateName', () => {
  it('should update the state of the user with the new name', () => {
    const oldState = {
      users: [{
        id: 'socket.io hash',
        name: 'Old name'
      }]
    }
    const id = oldState.users[0].id
    const name = 'New name'

    const newState = updateName(oldState, { id, name })

    assert.equal(newState.users.length, oldState.users.length)
    assert.equal(newState.users[0].id, id)
    assert.equal(newState.users[0].name, name)
  })
})
