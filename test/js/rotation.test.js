import { expect } from 'chai'

import { updateRotation } from '../../src/js/rotation.js'
import { RigidShape } from '../../src/js/shape.js'
import { Vec2 } from '../../src/js/vector.js'

describe('Rotation', function () {
  it('should update the rotation', function () {
    // Arrange
    const shape = makeShape()
    const g = shape.G // angle
    const v = shape.v // angle velocity
    const x = [...shape.X]

    // Act
    updateRotation(shape)
    
    // Assert
    expect(shape.G).to.equal(g)
    expect(shape.v).to.equal(v)
    shape.X.forEach(function (vertex, i) { expect(vertex).not.to.equal(x[i]) })
  })
})

function makeShape () {
  const center = Vec2(500, 200)
  const friction = 20
  const restitution = 0
  const mass = 400
  const bounds = 1
  const width = 5
  const height = 5

  const shape = RigidShape({
    center,
    mass,
    friction,
    restitution,
    bounds,
    width,
    height
  })

  return shape
}
