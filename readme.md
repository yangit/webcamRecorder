Quick start:

    #Install node.js and git packages first.
    sudo apt-get install build-essential
    git clone https://github.com/yangit/webcamRecorder.git
    cd webcamRecorder
    #change values in config.yml, especially video folder.
    npm install
    node index

    #if script sometimes exits but can last at least an hour, please use https://github.com/foreverjs/forever
    #or similar tool to keep it running. There is no point to debug it in that case.

Features:

    [X] Check
        [X] recorded mjpeg file can be played with vlc
        [X] bitrate on average 500mb for 10 cams for 10 min
    [X] settings file
    [X] create separate folder for each camera
    [X] connect to cams from settings file
    [X] save streams in mjpg streams
    [X] cut streams with timestamps in 5 min chunks
    [X] reconnects if network is up\down
    [X] does not leak memory on reconnect attempts/errors
