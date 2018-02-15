let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let Player = require('./MusicPlayer/MusicPlayer');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('cmd', function (data) {
    })
});

app.use('/modules', express.static(__dirname + '/node_modules'));

http.listen(3000, function(){
    console.log('listening on *:3000');
});