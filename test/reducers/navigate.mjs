import assert from 'assert'

import { navigate } from '../../src/js/server/state/reducers/navigate.js'

describe('navigate', () => {
  it('should navigate an user to another scene', () => {
    const id = 'socket.io hash'
    const scene = 'fin'

    const oldState = {
      scenes: [{
        id,
        scene: 'start'
      }]
    }


    const newState = navigate(oldState, { id, scene })

    assert.equal(newState.scenes.length, oldState.scenes.length)
    assert.equal(newState.scenes[0].id, id)
    assert.equal(newState.scenes[0].scene, scene)
  })
})
