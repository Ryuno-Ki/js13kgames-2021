import { expect } from 'chai'

import { RigidShape } from '../../src/js/shape.js'
import { Vec2 } from '../../src/js/vector.js'

describe('RigidShape', function () {
  it('should create a rigid shape', function () {
    // Arrange
    const center = Vec2(500, 200)
    const friction = 20
    const restitution = 0
    const mass = 400
    const bounds = 1
    const width = 5
    const height = 5

    // Act
    const shape = RigidShape({
      center,
      mass,
      friction,
      restitution,
      bounds,
      width,
      height
    })

    // Assert
    expect(shape).to.be.an('object')
  })
})
