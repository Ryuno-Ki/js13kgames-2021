import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { drawShape } from '../../src/js/draw.js'
import { RigidShape } from '../../src/js/shape.js'
import { Vec2 } from '../../src/js/vector.js'

chai.use(sinonChai)
const { expect } = chai

describe('drawShape', function () {
  it('should draw a shape onto a canvas', function () {
    // Arrange
    const context = makeContext()
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

    // Act
    drawShape(context, shape)

    // Assert
    expect(context.strokeRect).to.have.been.calledOnce;
  })
})

function makeContext () {
  return {
    fillRect: function () {},
    restore: function () {},
    rotate: function () {},
    save: function () {},
    strokeRect: sinon.spy(),
    translate: function () {},
  }
}
