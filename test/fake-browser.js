// This file is to executed by mocha before the tests are run
global.document = {
  createElement: function () {},
  getElementById: function (id) {
    // TODO: Decide according to `id` which fake element to return
    return {
      id
    }
  }
}

