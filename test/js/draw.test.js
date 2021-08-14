import { expect } from 'chai'
import jsdom from 'jsdom'

import { drawShape } from '../../src/js/draw.js'
import { RigidShape } from '../../src/js/shape.js'
import { Vec2 } from '../../src/js/vector.js'

// Requires npm canvas package here to be installed
const { JSDOM } = jsdom
const { window } = new JSDOM('')
const { document } = window

describe('drawShape', function () {
  it('should draw a shape onto a canvas', function () {
    // Arrange
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
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
    // TODO: Assert pixel on canvas
  })
})
