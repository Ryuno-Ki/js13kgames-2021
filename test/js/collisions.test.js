import { expect } from 'chai'

import {
  testBoundaries,
  testCollision,
  testIntersection
} from '../../src/js/collisions.js'
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

  describe('testIntersection', function () {
    it('should test for intersecting line segments', function () {
      // Arrange
      const v1 = Vec2(97.5, 97.5)
      const v2 = Vec2(-5, 0)
      const v3 = Vec2(94.5, 97.5)
      const v4 = Vec2(0, -5)

      // Act
      const haveIntersectingLineSegments = testIntersection([v1, v2, v3, v4])

      // Assert
      expect(haveIntersectingLineSegments).to.equal(true)
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

    it('should test for no contact', function () {
      // Arrange
      const shape1 = makeShape({ centre: Vec2(100, 100) })
      const shape2 = makeShape({ centre: Vec2(94, 100) })

      // Act
      const haveCollided = testCollision(shape1, shape2)

      // Assert
      expect(haveCollided).to.equal(false)
    })

    it('should test for direct contact', function () {
      // Arrange
      const shape1 = makeShape({ centre: Vec2(100, 100) })
      const shape2 = makeShape({ centre: Vec2(95, 100) })

      // Act
      const haveCollided = testCollision(shape1, shape2)

      // Assert
      expect(haveCollided).to.equal(true)
    })
  })
})

function makeShape ({ centre } = {}) {
  const center = centre || Vec2(500, 200)
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
