import assert from 'assert'
import sinon from 'sinon'

import { onConnect } from '../src/js/on-connect.js'

describe('onConnect', () => {
  let spy

  beforeEach(() => spy = sinon.spy(console, 'log'))

  afterEach(() => sinon.restore())

  it('should set a message', () => {
    onConnect()

    assert(spy.calledOnce)
  })
})
