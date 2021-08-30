import assert from 'assert'

import { SWAP_USER } from '../../src/js/constants.js'
import { swapUser } from '../../src/js/server/state/actions/swap-user.js'

describe('swapUser', () => {
  it('should create an action for SWAP_USER', () => {
    const id = 'Socket.io hash'
    const replacedId = 'Another socket.io hash'

    const action = swapUser(id, replacedId)

    assert.equal(action.type, SWAP_USER)
    assert.equal(action.payload.id, id)
    assert.equal(action.payload.replacedId, replacedId)
  })
})
