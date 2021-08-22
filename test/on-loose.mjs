import assert from 'assert'
import sinon from 'sinon'

import { onLoose } from '../src/js/on-loose.js'

describe('onLoose', () => {
  let spy

  beforeEach(() => spy = sinon.spy(console, 'log'))

  afterEach(() => sinon.restore())

  it('should display the score', () => {
    onLoose()

    assert(spy.calledOnce)
  })
})
