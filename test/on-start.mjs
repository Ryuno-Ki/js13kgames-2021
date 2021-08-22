import assert from 'assert'

import shared from '../public/shared.js'
import { onStart } from '../src/js/on-start.js'

const { ROLE_HOST, ROLE_OPPONENT } = shared
global.ROLE_HOST = ROLE_HOST
global.ROLE_OPPONENT = ROLE_OPPONENT

describe('onStart', () => {
  it('should set a message', () => {
    const details = {
      role: ROLE_HOST,
      opponents: 0,
      spectators: 0
    }

    onStart(details)
  })
})
