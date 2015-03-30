'use strict';
module.exports = function (config, MjpegConsumer, numeral, moment, H, log) {
    return function Constructor(cam) {

        //counters
        var intervals = [];
        var stallByteCounter = 0;
        var totalBytesReceived = 0;
        var totalFrames = 0;
        var timeStarted = moment();

        //transformers
        var byteCounter = H()
            .map(function (chunk) {
                totalBytesReceived += chunk.length;
                return chunk;
            });
        var consumer = new MjpegConsumer();
        var frameCounter = H().map(function (frame) {
            totalFrames++;
            return frame;
        });
        var stream = H.pipeline(byteCounter, consumer, frameCounter);


        intervals.push(setInterval(function detectStall() {
            if (totalBytesReceived > stallByteCounter) {
                stallByteCounter = totalBytesReceived;
            } else {
                stream.emit('stall');
            }

        }, config.stallTimeOut * 1000));

        var reportInterval = config.reportInterval;
        if (reportInterval) {
            intervals.push(setInterval(function report() {
                var since = timeStarted.fromNow();
                var size = numeral(totalBytesReceived).format('0 b');
                var secondsSince = moment().diff(timeStarted, 'seconds');
                var bitrate = Math.round((totalBytesReceived / 1024) / secondsSince) + 'KB/sec';
                var frameRate = Math.round((totalFrames / secondsSince) * 100) / 100 + '/sec';
                log('Since:', since, 'Frames', totalFrames, 'Framerate:', frameRate, 'Total:', size, 'Bitrate:', bitrate, 'Url:', cam.url);
            }, reportInterval * 1000));
        }

        stream.on('end', function () {
            if (intervals.length) {
                log('Removing logger for dead connection from memory');
                intervals.forEach(clearInterval);
            }
        });
        return stream;
    };

};