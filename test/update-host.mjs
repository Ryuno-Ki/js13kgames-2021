import assert from 'assert'
import sinon from 'sinon'

import { dom } from '../src/js/dom.js'
import { updateHost } from '../src/js/update-host.js'

describe('updateHost', () => {
  let spy

  beforeEach(() => spy = sinon.spy(dom.host, 'setAttribute'))

  afterEach(() => sinon.restore())

  it('should update the host state', () => {
    updateHost()

    assert(spy.calledOnce)
  })
})
