import assert from 'assert'
import sinon from 'sinon'

import { state } from '../src/js/state.js'
import { updateHost } from '../src/js/update-host.js'

describe('updateHost', () => {
  let spy

  beforeEach(() => spy = sinon.spy(state.host, 'setAttribute'))

  afterEach(() => sinon.restore())

  it('should update the host state', () => {
    updateHost()

    assert(spy.calledOnce)
  })
})
