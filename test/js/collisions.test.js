import { expect } from 'chai'

import { testBoundaries, testCollision } from '../../src/js/collisions.js'
import { RigidShape } from '../../src/js/shape.js'
import { Vec2 } from '../../src/js/vector.js'

describe('Collisions', function () {
  describe('testBoundaries', function () {
    it('should test the boundaries of two shapes for intersection', function () {
      // Arrange
      const shape1 = makeShape()
      const shape2 = makeShape()

      // Act
      const haveIntersectingBoundaries = testBoundaries(shape1, shape2)

      // Assert
      expect(haveIntersectingBoundaries).to.equal(true)
    })
  })

  describe('testCollision', function () {
    it('should test in depth for collisions', function () {
      // Arrange
      const shape1 = makeShape()
      const shape2 = makeShape()

      // Act
      const haveCollided = testCollision(shape1, shape2)

      // Assert
      expect(haveCollided).to.equal(true)
    })
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
