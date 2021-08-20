import { expect } from 'chai'

import { dom } from '../../src/js/dom.js'

describe('DOM', function () {
  it('should get a reference to the canvas element', function () {
    // Arrange
    /* Nothing to do */

    // Act
    const { canvas } = dom

    // Assert
    expect(canvas).not.to.be.undefined
  })

  it('should get a reference to the xinput element', function () {
    // Arrange
    /* Nothing to do */

    // Act
    const { xinput } = dom

    // Assert
    expect(xinput).not.to.be.undefined
  })

  it('should get a reference to the yinput element', function () {
    // Arrange
    /* Nothing to do */

    // Act
    const { yinput } = dom

    // Assert
    expect(yinput).not.to.be.undefined
  })
})
