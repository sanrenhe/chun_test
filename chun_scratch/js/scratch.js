/**
 * @fileOverview 刮一刮
 * @author qinchunzhen
 * @eamil chunzhen@leju.com
 * @date 2016/04/27
 */
// if ($.fn.touch !== undefined) {
//     return false;
// }
var isTouch = 'ontouchstart' in window,
    isMSPointer = window.navigator.msPointerEnabled,
    isPointer = window.navigator.pointerEnabled;

$.fn.touch = touch;

function convertEvent(code) {
    var events = [{
        enable: isTouch,
        start: "touchstart",
        move: "touchmove",
        end: "touchend"
    }, {
        enable: isMSPointer,
        start: "MSPointerDown",
        move: "MSPointerMove",
        end: "MSPointerUp"
    }, {
        enable: isPointer,
        start: "pointerdown",
        move: "pointermove",
        end: "pointerup"
    }, {
        enable: !(isTouch || isMSPointer || isPointer),
        start: "mousedown",
        move: "mousemove",
        end: "mouseup"
    }];
    for (var i in events) {
        if (events[i].enable) return events[i][code];
    }
}

function touch(eventCode, fn) {
    var eventName = convertEvent(eventCode);
    if (eventCode === 'move') {
        $(this).on('dragstart', function(e) {
            e.preventDefault();
        });
    }
    $(this).on(eventName, function(e) {
        if (eventCode !== 'end') {
            var p = $(this).offset();
            e.targetX = (isTouch ? e.touches[0].pageX : e.pageX || e.x) - p.left;
            e.targetY = (isTouch ? e.touches[0].pageY : e.pageY || e.y) - p.top;
        }
        fn.call(this, e);
    });
    return $(this);
}

//自定义绘图和字体
function customDraw() {
    var _this = this;
    //自定义绘制中间小图
    this.imageLoad('../scratch/images/l_scratch_tit.png', function() {
        _this.maskCtx.drawImage(this, 0, 0, this.width, this.height, _this.width * .1, _this.height * .4, _this.width * .8, _this.height * .2);
        //自定义字体样式
        _this.maskCtx.textBaseline = "middle";
        _this.maskCtx.textAlign = "center";
        _this.maskCtx.fillStyle = "#fefcf1";
        _this.maskCtx.font = 'Bold 24px "微软雅黑", Helvetica, STHeiti, Droidsansfallback';
        _this.maskCtx.fillText(_this.coverText, _this.width / 2, _this.height / 2);
        //刮奖效果关键
        _this.maskCtx.globalCompositeOperation = 'destination-out';
    });
}

function ScratchCard(options) {
    var defaults = {
        container: null, //画布容器元素
        realResult: null, //中奖结果层
        onStarted: null, //（用于请求后台数据）
        onComplete: null, //刮完
        enabled: true, //状态 true可用 否则不绑定触摸事件

        //以下参数可使用默认值
        width: 0, //默认100%
        height: 0, //同上
        coverColor: '', //蒙版层颜色
        coverImage: '', //图片 || src
        coverText: '', //蒙版层文字
        ratio: 40, //触发比例（达到则隐藏蒙版层）

        //以下参数自动生成
        hrefList: [], //结果中A标签href属性
        mask: null, //蒙版（自动生成）
        maskCtx: null, //蒙版context
        background: null, //隐藏canvas 克隆于mask 用于计算比例
        backgroundCtx: null //context
    };
    $.extend(this, defaults, options);
}

