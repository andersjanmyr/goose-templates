var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var express = require('express');
var bodyParser = require('body-parser');

var modelRouter = require('../../lib/routes/model-router');
var Samples = require('../../lib/models/samples.js');
var model = new Samples();

var app = express();
app.use(bodyParser.json());
app.use('/models', modelRouter(model));

describe('modelRouter', function() {
    before(function() {
        model.reset();
    });
    describe('GET /models?filter=fooled', function() {
        it('responds with matching models', function(done) {
            request(app)
            .get('/models?filter=fooled')
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.length).to.equal(1);
                expect(res.body.length).to.equal(1);
                done();
            });
        });
    });

    describe('GET /models/geb', function() {
        it('responds with matching model', function(done) {
            request(app)
            .get('/models/geb')
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.title).to.match(/Gödel/);
                done();
            });
        });
    });

    describe('POST /models', function() {
        it('adds the new model', function(done) {
            request(app)
            .post('/models')
            .send({author: 'fake', title: 'Fakemodel swims!'})
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body).to.equal('fas');
                done();
            });
        });
    });

    describe('PUT /models/fbr', function() {
        it('responds with matching model', function(done) {
            request(app)
            .put('/models/fbr')
            .send({title: 'Fakemodel rocks!'})
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.title).to.match(/Fakemodel/);
                done();
            });
        });
    });

    describe('DELETE /models/fbr', function() {
        it('responds with matching model', function(done) {
            request(app)
            .delete('/models/fbr')
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.title).to.match(/Fakemodel/);
                done();
            });
        });
    });
});
