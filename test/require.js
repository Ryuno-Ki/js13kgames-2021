const { ROLE_UNKNOWN } = require('../public/shared')

// This file is executed by mocha before the tests are run
class URL {}

const storage = {
  get: () => Promise.resolve([]),
  set: () => Promise.resolve(true)
}

global.document = {
  body: {
    addEventListener: function () {},
    dataset: {}
  },
  createElement: function () {},
  createElementNS: function () {
    return {
      setAttribute: function () {}
    }
  },
  getElementById: function (id) {
    return {
      addEventListener: function () {},
      appendChild: function () {},
      children: [],
      id,
      setAttribute: function () {},
      style: {}
    }
  },
  querySelector: function () {},
  querySelectorAll: function () { return [] }
}

global.window = {
  document: global.document,
  history: {
    pushState: function () {}
  },
  io: function () {
    return {
      emit: function () {},
      on: function () {}
    }
  },
  location: {
    href: ''
  }
}

global.fetch = () => Promise.resolve({
  json: () => Promise.resolve([])
})
global.ROLE_UNKNOWN = ROLE_UNKNOWN
global.storage = storage
global.URL = URL
global.zzfx = function () {}
