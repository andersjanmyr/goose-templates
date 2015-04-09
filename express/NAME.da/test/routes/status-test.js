var request = require('supertest');
var assert = require('assert');
var sinon = require('sinon');
var express = require('express');
var routes = require('../../lib/routes/status');

var app = express();
app.use('/status', routes);

describe('GET /status', function() {

    it('responds with health good', function(done) {
        request(app)
            .get('/status')
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.get('content-type'), 'application/json');
                assert.equal(res.body.health, 'good');
                done();
            });
    });

});

