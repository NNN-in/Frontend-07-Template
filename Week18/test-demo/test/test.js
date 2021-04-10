let assert = require('assert');
// let add = require('../add.js');
import add from '../add.js';

describe('add function', function () {
  it('1 + 2 = 3', function () {
    assert.equal(add(1,2), 3)
  })
})

