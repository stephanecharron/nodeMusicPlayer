let MusicPayer = require('./MusicPlayer/MusicPlayer');
let playlists = require('./playlists/index');

let m = new MusicPayer()
    .loadPlayList(playlists[0].albums[0])
    .play();

//https://socket.io/get-started/chat/

(function (player) {
    setTimeout(function () {
        //player.stop();
    },10000)
})(m);