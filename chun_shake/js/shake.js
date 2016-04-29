/**
 * @fileOverview 摇一摇
 * @author qinchunzhen
 * @email chunzhen@leju.com
 * @date 2016/04/26
 */
var shakeAudio = $("audio")[0];
var x = y = z = lastX = lastY = lastZ = 0;
var audioLoaded = false;
var shakeFlag = true;
var last_update = new Date().getTime();
var speed = 10;
var startTime = new Date().getTime();

$(document).ready(function() {
    // 每隔五秒按钮摇一摇
    var btnTime = window.setInterval(function() {
        $(".d-shake-btn").removeClass("d-wobble");
        shakeEvent();
    }, 5000);

    function shakeEvent() {
        window.setTimeout(function() {
            $(".d-shake-btn").addClass("d-wobble");
        }, 1000);
    }


    /*判断是否支持声音播放*/
    shakeAudio.addEventListener("canplay", function() {
        audioLoaded = true;
    });
    shakeAudio.load();

    /*摇一摇*/
    // 绑定手机摇动事件
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    }

    function deviceMotionHandler(event) {
        var accGravity = event.accelerationIncludingGravity;
        x = accGravity.x;
        y = accGravity.y;
        if (Math.abs(x - lastX) > speed && Math.abs(y - lastY) > speed) {
            handleShake();
        }
        lastX = x;
        lastY = y;
        lastZ = z;
    }
    // 绑定按钮点击事件
    $("#shakeBtn").on("click", handleShake);
    // 摇动事件处理
    function handleShake() {
        // 手机摇动，小人摇一摇
        $(".d-people").removeClass("d-bounceInDown");
        $(".d-people").addClass("d-dwobble");
        var curTime = new Date().getTime();
        var diff = curTime - last_update;
        if (diff > 100 && shakeFlag == true) {
            shakeFlag = false;
            last_update = curTime;
            if (audioLoaded) {
                shakeAudio.currentTime = 0;
                shakeAudio.play();
            }
            sendData(handleData);
        }
        window.setTimeout(function() {
            $(".d-people").removeClass("d-dwobble");
        }, 2000);
    }

    /*请求后台数据*/
    var count = 3;

    function sendData(callback) {

        callback({
            "info": [{
                "status": "succ",
                "info": {
                    "type": "3",
                    "num": "0",
                    "text": "活动已结束"
                }
            }, {
                "status": "succ",
                "info": {
                    "type": "0",
                    "num": "1",
                    "text": "无摇奖次数"
                }
            }, {
                "status": "succ",
                "info": {
                    "type": "1",
                    "url": "http://m.leju.com",
                    "num": "2",
                    "text": "中奖了"
                }
            }, {
                "status": "succ",
                "info": {
                    "type": "2",
                    "num": "3",
                    "text": "未中奖"
                }
            }]
        });
        return;
        return $.ajax({
            type: "get",
            url: "",
            success: function(data) {
                callback(data);
            }
        });
    }

    function handleData(data) {
    	if(count < 0) {
    		return false;
    	}
        var period = new Date().getTime() - startTime;
        var timeout = period < 2000 ? 2000 - period : 0;
        var data = data.info[count];
        count -= 1;
        if (data.status == "succ") {
            var type = parseInt(data.info.type);
            window.setTimeout(function() {
                // 0没有摇奖机会，1中奖，2未中奖, 3活动已结束
                var showId = "";
                if (type == 0) {
                    showId = '#wuyaojiangcishu';
                } else if (type == 1) {
                    showId = '#zhongjiang';
                    $("#getPrize").attr("href", data.info.url);
                    if (data.info.pic) {
                        $("#picZhongjiang").src = data.info.pic;
                    }
                } else if (type == 2) {
                    showId = '#weizhongjiang';
                } else if (type == 3) {
                    showId = '#wuyaojiangcishu';
                    $("#huoDongJieSu").addClass("none");
                    $(".tiShiTxt").parent().addClass("d-150");
                } else {
                    return;
                }
                $("#num").html(data.info.num);
                $(".tiShiTxt").html(data.info.text);
                $("#zhongjiang,#weizhongjiang,#wuyaojiangcishu").hide();
                $(showId).show();
            }, timeout);
        }
    }

    // 再摇一次
    $("#againBtn").on("click", function() {
        $(".d-popup").hide();
        shakeFlag = true;
    });

    // 弹窗灰层点击隐藏
    $(".d-popup").on("click", function() {
        $(this).hide();
        shakeFlag = true;
    });
    $(".d-popupbox").on("click", function(e) {
        e.stopPropagation();
    });
});
