/**
 * @fileOverview js原生滚动条
 * @athor qinchunzhen
 * @email chunzhen@leju.com
 * @date 2016-1-23 
 */
function loadjscssfile(filename, filetype) {
    if (filename === '' || filetype === '') {
        console.log('引入错误！');
        return false;
    }
    if (filetype == 'js') {
        var fileScript = document.createElement('script');
        fileScript.setAttribute('type', 'text/javascript');
        fileScript.setAttribute('src', filename);
        document.body.appendChild(fileScript);
    } else if (filetype == 'css') {
        var fileLink = document.createElement('link');
        fileLink.setAttribute('rel', 'stylesheet');
        fileLink.setAttribute('type', 'text/css');
        fileLink.setAttribute('href', filename);
        document.head.appendChild(fileLink);
    } else {
        console.log('无效引入');
        return false;
    }
}

function scrollBar() {
    this.$body = document.body;
    this.$scrollBar1 = document.getElementById("scrollBar1");
    this.$viewport = document.getElementById("viewport");
    this.$overview = document.getElementById("overview");
    this.scrollFlag = false;
}

scrollBar.prototype = {
    init: function() {
        var that = this;

        that.$viewport.style.height = '500px';
        that.$viewport.style.overflow = 'hidden';
        that.$viewport.style.margin = '0px';

        that.createBar();
        that.zan(4);

        return that;
    },
    createBar: function() {
        var that = this;
        // 创建滚动条框
        var $scrollBarBody = document.createElement('div');
        $scrollBarBody.id = 'scrollBar';
        $scrollBarBody.style.left = that.$viewport.offsetWidth - 20 + 'px';
        $scrollBarBody.style.height = that.$viewport.offsetHeight + 'px';
        that.$scrollBar1.appendChild($scrollBarBody);
        // 创建滚动条
        var $track = document.createElement('div');
        $track.id = 'track';
        $track.style.top = '1px';
        $track.style.height = that.$viewport.offsetHeight * 0.2 + 'px';
        $scrollBarBody.appendChild($track);

        that.scrollEvent($track, $scrollBarBody);

        return that;
    },
    scrollEvent: function($track, $scrollBarBody) {
        var that = this;

        $track.addEventListener("mousedown", put, false);

        function put(e) {
            that.shakeFlag = true;
            // .noSelect文本不能选中
            that.$body.className = "noSelect";

            that.$body.addEventListener("mousemove", move, false);
            $track.addEventListener("mousemove", move, false);

            function move(event) {
                if (that.shakeFlag) {
                    var slidingPost = event.pageY - 40,
                        slidingDistance = parseInt($scrollBarBody.style.height) - parseInt($track.style.height);
                    if (slidingPost > 0 && slidingPost < slidingDistance) {
                        // 滚动条位置变换
                        $track.style.top = slidingPost + 'px';
                        // 文本位置变换
                        that.$overview.style.top = -parseInt($track.style.top) * ((that.$overview.offsetHeight - that.$viewport.offsetHeight + 40) / slidingDistance) + "px";
                    }
                }
            }

            window.addEventListener("mouseup", up, false);
            $track.addEventListener("mouseup", up, false);

            function up(e) {
                that.shakeFlag = false;
                that.$body.className = "";
            }
        }

        return that;
    },
    zan: function getRating(rating) {
        var that = this;
        if (rating > 5 || rating < 0) throw new Error('数字不在范围内');
        alert('★★★★★☆☆☆☆☆'.substring(5 - rating, 10 - rating));
        return that;
    },

};

var sBar = new scrollBar();
sBar.init();
loadjscssfile('chun_scrollBar.css', 'css');
var stateString = "resolved";
if (stateString) {
    console.log("chun");
}
var div = document.createElement('div');
div.setAttribute('style', 'width: calc(100% / 3 - (15px * 2) / 3)');
console.log(div.style.width);
