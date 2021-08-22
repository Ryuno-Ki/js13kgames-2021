import assert from 'assert'
import sinon from 'sinon'

import { setMessage } from '../src/js/set-message.js'

describe('setMessage', () => {
  let spy

  beforeEach(() => spy = sinon.spy(console, 'log'))

  afterEach(() => sinon.restore())

  it('should set a message', () => {
    const message = 'Hello World!'

    setMessage(message)

    assert(spy.calledOnce)
    assert(spy.calledWith(message))
  })
})
