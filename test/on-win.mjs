import assert from 'assert'
import sinon from 'sinon'

import { onWin } from '../src/js/on-win.js'

describe('onWin', () => {
  let spy

  beforeEach(() => spy = sinon.spy(console, 'log'))

  afterEach(() => sinon.restore())

  it('should display the score', () => {
    onWin()

    assert(spy.calledOnce)
  })
})
