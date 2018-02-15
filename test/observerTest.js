let expect = require("chai").expect;
let Observer = require("../observer");
let Sinon = require("sinon");
let chai = require("chai");
let sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);


describe("Observer", function () {
    let observer;

    beforeEach(function() {
        observer = new Observer();
    });

    it("should be define", function () {
        expect(observer).not.to.be.undefined;
    });

    describe("observer functionalities: on and emit", function () {

        beforeEach(function() {
            observer = new Observer();
        });

        it("should observer array calling on function ", function () {
            observer.on('a', new Function());
            observer.on('a', new Function());
            observer.on('b', new Function());
            observer.on('b', new Function());

            expect(observer.observers['a'].length).to.equal(2);
            expect(observer.observers['b'].length).to.equal(2);
        });

        it("should execute callback on emit function ", function () {
            let fx = Sinon.spy();
            observer.on('a', fx);
            observer.emit('a');
            fx.should.have.been.called;
            expect(observer.observers['a'].length).to.equal(1);
        });

        it("should not break on emit for none registred function", function () {
            observer.emit('a');
        });
    });
});
