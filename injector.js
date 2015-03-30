'use strict';
var Container = require('plus.container');
var container = new Container();

container.register('config', function () {return require('node-yaml-config').load(__dirname + '/config.yml');});
container.register('numeral', function () {return require('numeral');});
container.register('moment', function () {return require('moment');});
container.register('sanitize', function () {return require('sanitize-filename');});
container.register('errorHandler', function () {return function (error) {throw error;};});
container.register('H', function () {return require('./vendor/highland');});
container.register('MjpegConsumer', function () {return require('mjpeg-consumer');});
container.register('path', function () {return require('path');});
container.register('fs', function () {return require('fs');});
container.register('log', function () {return console.log.bind(console);});
container.register('cams', require('./getCams'), ['config', 'path', 'fs', 'log', 'sanitize']);
container.register('StreamLogger', require('./streamLogger'), ['config', 'MjpegConsumer', 'numeral', 'moment', 'H', 'log']);
container.register('TimeSplitter', require('./timeSplitter'), ['H','moment','config','log','path','fs']);


module.exports = container;