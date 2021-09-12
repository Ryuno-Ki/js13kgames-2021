import assert from 'assert'

import { addName } from '../../src/js/server/state/reducers/add-name.js'

describe('addName', () => {
  it('should add a user to the state', () => {
    const oldState = {
      colors: [],
      modes: [],
      users: []
    }

    const hue = 42
    const id = 'socket.io hash'
    const name = 'New name'

    const newState = addName(oldState, { hue, id, name })

    assert.equal(newState.colors.length, oldState.colors.length + 1)
    assert.equal(newState.colors[0].id, id)
    assert(newState.colors[0].value.includes(hue))

    assert.equal(newState.users.length, oldState.users.length + 1)
    assert.equal(newState.users[0].id, id)
    assert.equal(newState.users[0].name, name)

    assert.equal(newState.modes.length, oldState.modes.length + 1)
    assert.equal(newState.modes[0].id, id)
    assert.equal(newState.modes[0].mode, null)
  })
})
