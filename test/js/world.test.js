import { expect } from 'chai'

import { Vec2 } from '../../src/js/vector.js'
import {
  makeAstronaut,
  makeIceCream,
  makeBoundary
} from '../../src/js/world.js'

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

  describe('makeBoundary', function () {
    it('should make an immobil shape', function () {
      // Arrange
      const x = 0
      const y = 100
      const height = 1
      const width = 200

      // Act
      const boundary = makeBoundary({ x, y, height, width })

      // Assert
      expect(boundary.X[0]).to.deep.equal(Vec2(x, y))
      expect(boundary.X[2]).to.deep.equal(Vec2(x + width, y + height))
    })
  })

  describe('makeIceCream', function () {
    it('should make an power-up shape', function () {
      // Arrange
      const x = 50
      const y = 100

      // Act
      const iceCream = makeIceCream({ x, y })

      // Assert
      expect(iceCream).to.be.an('object')
    })
  })
})
