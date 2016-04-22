/**
 * @fileOverview 倒计时
 * @author qinchunzhen
 * @email chunzhen@lej.com
 * @date 2016.04.11
 */
module.exports = CountTime;

/*倒计时组件*/
function CountTime(options) {
    this.day = ''; // 倒计时天数容器
    this.hour = ''; // 倒计时小时数容器
    this.min = ''; // 倒计时分钟数容器
    this.sec = ''; // 倒计时秒钟数容器
    this.interval = 1000; // 倒计时间隔
    this.callback = null; // 回调函数
    $.extend(this, options);
    this.init(); // 初始化
    return this;
}

CountTime.prototype = {
    /*初始化*/
    init: function() {
        var that = this;
        var chars = { // 倒计时输入字符
            day: { F: '0', S: '0' },
            hour: { F: '0', S: '0' },
            min: { F: '0', S: '0' },
            sec: { F: '0', S: '0' }
        };
        var d = new Date(),
            dHour = d.setHours(that.hour),
            dMin = d.setMinutes(that.min),
            dSec = d.setSeconds(that.sec);
        var time = d.getTime() + that.day * 24 * 60 * 60 * 1000;
        var countTime = new Date();
        var value = countTime.setTime(time);
        /*倒计时数*/
        _calcMoment = function() {
            value -= 1000;
            var tt = new Date(value);
            // Hour
            chars.hour.F = parseInt(tt.getHours() / 10);
            chars.hour.S = tt.getHours() % 10;
            // Minutes
            chars.min.F = parseInt(tt.getMinutes() / 10);
            chars.min.S = tt.getMinutes() % 10;
            // Second
            chars.sec.F = parseInt(tt.getSeconds() / 10);
            chars.sec.S = tt.getSeconds() % 10;
            // Day
            chars.day.F = parseInt(that.day / 10);
            chars.day.S = that.day % 10;

            if (tt.getHours() == 0 && tt.getMinutes() == 0 && tt.getSeconds() == 0) {
                that.countDown_Days -= 1;
            };
            if (that.countDown_Days == -1 && tt.getHours() == 0 && tt.getMinutes() == 0 && tt.getSeconds() == 0) {
                clearInterval(that.timer);
            };

            that.callback && that.callback(chars);
        };

        that.timer = setInterval(_calcMoment, that.interval);

        return that;
    },
}
