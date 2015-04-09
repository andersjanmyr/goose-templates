'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');

var Samples = require('../../lib/models/samples');
var samples;

describe('Samples', function() {

    beforeEach(function() {
        samples = new Samples();
        // Hook up a default error handler to avoid crash
        samples.on('error', function ignore() {});
    });

    describe('#find', function() {
        it('finds the matching samples', function(done) {
            samples.find('the', function(err, models) {
                expect(models.length).to.equal(2);
                expect(models[0].title).to.match(/the/);
                done();
            });
        });
    });

    describe('#add', function() {
        var original;

        before(function(done) {
            samples.find(null, function(err, models) {
                original = models;
                done();
            });
        });

        it('adds the samples', function(done) {
            var len = original.length
            samples.add({title: 'Hamlet', author: 'Shakespeare'}, function(err, id) {
                expect(id).to.equal('ham');
                samples.find(null, function(err, models) {
                    expect(models.length).to.equal(len + 1);
                    done();
                });
            });
        });

        it('sends an added event with the samples', function(done) {
            samples.on('added', function(b) {
                expect(b.title).to.equal('Julius Ceasar');
                done();
            });
            samples.add({title: 'Julius Ceasar', author: 'Shakespeare'}, function() {
            });
        });
        it('gets an error event if the samples title exists', function(done) {
            samples.on('error', function(error) {
                expect(error).to.equal('Samples not found, id: missing');
                done();
            });
            samples.remove({id: 'missing'}, function() {
            });
        });

    });

    describe('#remove', function() {
        var original;

        before(function(done) {
            samples.find(null, function(err, models) {
                original = models;
                done();
            });
        });

        it('removes the samples by id', function(done) {
            var len = original.length
            samples.remove('zam', function(err) {
                samples.find(null, function(err, models) {
                    expect(models.length).to.equal(len - 1);
                    done();
                });
            });
        });
        it('removes the samples by samples', function(done) {
            var len = original.length
            samples.remove({id: 'geb'}, function(err) {
                samples.find(null, function(err, models) {
                    expect(models.length).to.equal(len - 1);
                    done();
                });
            });
        });
        it('calls back with error if samples missing', function(done) {
            samples.remove({id: 'missing'}, function(err) {
                expect(err).to.equal('Samples not found, id: missing');
                done();
            });
        });
        it('sends a removed event with the samples', function(done) {
            samples.on('removed', function(b) {
                expect(b.title).to.equal('Fooled by Randomness');
                done();
            });
            samples.remove({id: 'fbr'}, function() {
            });
        });
        it('gets an error event if the samples is missing', function(done) {
            samples.on('error', function(error) {
                expect(error).to.equal('Samples not found, id: missing');
                done();
            });
            samples.remove({id: 'missing'}, function() {
            });
        });

    });

    describe('#update', function() {
        var original;

        before(function(done) {
            samples.find(null, function(err, models) {
                original = models;
                done();
            });
        });
        it('calls back with error if samples missing', function(done) {
            samples.update({id: 'missing'}, function(err) {
                expect(err).to.equal('Samples not found, id: missing');
                done();
            });
        });
        it('updates the samples', function(done) {
            var len = original.length
            samples.update({id: 'fbr', title: 'Facebook rules!'}, function(err) {
                samples.findById('fbr', function(err, samples) {
                    expect(samples.title).to.equal('Facebook rules!');
                    done();
                });
            });
        });
        it('sends an updated event with the samples', function(done) {
            samples.on('updated', function(b) {
                expect(b.title).to.equal('Federal Bureau of Randomness');
                done();
            });
            samples.update({id: 'fbr', title: 'Federal Bureau of Randomness'}, function() {
            });
        });
        it('gets an error event if the samples is missing', function(done) {
            samples.on('error', function(error) {
                expect(error).to.equal('Samples not found, id: missing');
                done();
            });
            samples.update({id: 'missing', title: 'Not here'}, function() {
            });
        });
    });

    afterEach(function() {
        samples.reset();
    });
});



