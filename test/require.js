const { ROLE_UNKNOWN } = require('../public/shared')

// This file is executed by mocha before the tests are run
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
      appendChild: function () {},
      children: [],
      id,
      setAttribute: function () {}
    }
  }
}

global.window = {
  document: global.document,
  io: function () {
    return {
      emit: function () {},
      on: function () {}
    }
  }
}

global.ROLE_UNKNOWN = ROLE_UNKNOWN
global.zzfx = function () {}
