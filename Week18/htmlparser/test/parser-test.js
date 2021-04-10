let assert = require('assert');
import {parseHTML} from '../src/parser.js';

describe('parse html', function () {
  it("<a href='http://www.link.com'></a>", () => {
    let tree = parseHTML("<a href='http://www.link.com'></a>");
    assert.equal(tree.children[0].tagName, "a");
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });
  it('<a />', function () {
    let tree = parseHTML('<a />');
    assert.equal(tree.children[0].tagName, 'a');
  })
  it('<a></a>', function () {
    let tree = parseHTML('<a></a>');
    assert.equal(tree.children[0].tagName, 'a');
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a href="https://www.baidu.com"></a>', function () {
    let tree = parseHTML('<a href="https://www.baidu.com"></a>');
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a href></a>', function () {
    let tree = parseHTML('<a href></a>');
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a href id></a>', function () {
    let tree = parseHTML('<a href id></a>');
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a href="abc" id></a>', function () {
    let tree = parseHTML('<a href="abc" id></a>');
    assert.equal(tree.children[0].tagName, 'a');
  })
  it('<input>', function () {
    let tree = parseHTML('<input>');
    assert.equal(tree.children[0].tagName, 'input');
  })
  it('<a>aaa</a>', function () {
    let tree = parseHTML('<a>aaa</a>');
    assert.equal(tree.children[0].tagName, 'a');
    assert.equal(tree.children[0].children.length, 1)
  })
  it('<A></A>', function () {
    let tree = parseHTML('<A></A>');
    assert.equal(tree.children[0].tagName, 'A');
  })
})

