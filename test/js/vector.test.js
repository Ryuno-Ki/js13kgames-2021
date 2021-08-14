import { expect } from 'chai'

import {
  add,
  determinant,
  distance,
  dot,
  length,
  normalize,
  scale,
  subtract,
  Vec2,
} from '../../src/js/vector.js'

describe('Vector library', function () {
  describe('Vec2', function () {
    it('should turn two numbers into a vector', function () {
      // Arrange
      const x = 2
      const y = 5

      // Act
      const vector = Vec2(x, y)

      // Assert
      expect(vector).to.have.property('x')
      expect(vector).to.have.property('y')
      expect(vector.x).to.equal(x)
      expect(vector.y).to.equal(y)
    })
  })

  describe('dot', function () {
    it('should compute the dot product of two vectors', function () {
      // Arrange
      const v = Vec2(2, 5)
      const w = Vec2(7, 6)

      // Act
      const product = dot(v, w)

      // Assert
      expect(product).to.equal(2 * 7 + 5 * 6)
    })
  })

  describe('add', function () {
    it('should add two vectors', function () {
      // Arrange
      const v = Vec2(2, 5)
      const w = Vec2(7, 6)

      // Act
      const sum = add(v, w)

      // Assert
      expect(sum).to.deep.equal(Vec2(9, 11))
    })
  })

  describe('scale', function () {
    it('should compute the scalar product of a number with a vector', function () {
      // Arrange
      const v = Vec2(2, 5)
      const n = -1

      // Act
      const product = scale(v, n)

      // Assert
      expect(product).to.deep.equal(Vec2(-2, -5))
    })
  })

  describe('subtract', function () {
    it('should subtract one vector from another', function () {
      // Arrange
      const v = Vec2(2, 5)
      const w = Vec2(7, 6)

      // Act
      const difference = subtract(v, w)

      // Assert
      expect(difference).to.deep.equal(Vec2(2 - 7, 5 - 6))
    })
  })

  describe('determinant', function () {
    it('should compute the determinant of two vectors', function () {
      // Arrange
      const v = Vec2(2, 5)
      const w = Vec2(7, 6)

      // Act
      const result = determinant(v, w)

      // Assert
      expect(result).to.equal(2 * 6 - 7 * 5)
    })
  })

  describe('length', function () {
    it('should compute the length of a vector', function () {
      // Arrange
      const v = Vec2(3, 4)

      // Act
      const result = length(v)

      // Assert
      expect(result).to.equal(5)
    })
  })

  describe('distance', function () {
    it('should compute the distance of two vectors', function () {
      // Arrange
      const v = Vec2(7, 9)
      const w = Vec2(4, 5)

      // Act
      const result = distance(v, w)

      // Assert
      expect(result).to.equal(5)
    })
  })

  describe('normalize', function () {
    it('should normalize a vector (scale to length 1)', function () {
      // Arrange
      const v = Vec2(3, 4)

      // Act
      const normalized = normalize(v)

      // Assert
      expect(normalized.x).to.be.approximately(0.6, 0.001)
      expect(normalized.y).to.be.approximately(0.8, 0.001)
    })
  })
})
