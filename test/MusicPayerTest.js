let expect = require("chai").expect;
let MusicPlayer = require("../MusicPlayer/MusicPlayer");
let playlists = require("../playlists");
let Sinon = require("sinon");
let chai = require("chai");
let sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);
let TimerUtil = require("../timerUtil");
let timerUtil = new TimerUtil();

//http://www.zsoltnagy.eu/fake-timers-with-sinonjs/

describe("Music player", function () {
    let musicPlayer;

    beforeEach(function() {
        musicPlayer = new MusicPlayer();
        musicPlayer.logger.info = new Function();
    });

    it("should be define", function () {
        expect(musicPlayer).not.to.be.undefined;
    });

    describe("Music player functionnality play", function () {

        it("should be defined", function () {
            expect(musicPlayer.play).not.to.be.undefined;
        });

        it("should set the current track", function () {
            let clock = Sinon.useFakeTimers();
            musicPlayer.loadPlayList(playlists[0].albums[0]);
            musicPlayer.emit = Sinon.spy();
            musicPlayer.play();
            expect(musicPlayer.currentTrack.title).to.equal('Bloom');
        });

        it("should set the timeStarted", function () {
            let clock = Sinon.useFakeTimers();
            musicPlayer.loadPlayList(playlists[0].albums[0]);
            musicPlayer.emit = Sinon.spy();
            musicPlayer.play();
            expect(musicPlayer.timeStarted).not.to.be.undefined
        });

        it("should call emit end on songs finished", function () {
            let clock = Sinon.useFakeTimers();
            musicPlayer.loadPlayList(playlists[0].albums[0]);
            musicPlayer.emit = Sinon.spy();
            musicPlayer.play();
            clock.tick(timerUtil.getAppDuration(musicPlayer.currentTrack.length));
            musicPlayer.emit.should.have.been.called;
        });
    });

    describe("Music player functionnality stop", function () {
        it("should be defined", function () {
            expect(musicPlayer.stop).not.to.be.undefined;
        });
        it("should clear timeout and set curser to 0", function () {
            let clock = Sinon.useFakeTimers();
            let clearTimeoutSpy = Sinon.spy(clock, "clearTimeout");
            musicPlayer.loadPlayList(playlists[0].albums[0]);
            musicPlayer.curser = 3;
            musicPlayer.emit = Sinon.spy();
            musicPlayer.play();
            musicPlayer.stop();
            expect(musicPlayer.curser).to.equal(0);
            clearTimeoutSpy.should.have.been.called
        });
    });

    describe("Music player functionnality pause", function () {
        it("should be defined", function () {
            expect(musicPlayer.pause).not.to.be.undefined;
        });
        it("should clear timeout and timePause be defined", function () {
            let clock = Sinon.useFakeTimers();
            let clearTimeoutSpy = Sinon.spy(clock, "clearTimeout");
            musicPlayer.loadPlayList(playlists[0].albums[0]);
            musicPlayer.play();
            musicPlayer.pause();
            expect(musicPlayer.timePause).not.to.be.undefined;
            clearTimeoutSpy.should.have.been.called
        });
    });

    describe("Music player functionnality loadPlayList", function () {
        it("should be defined", function () {
            expect(musicPlayer.loadPlayList).not.to.be.undefined;
        });

        it("should be loaded", function () {
            musicPlayer.loadPlayList('123');
            expect(musicPlayer.playlist).to.equal('123');
        });
    });

    describe("Music player functionnality resume", function () {
        it("should be defined", function () {
            expect(musicPlayer.resume).not.to.be.undefined;
        });

        it("should not launch error on call", function () {
            musicPlayer.resume();
            expect(musicPlayer.resume).not.to.be.undefined;
        });

    });

    describe("Music player functionnality next", function () {
        it("should be defined", function () {
            expect(musicPlayer.next).not.to.be.undefined;
        });

        it("should call play after incrementing curser", function () {
            let clock = Sinon.useFakeTimers();
            let clearTimeoutSpy = Sinon.spy(clock, "clearTimeout");
            musicPlayer.loadPlayList(playlists[0].albums[0]);
            musicPlayer.play();
            musicPlayer.play = Sinon.spy();
            musicPlayer.next();
            musicPlayer.play.should.have.been.called;
            expect(musicPlayer.curser).to.equal(1);
        });

        it("should reset curseur to  0 and emit playListEnded", function () {
            let clock = Sinon.useFakeTimers();
            musicPlayer.emit = Sinon.spy();
            let clearTimeoutSpy = Sinon.spy(clock, "clearTimeout");
            musicPlayer.loadPlayList(playlists[0].albums[0]);
            musicPlayer.curser = 7;
            musicPlayer.play();
            musicPlayer.next();
            expect(musicPlayer.curser).to.equal(0);
            musicPlayer.emit.should.have.been.calledWith('playListEnded');
        });

    });

    describe("Music player functionnality playListEnded ", function () {
        it("should be defined", function () {
            expect(musicPlayer.playListEnded).not.to.be.undefined;
        });

        it("should log info of ended playlist", function () {
            let consoleLogSpy = Sinon.spy(console, 'info')
            musicPlayer.loadPlayList(playlists[0].albums[0]);
            musicPlayer.playListEnded();
            consoleLogSpy.should.have.been.called;
            console.info.restore();
        });

    });
});
