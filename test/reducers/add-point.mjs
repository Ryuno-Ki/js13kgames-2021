import assert from 'assert'

import { addPoint } from '../../src/js/server/state/reducers/add-point.js'

describe('addPoint', () => {
  it('should add a point for an user to the state', () => {
    const oldState = {
      points: []
    }

    const id = 'socket.io hash'
    const point = { x: 0, y: 1 }

    const newState = addPoint(oldState, { id, point })

    assert.equal(newState.points.length, oldState.points.length + 1)
    assert.equal(newState.points[0].id, id)
    assert.equal(newState.points[0].x, point.x)
    assert.equal(newState.points[0].y, point.y)
  })
})
