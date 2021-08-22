import assert from 'assert'
import sinon from 'sinon'

import { onError } from '../src/js/on-error.js'

describe('onError', () => {
  let spy

  beforeEach(() => spy = sinon.spy(console, 'log'))

  afterEach(() => sinon.restore())

  it('should set a message', () => {
    onError()

    assert(spy.calledOnce)
  })
})
