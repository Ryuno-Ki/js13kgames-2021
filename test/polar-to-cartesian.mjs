import assert from 'assert'

import { polarToCartesian } from '../src/js/server/polar-to-cartesian.js'

describe('polarToCartesian', () => {
  it('should map polar coordinates to cartesian ones', () => {
    const polar = { radius: 1, angle: Math.PI }

    const cartesian = polarToCartesian(polar)

    assert.equal(cartesian.x, -1)
    // Float math *sighs
    assert.equal(~~cartesian.y, 0)
  })
})
