import assert from 'assert'
import sinon from 'sinon'

import { displayScore } from '../src/js/display-score.js'

describe('displayScore', () => {
  let spy

  beforeEach(() => spy = sinon.spy(console, 'log'))

  afterEach(() => sinon.restore())

  it('should display the score', () => {
    const score = '42'

    displayScore(score)

    assert(spy.calledOnce)
    assert(spy.calledWith(score))
  })
})
