Quick start:

    sudo apt-get install build-essential
    git clone https://github.com/yangit/webcamRecorder.git
    cd webcamRecorder
    #change values in config.yml, especially video folder.
    npm install
    node index

    [X] Check
        [X] recorded mjpeg file can be played with vlc
        [X] bitrate on average allows to write 10 streams for 10 days to single 2TB drive.
    [X] settings file
    [X] create separate folder for each camera
    [X] connect to cams from settings file
    [X] save streams in mjpg streams
    [X] cut streams with timestamps in 5 min chunks
    [X] reconnects if network is up\down
    [X] does not leak memory on reconnect attempts/errors
