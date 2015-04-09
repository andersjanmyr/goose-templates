var request = require('supertest');
var expect = require('chai').expect;
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
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.health).to.equal('good');
                done();
            });
    });

});

