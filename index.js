'use strict';

var injector = require('./injector');
var log = injector.get('log');
var config = injector.get('config');
var fs = require('fs');
var H = require('./vendor/highland');
var request = require('request');
var StreamLogger = injector.get('StreamLogger');
var TimeSplitter = injector.get('TimeSplitter');

process.on('SIGINT', function () {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
    process.exit();
});

var cams = injector.get('cams');


H(cams).each(function (cam) {
    var connect = function () {
        var logger = new StreamLogger(cam);
        var splitter = new TimeSplitter(cam);

        var cameraStream = H(request(cam.url));
        var reconnect = function () {
            log('Reconnecting:', cam.url);
            logger.destroy();
            splitter.destroy();
            cameraStream.destroy();
            setTimeout(connect, config.reconnect * 1000);
        };
        cameraStream.on('error', function () {
            log('Server connection error', cam.url);
            reconnect();
        });

        logger.on('stall', function () {
           log('Stall detected', cam.url);
            reconnect();
        });

        cameraStream
            .through(logger)
            .through(splitter)
            .apply(function () {
                //consume highland stream
            });
    };
    connect();
});









