'use strict';
var debug = require('debug')('{{dasherized .NAME}}:samples');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

// Samples
var data = [{
    id: 'geb',
    title: 'Gödel, Escher, Bach: an Eternal Golden Braid',
    author: 'Douglas Hofstadter'
},
{
    id: 'bof',
    title: 'The Beginning of Infinity, Explanations That Transform the World',
    author: 'David Deutsch'
},
{
    id: 'zam',
    title: 'Zen and the Art of Motorcycle Maintenance',
    author: 'Robert Pirsig'
},
{
    id: 'fbr',
    title: 'Fooled by Randomness',
    author: 'Nicholas Taleb'
}];

function clone(object) {
    var copy = {};
    for (var key in object)
        copy[key] = object[key];
    return copy;
}

function copy() {
    return data.map(function(samples) {
        return clone(samples);
    });
}

function Samples() {
    this.data = copy();
    EventEmitter.call(this);
}
util.inherits(Samples, EventEmitter);

Samples.prototype.find = function find(filter, callback) {
    if (!filter)
        return process.nextTick(callback.bind(null, null, this.data));

    // Call the callback on next iteration with this=null, err=null, data=data
    var filtered = this.data.filter(function(samples) {
        var regex = new RegExp(filter, 'i');
        return regex.test(samples.author) || regex.test(samples.title);
    });
    debug(filtered);
    process.nextTick(callback.bind(null, null, filtered));
};

Samples.prototype.findById = function findById(id, callback) {
    var found = this.data.filter(function(samples) {
        return samples.id === id;
    });
    if (found.length)
        return process.nextTick(callback.bind(null, null, found[0]));
    else
        return process.nextTick(callback.bind(null, 'Samples not found, id: ' + id));
};

Samples.prototype.createId = function createId(title) {
    var words = title.toLowerCase().split(/[ .]/).filter(function(word) {
        return ['a', 'of', 'the'].indexOf(word) === -1;
    });

    if (words.length > 2)
        return words[0].charAt(0) + words[1].charAt(0) + words[2].charAt(0);
    else if (words.length > 1)
        return words[0].slice(0, 2) + words[1].charAt(0);
    return words[0].slice(0, 3);
};

Samples.prototype.add = function add(samples, callback) {
    var self = this;
    var id = this.createId(samples.title);
    this.findById(id, function(err, found) {
        if (found) {
            var message = 'Samples already exists, id: ' + id;
            self.emit('error', message);
            return callback && process.nextTick(callback.bind(null, message));
        }
        samples.id = id;
        self.data.push(samples);
        self.emit('added', samples);
        return callback && process.nextTick(callback.bind(null, null, id));
    });
};

Samples.prototype.update = function update(samples, callback) {
    var self = this;
    var id = samples.id;
    this.findById(id, function(err, found) {
        if (!found) {
            var message = 'Samples not found, id: ' + id;
            self.emit('error', message);
            return callback && process.nextTick(callback.bind(null, message));
        }
        found.title = samples.title;
        found.author = samples.author;
        self.emit('updated', found);
        return callback && process.nextTick(callback.bind(null, null, found));
    });
};

Samples.prototype.remove = function remove(sampleOrId, callback) {
    var self = this;
    var id = sampleOrId.id || sampleOrId;
    this.findById(id, function(err, samples) {
        if (!samples) {
            var message = 'Samples not found, id: ' + id;
            self.emit('error', message);
            return callback && process.nextTick(callback.bind(null, message));
        }
        var i = self.data.indexOf(samples);
        self.data.splice(i, 1);
        self.emit('removed', samples);
        return callback && process.nextTick(callback.bind(null, null, samples));
    });
};

Samples.prototype.reset = function reset() {
    this.data = copy();
};

module.exports = Samples;
