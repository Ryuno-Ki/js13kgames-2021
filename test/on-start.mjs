import assert from 'assert'

// SIC!
import shared from '../public/shared.js'
import { onStart } from '../src/js/client/on-start.js'

const { ROLE_HOST, ROLE_OPPONENT } = shared
global.ROLE_HOST = ROLE_HOST
global.ROLE_OPPONENT = ROLE_OPPONENT

describe('onStart', () => {
  it('should set a message', () => {
    const details = {
      role: ROLE_HOST,
      opponents: [],
      spectators: []
    }

    onStart(details)
  })
})
