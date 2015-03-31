'use strict';

var assert = require("assert")
var {{dromedarcase .NAME}} = require("../lib/{{dasherized .NAME}}");

describe('{{dromedarcase .NAME}}', function(){
  it('should return -1 when the value is not present', function(){
    var actual = {{dromedarcase .NAME}}();
    assert.equal(actual, "{{dromedarcase .NAME}}");
  });
});