ScratchCard.prototype = {
    init: function() {
        this.width = this.width || this.container.width();
        this.height = this.height || this.container.height();
        // 生成蒙板DOM
        this.mask = this.mask || $('<canvas/>').attr({
            'width': this.width,
            'height': this.height
        });
        //克隆并隐藏计算层
        this.background = this.mask.clone().css({
            position: 'absolute',
            opacity: 0
        });
        this.container.append(this.background).append(this.mask);
        this.maskCtx = this.maskCtx || this.mask.get(0).getContext('2d');
        this.backgroundCtx = this.background.get(0).getContext('2d');
        //检查初始状态（如：是否关注）
        if (this.enabled) {
            this.bindEvent();
        }
        this.drawMask();
    },
    // 获取当前canvas透明像素的百分比
    getTransparentPercent: function(ctx, width, height) {
        // 获取画布的像素点
        var imgData = ctx.getImageData(0, 0, width, height),
            pixles = imgData.data,
            transPixs = [];

        // 计算画布中，透明程度（第四个值为透明度0-255）
        for (var i = 0, j = pixles.length; i < j; i += 4) {
            var a = pixles[i + 3];
            if (a < 128) {
                transPixs.push(i);
            }
        }
        return transPixs.length / (pixles.length / 4) * 100;
    },
    //显示中奖结果
    showResult: function() {
        // var _this = this;
        // var $aOfResult = $("a[href]", _this.realResult); //结果层中所有A标签
        // // 处理结果DIV中A标签，末完全刮开A链接点击无效
        // $aOfResult.each(function(index) {
        //     _this.hrefList.push($aOfResult.eq(index).attr("href"));
        //     $aOfResult.eq(index).removeAttr("href");
        // });
    },
    //隐藏图层
    hideContainer: function() {
        // var _this = this;
        // //还原A标签href属性
        // var $aOfResult = $("a", _this.realResult);
        // $aOfResult.each(function(index) {
        //     $aOfResult.eq(index).attr("href", _this.hrefList[index]);
        // });
        //隐藏涂层
        $(this.container).hide();
        typeof(this.onComplete) === 'function' && this.onComplete.apply(this);
    },
    // 事件处理
    bindEvent: function() {
        var _this = this;
        var started = false;
        // start
        this.container.touch('start', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // 记录开始move
            started = true;
            _this.showResult();
            // 画点
            _this.drawPoint(_this.backgroundCtx, e.targetX, e.targetY, true);
            _this.drawPoint(_this.maskCtx, e.targetX, e.targetY, true);
            if (!_this.isOnStarted) {
                // 执行请求数据
                typeof(_this.onStarted) === 'function' && _this.onStarted.apply(_this);
                _this.isOnStarted = true;
            }
        });
        //move
        this.container.touch('move', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // 记录是否开始move
            if (!started)
                return false;
            // 画点
            _this.drawPoint(_this.backgroundCtx, e.targetX, e.targetY, false);
            _this.drawPoint(_this.maskCtx, e.targetX, e.targetY, false);
        });
        //end
        _this.container.touch('end', function(e) {
            e.preventDefault();
            e.stopPropagation();
            started = false;
            var per = _this.getTransparentPercent(_this.backgroundCtx, _this.width, _this.height);
            if (per >= +_this.ratio) {
                _this.hideContainer();
            }
        });
    },
    // 画布上画点
    drawPoint: function(ctx, x, y, begin) {
        if (begin) {
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            // 画笔大小
            ctx.lineWidth = 30;
            // 前者是线的末端样式，后者是线连接处的样式---圆
            ctx.lineCap = ctx.lineJoin = 'round';
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        /*这个费解的代码是为了兼容*/
        this.container.append(this.background).append(this.mask);
    },
    // 画蒙板
    drawMask: function() {
        this.backgroundCtx.fillStyle = '#000';
        this.backgroundCtx.fillRect(0, 0, this.width, this.height);
        this.backgroundCtx.globalCompositeOperation = 'destination-out';
        var _this = this;
        if (this.coverColor) {
            this.maskCtx.fillStyle = this.coverColor;
            this.maskCtx.fillRect(0, 0, this.width, this.height);
            if (!this.coverImage) _this.drawText();
        }
        if (this.coverImage) {
            this.imageLoad(this.coverImage, function() {
                _this.maskCtx.drawImage(this, 0, 0, this.width, this.height, 0, 0, _this.width, _this.height);
                _this.drawText();
            });
        }
    },
    //加载图片
    imageLoad: function(img, callback) {
        var that = this;
        if (typeof img === 'string') {
            var item = new Image();
            item.src = img;
            return that.imageLoad(item, callback);
        }
        if (img.length) {
            var imgs = [];
            img.forEach(function(item) {
                imgs.push(that.imageLoad(item, callback));
            });
            return imgs;
        }
        if (img.complete && img.src) {
            callback.call(img, img);
        } else {
            img.onload = function(e) {
                callback.call(this, this);
                img.onload = null;
            };
        }
        return img;
    },
    //写字
    drawText: function() {
        var txt = this.coverText; //涂层文字
        if (txt) {
            this.maskCtx.fillStyle = "#999999";
            this.maskCtx.font = 'Bold 34px Arial';
            this.maskCtx.textBaseline = "middle";
            this.maskCtx.textAlign = "center";
            this.maskCtx.fillText(txt, this.width / 2, this.height / 2);
        }
        this.maskCtx.globalCompositeOperation = 'destination-out';
    }
}

function prize() {
	requestData(handleData);
}

function requestData(callback) {
    callback({
        "status": "succ",
        "info": {
            "type": 1,
            "text": "aaaa",
            "url": "http://m.leju.com",
            "num": 2
        }
    });
    return;
    return $.ajax({
        url: "",
        type: "get",
        dataType: "json",
        cache: false,
        success: function(data) {
            callback(data);
        }
    });
}

function handleData(data) {
    if (data.status == "succ") {
        var info = data.info;
        if (info.type === 1) {
            $('#prize_1').show();
            $('#prize_1 .txt').text(info.text);
            $("#lingqu").attr("href", info.url);
        } else {
            $('#prize_0').show();
            $('#prize_0 .txt').text(info.text);
        }
        $('#times').text(info.num);
    } else if (data.status == "fail") {}
}

var mask = new ScratchCard({
    container: $('#container'), //刮奖层
    realResult: $('#realResult'), //结果层
    //刮奖图
    coverImage: '../scratch/images/l_scratch_mask.png',
    //刮奖文字
    coverText: $('#coverText').val(),
    //开关
    enabled: $('#enabled').val(),
    //在触摸时触发
    onStarted: prize
});
mask.drawText = customDraw; // 覆盖默认方法
mask.init();
