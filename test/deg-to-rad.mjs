import assert from 'assert'

import { degToRad } from '../src/js/client/deg-to-rad.js'

describe('degToRad', () => {
  it('should map degree to radians', () => {
    const degree = 180

    const radians = degToRad(degree)

    assert(radians === Math.PI)
  })
})
