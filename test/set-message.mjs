import assert from 'assert'

import { setMessage } from '../src/js/client/set-message.js'

describe('setMessage', () => {
  it('should set a message', () => {
    const message = 'Hello World!'

    setMessage(message)
  })
})
