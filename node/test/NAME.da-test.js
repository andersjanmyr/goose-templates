'use strict';

var assert = require("assert")
var {{dromedarcase .NAME}} = require("../lib/{{dasherized .NAME}}");

describe('{{dromedarcase .NAME}}', function(){
  it('returns the name string', function(){
    var actual = {{dromedarcase .NAME}}();
    assert.equal(actual, "{{dromedarcase .NAME}}");
  });
});

