'use strict';
module.exports = function (config, path, fs, log, sanitize) {
    var videoFolder = config.folder;
    log('Writing to:', videoFolder);
    if (!fs.existsSync(videoFolder)) {
        fs.mkdirSync(videoFolder);
    }

    return config.cams
        .map(function (url) { //add folder property to cam object
            return {
                url: url,
                folder: path.normalize(videoFolder + '/' + sanitize(url))
            };
        })
        .map(function (cam) { //create folder for each cam if necessary
            var folder = cam.folder;
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
            return cam;
        });
};