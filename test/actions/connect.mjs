import assert from 'assert'

import { CONNECT } from '../../src/js/constants.js'
import { connect } from '../../src/js/server/state/actions/connect.js'

describe('connect', () => {
  it('should add the connection', () => {
    const id = 'Socket.io hash'

    const action = connect(id)

    assert.equal(action.type, CONNECT)
    assert.equal(action.payload.id, id)
  })
})
