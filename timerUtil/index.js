function TimerUtil(duration) {}

TimerUtil.prototype.getAppDuration = function (duration) {
    let tab = duration.split(':');
    let res = 0;
    return  (parseInt(tab[0]) + (parseInt(tab[1])/60)) * 1000;
};

module.exports = TimerUtil;