import assert from 'assert'

import { addName } from '../src/js/server/state/actions/add-name.js'
import store from '../src/js/server/state/store.js'

describe('Store', () => {
  it('should get the current state', () => {
    const state = store.getState()

    assert.deepEqual(state.users, [])
  })

  it('should dispatch an action to update the state', () => {
    const id = 'Socket.io hash'
    const name = 'Test'
    const action = addName(id, name)

    store.dispatch(action)
    const state = store.getState()

    assert.equal(state.users.length, 1)
  })
})
