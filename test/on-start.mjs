import assert from 'assert'
import sinon from 'sinon'

import { onStart } from '../src/js/on-start.js'

describe('onStart', () => {
  let spy

  beforeEach(() => spy = sinon.spy(console, 'log'))

  afterEach(() => sinon.restore())

  it('should set a message', () => {
    onStart()

    assert(spy.calledOnce)
  })
})
