#!/usr/bin/env node

var util = require('util');

function main() {
  var type = 's3';
  var count = 20;
  if (process.argv.length > 2)
    type = process.argv[2];
  if (process.argv.length > 3)
    count = process.argv[3];
  console.log(JSON.stringify(newEvent(type, count), null, 2));
}

function newEvent(type, count) {
  var records = [];
  for (var i = 0; i < count; i++) {
    records.push(newRecord(type));
  }
  return {
    "Records": records
  }
}


function newRecord(type) {
  return type === 's3' ? newS3Record() : newKinesisRecord();
}

function newS3Record() {
  return {
    "eventVersion":"2.0",
    "eventSource":"aws:s3",
    "awsRegion":"us-west-2",
    "eventTime":"1970-01-01T00:00:00.000Z",
    "eventName":"ObjectCreated:Put",
    "userIdentity":{
      "principalId":"AIDAJDPLRKLG7UEXAMPLE"
    },
    "requestParameters":{
      "sourceIPAddress":"127.0.0.1"
    },
    "responseElements":{
      "x-amz-request-id":"C3D13FE58DE4C810",
      "x-amz-id-2":"FMyUVURIY8/IgAtTv8xRjskZQpcIZ9KG4V5Wp6S7S/JRWeUWerMUE5JgHvANOjpD"
    },
    "s3":{
      "s3SchemaVersion":"1.0",
      "configurationId":"testConfigRule",
      "bucket":{
        "name":"sourcebucket",
        "ownerIdentity":{
          "principalId":"A3NL1KOZZKExample"
        },
        "arn":"arn:aws:s3:::sourcebucket"
      },
      "object": newData()
    }
  }
}

function newKinesisRecord() {
  return {
    "kinesis": {
      "partitionKey": "partitionKey-3",
      "kinesisSchemaVersion": "1.0",
      "data": encodedData(),
      "sequenceNumber": "49545115243490985018280067714973144582180062593244200961"
    },
    "eventSource": "aws:kinesis",
    "eventID": "shardId-000000000000:49545115243490985018280067714973144582180062593244200961",
    "invokeIdentityArn": "arn:aws:iam::059493405231:role/testLEBRole",
    "eventVersion": "1.0",
    "eventName": "aws:kinesis:record",
    "eventSourceARN": "arn:aws:kinesis:us-east-1:35667example:stream/examplestream",
    "awsRegion": "us-east-1"
  }
}

function encodedData() {
  var data = newData();
  var json = JSON.stringify(data, ' ');
  return new Buffer(json).toString('base64')
}

function newData() {
  var tagValue = getRandomData();
  return {
    "timestamp": getRandomDate(),
    "installationId": "123123q",
    "tag": tagValue[0],
    "value": tagValue[1]
  }
}


function getRandomData() {
  var index = getRandomInt(0, 2);
  var tag = ['temp', 'humidity'][index];
  var value = (tag === 'temp') ? getRandomInt(-40, 40) : getRandomInt(0, 100);
  return [tag, value];
}


function getRandomDate() {
  var now = new Date();
  var old = new Date(+now - 12096e5)
  var rand = getRandomInt(+old, +now);
  var randomDate = new Date(rand);
  return randomDate.toISOString();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


main();
