import assert from 'assert'
import sinon from 'sinon'

import { onDisconnect } from '../src/js/on-disconnect.js'

describe('onDisconnect', () => {
  let spy

  beforeEach(() => spy = sinon.spy(console, 'log'))

  afterEach(() => sinon.restore())

  it('should set a message', () => {
    onDisconnect()

    assert(spy.calledOnce)
  })
})
