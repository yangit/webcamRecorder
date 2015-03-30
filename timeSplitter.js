'use strict';
module.exports = function (H, moment, config, log, path, fs) {
    var options = {flags: 'a'};

    return function Constructor(cam) {
        var startTime;
        var fileName;
        var filePath;
        var pointer;
        var init = function () {
            startTime = moment();
            fileName = startTime.format('x') + '.' + config.extension;
            filePath = path.normalize(cam.folder + '/' + fileName);
            pointer = fs.createWriteStream(filePath, options);
            log('Temp file created:', filePath);
        };

        var end = function () {
            pointer.end();
            var newPath = path.normalize(
                cam.folder + '/' +
                startTime.format('x') + '-' + moment().format('x') +
                '.' + config.extension
            );
            fs.stat(filePath, function (err, stats) {
                if (stats.size > 0) {
                    fs.rename(filePath, newPath, function () {
                        log('File finalized:', newPath);
                    });
                } else {
                    fs.unlink(filePath, function () {
                        log('File was empty, deleted', filePath);
                    });
                }
            });

        };


        var stream = H()
            .map(function (image) {
                if (moment().diff(startTime, 'minute') >= config.timeSpan) {
                    end();
                    init();
                } else {
                    pointer.write(image);
                }
            });
        stream.on('end', function () {
            log('Recovering file');
            end();
        });

        init();
        return stream;

    };
};