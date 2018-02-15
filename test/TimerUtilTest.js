let expect = require("chai").expect;
let TimerUtil = require("../timerUtil");

describe("Timer util", function () {
    let timerUtil;

    beforeEach(function() {
        timerUtil = new TimerUtil();
    });

    it("should be define", function () {
        expect(timerUtil).not.to.be.undefined;
    });

    describe("getAppDuration", function () {
        it("should return duration eq min to sec ", function () {
            expect(timerUtil.getAppDuration("5:30")).to.equal(5500);
        });
    });
});
