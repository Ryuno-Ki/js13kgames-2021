import assert from 'assert'

import { getCoordinates } from '../src/js/client/get-coordinates.js'

describe('getCoordinates', () => {
  it('should get the coordinates', () => {
    const coordinates = getCoordinates()

    assert(coordinates.length > 0)
  })
})
