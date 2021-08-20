import { expect } from 'chai'

import { updatePosition } from '../../src/js/position.js'
import { RigidShape } from '../../src/js/shape.js'
import { Vec2 } from '../../src/js/vector.js'

describe('Position', function () {
  describe('when passed no gravity', function () {
    it('should update the position using a default value', function () {
      // Arrange
      const shape = makeShape()
      const c = {...shape.C}
      const v = {...shape.V}
      const x = [...shape.X]

      // Act
      updatePosition(shape)

      // Assert
      expect(shape.C).not.to.equal(c)
      expect(shape.V).not.to.equal(v)
      shape.X.forEach(function (vertex, i) {
        expect(vertex).not.to.equal(x[i])
      })
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
