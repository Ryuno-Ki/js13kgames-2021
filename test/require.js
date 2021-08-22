// This file is executed by mocha before the tests are run
global.document = {
  body: {
    addEventListener: function () {}
  },
  createElement: function () {},
  getElementById: function (id) {
    return {
      id,
      setAttribute: function () {}
    }
  }
}

global.window = {
  document: global.document,
  io: function () {
    return {
      on: function () {}
    }
  }
}
