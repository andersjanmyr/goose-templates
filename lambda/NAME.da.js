'use strict';
var path = require('path');
var util = require('util');

var aws = require('aws-sdk');
var async = require('async');

function {{dromedarcase .NAME}}(items, callback) {
  async.waterfall([
    doSomething.bind(null, items),
    doSomethingElse
  ], callback);
}

function doSomething(items, callback) {
  console.log('doSomething', items);
  process.nextTick(callback.bind(null, null, { somethingDone: true, items: items}));
}

function doSomethingElse(data, callback) {
  console.log('doSomethingElse', data);
  process.nextTick(callback.bind(null, null, { somethingElseDone: true, data: data}));
}


{{dromedarcase .NAME}}.handler = function(event, context) {
  console.log(JSON.stringify(event, null, '  '));
  var items = [];
  for (var i = 0; i < event.Records.length; ++i) {
    var item = extractItem(event.Records[i]);
    if (validItem(item))
      items.push(item);
  }
  {{dromedarcase .NAME}}(items, function(err, result) {
    context.done(err, JSON.stringify(result, null, 2));
  });
};

function extractItem(record) {
  if (record.kinesis) {
    var encodedPayload = record.kinesis.data;
    var payload = new Buffer(encodedPayload, 'base64').toString('utf8');
    console.log("Decoded Kinesis payload: " + payload);
    return JSON.parse(payload);
  } else if (record.s3) {
    return record.s3.object;
  } else {
    throw new Error('Unknown record: ' + record);
  }
}

function validItem(item) {
  return true;
}


module.exports = {{dromedarcase .NAME}};


if(require.main === module) {
  console.log("called directly");
  if (process.argv.length < 3)
    usageExit();
  try {
    var data = JSON.parse(process.argv[2]);
    if (!Array.isArray(data)) {
      console.error('JSON is not an array: ', JSON.stringify(data, null, 2));
      usageExit();
    }
  } catch (error) {
    console.error('Invalid JSON', error);
    usageExit();
  }
  {{dromedarcase .NAME}}(data, function(err, res) {
    console.log("Result", err, res);
  });
}

function usageExit() {
    console.error('Usage: '  + path.basename(process.argv[1]) + ' json-array');
    process.exit(1);
}
