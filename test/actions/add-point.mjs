import assert from 'assert'

import { ADD_POINT } from '../../src/js/constants.js'
import { addPoint } from '../../src/js/server/state/actions/add-point.js'

describe('addPoint', () => {
  it('should create an action for ADD_POINT', () => {
    const id = 'Socket.io hash'
    const point = { x: 0, y: 1 }

    const action = addPoint(id, point)

    assert.equal(action.type, ADD_POINT)
    assert.equal(action.payload.id, id)
    assert.equal(action.payload.point.x, point.x)
    assert.equal(action.payload.point.y, point.y)
  })
})
