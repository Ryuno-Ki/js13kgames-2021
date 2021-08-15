import { expect } from 'chai'

import { computeNormals, RigidShape } from '../../src/js/shape.js'
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

  describe('computeNormals', function () {
    it('should compute the face normals of a shape', function () {
      // Arrange
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
      const originalFaces = shape.N.map(function (face) {
        return {...face}
      })

      // Act
      computeNormals(shape)

      // Assert
      shape.N.forEach(function (face, index) {
	const originalFace = originalFaces[index]
        expect(face).to.not.deep.equal(originalFace)
      })
    })
  })
})
