import assert from 'assert'
import sinon from 'sinon'

import { onEnd } from '../src/js/on-end.js'

describe('onEnd', () => {
  let spy

  beforeEach(() => spy = sinon.spy(console, 'log'))

  afterEach(() => sinon.restore())

  it('should set a message', () => {
    onEnd()

    assert(spy.calledOnce)
  })
})
