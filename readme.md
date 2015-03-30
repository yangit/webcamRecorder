Quick start:

    Requirements:
        node.js and git installed in the system
        Check config settings in config.yml


    sudo apt-get install build-essential
    git clone https://github.com/yangit/webcamRecorder.git
    cd webcamRecorder
    npm install
    node index

    [ ] Check
        [X] recorded mjpeg file can be played with vlc
        [ ] bitrate on average allows to write 10 streams for 10 days to single 2TB drive.
    [X] settings file
    [X] create separate folder for each camera
    [X] connect to cams from settings file
    [X] save streams in mjpg streams
    [X] cut streams with timestamps in 5 min chunks
    [X] reconnects if network is up\down
    [ ] does not leak memory on reconnect attempts/errors
