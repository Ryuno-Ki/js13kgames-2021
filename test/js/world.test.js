import { expect } from 'chai'

import { Vec2 } from '../../src/js/vector.js'
import { makeAstronaut, makeBottomBoundary } from '../../src/js/world.js'

describe('World', function () {
  describe('makeAstronaut', function () {
    it('should make an astronaut shape', function () {
      // Arrange
      /* nothing to do here */

      // Act
      const astronaut = makeAstronaut()

      // Assert
      expect(astronaut).to.be.an('object')
    })
  })

  describe('makeBottomBoundary', function () {
    it('should make an immobil shape', function () {
      // Arrange
      const x = 0
      const y = 100
      const height = 1
      const width = 200

      // Act
      const boundary = makeBottomBoundary({ x, y, height, width })

      // Assert
      expect(boundary.X[0]).to.deep.equal(Vec2(x, y))
      expect(boundary.X[2]).to.deep.equal(Vec2(x + width, y + height))
    })
  })
})
