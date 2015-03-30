'use strict';
var obj = {};
var H = require('./highland');

obj.assign = function () {
    var args = Array.prototype.slice.call(arguments);
    return function (array) {
        var obj = {};
        if (array && array.constructor === Array) {
            array.forEach(function (item, index) {
                if (args[index]) {
                    obj[args[index]] = item;
                }
            });
        } else {
            if (args[0]) {
                obj[args[0]] = array;
            }
        }
        return obj;
    };
};

obj.eatError = function (err, push) {
    console.log('There was and error an I ate it:', err);
};

obj.inspect = function (msg) {
    return function (err, x, push, next) {
        if (x === H.nil) {
            console.log(msg, 'Nil')
        } else {
            console.log(msg, 'Data');
        }
        if (err) {
            console.log(msg, 'Error', err);
        }
        next();
        push(null, x);
    };
};

obj.log = function (msg) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(msg);
        console.log.apply(this, args);
    };
};

module.exports = obj;
