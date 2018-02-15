let TimerUtil = require("../timerUtil");
let timerUtil = new TimerUtil();
let util = require('util');
let Observer = require('../observer');
let moment = require('moment');

function MusicPlayer() {
    Observer.call(this);
    this.playlist = [];
    this.curser = 0;
    this.currentTrack = undefined;
    this.on('trackEnded', this.next.bind(this));
    this.on('playListEnded', this.playListEnded.bind(this));
}
util.inherits(MusicPlayer, Observer);

MusicPlayer.prototype.play = function () {
    this.currentTrack = this.playlist.songs[this.curser];

    console.log(this.currentTrack, "playing");

    (function (track, player) {
        player.timer = setTimeout(function () {
            console.log(track, "ended");
            player.emit('trackEnded')
        }, timerUtil.getAppDuration(track.length));
        player.timeStarted = moment();
    })(this.currentTrack, this);

    return this;
};
MusicPlayer.prototype.loadPlayList = function (playlist) {
    this.playlist = playlist;
    return this;
};
MusicPlayer.prototype.pause = function () {
    clearTimeout(this.timer);
    this.timePause = moment();
};
MusicPlayer.prototype.stop = function () {
    console.log('player is stopped');
    clearTimeout(this.timer);
    this.curser = 0;
};

MusicPlayer.prototype.playListEnded = function () {
    console.info(this.playlist.title, "has ended");
};

MusicPlayer.prototype.next = function () {
    if(this.playlist.songs[this.curser+1]){
        this.curser++;
        this.play();
    }else{
        this.curser = 0;
        this.emit('playListEnded');
    }
};

MusicPlayer.prototype.resume = function () {
};

module.exports = MusicPlayer;
