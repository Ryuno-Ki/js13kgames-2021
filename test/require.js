const { ROLE_UNKNOWN } = require('../public/shared')

// This file is executed by mocha before the tests are run
class URL {}

global.document = {
  body: {
    addEventListener: function () {}
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
      setAttribute: function () {}
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

global.URL = URL
global.ROLE_UNKNOWN = ROLE_UNKNOWN
global.zzfx = function () {}
