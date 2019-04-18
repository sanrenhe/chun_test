    function clock() {
        var now = new Date();
        var ctx = document.getElementById('myCanvas').getContext('2d');
        ctx.save();
        ctx.clearRect(0, 0, 150, 150);
        ctx.translate(75, 75);
        ctx.scale(0.4, 0.4);
        ctx.rotate(-Math.PI / 2);
        ctx.strokeStyle = "black";
        ctx.font = '50px serif';
        ctx.fillStyle = "white";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";

        // Hour marks
        ctx.save();
        for (var i = 0; i < 12; i++) {
            ctx.beginPath();
            ctx.rotate(Math.PI / 6);
            ctx.fillText(i, 5, 5);
            ctx.moveTo(100, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
        }
        ctx.restore();

        // Minute marks
        ctx.save();
        ctx.lineWidth = 5;
        for (i = 0; i < 60; i++) {
            if (i % 5 != 0) {
                ctx.beginPath();
                ctx.moveTo(117, 0);
                ctx.lineTo(120, 0);
                ctx.stroke();
            }
            ctx.rotate(Math.PI / 30);
        }
        ctx.restore();

        var sec = now.getSeconds();
        var min = now.getMinutes();
        var hr = now.getHours();
        hr = hr >= 12 ? hr - 12 : hr;

        ctx.fillStyle = "black";

        // write Hours Point
        ctx.save();
        ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(80, 0);
        ctx.stroke();
        ctx.restore();

        // write Minutes Point
        ctx.save();
        ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(-28, 0);
        ctx.lineTo(112, 0);
        ctx.stroke();
        ctx.restore();

        // Write seconds Point
        ctx.save();
        ctx.rotate(sec * Math.PI / 30);
        ctx.strokeStyle = "#D40000";
        ctx.fillStyle = "#D40000";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.lineTo(83, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#325FA2';
        ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
        ctx.stroke();

        ctx.restore();

        window.requestAnimationFrame(clock);
    }

    window.requestAnimationFrame(clock);

    var yingyangArrONE = ['000000', '000001', '000010', '000011', '000100', '000101', '000110', '000111', '001000', '001001', '001010', '001011', '001100', '001101', '001110', '001111', '010000', '010001', '010010', '010011', '010100', '010101', '010110', '010111', '011000', '011001', '011010', '011011', '011100', '011101', '011110', '011111'];
    var yingyangArrTWO = ['100000', '100001', '100010', '100011', '100100', '100101', '100110', '100111', '101000', '101001', '101010', '101011', '101100', '101101', '101110', '101111', '110000', '110001', '110010', '110011', '110100', '110101', '110110', '110111', '111000', '111001', '111010', '111011', '111100', '111101', '111110', '111111'];
    var yingyangArr = ['000000', '000001', '000010', '000011', '000100', '000101', '000110', '000111', '001000', '001001', '001010', '001011', '001100', '001101', '001110', '001111', '010000', '010001', '010010', '010011', '010100', '010101', '010110', '010111', '011000', '011001', '011010', '011011', '011100', '011101', '011110', '011111', '100000', '100001', '100010', '100011', '100100', '100101', '100110', '100111', '101000', '101001', '101010', '101011', '101100', '101101', '101110', '101111', '110000', '110001', '110010', '110011', '110100', '110101', '110110', '110111', '111000', '111001', '111010', '111011', '111100', '111101', '111110', '111111'];
    var yingyangArrText = ['坤', '剝', '比', '觀', '豫', '晉', '萃', '否', '謙', '艮', '蹇', '漸', '小過', '旅', '咸', '遜', '師', '蒙', '坎', '渙', '解', '未濟', '困', '訟', '升', '蠱', '井', '巽', '恆', '鼎', '大過', '姤', '復', '頤', '屯', '益', '震', '噬嗑', '隨', '無妄', '明夷', '賁', '既濟', '家人', '豐', '離', '革', '同人', '臨', '損', '節', '中孚', '歸妹', '睽', '兑', '履', '泰', '大畜', '需', '小畜', '大狀', '大有', '夬', '乾'];

    function yingyang() {
        var CANVAS_WIDTH = 800;
        var CANVAS_HEIGHT = 800;

        var myCanvas2 = document.getElementById('myCanvas2');
        myCanvas2.width = CANVAS_WIDTH;
        myCanvas2.height = CANVAS_HEIGHT;
        var ctx2 = myCanvas2.getContext('2d');
        ctx2.save();
        ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx2.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        // ctx2.scale(0.4, 0.4);
        ctx2.rotate(-Math.PI / 200);
        ctx2.strokeStyle = 'black';
        ctx2.font = '15px serif';
        ctx2.lineWidth = 4;
        ctx2.lineCap = 'round';

        ctx2.save();
        for (var n = 6; n > 0; n--) {
            for (var i = 63; i >= 0; i--) {
                var flag = yingyangArr[i].substr(6 - n, 1);
                ctx2.beginPath();
                ctx2.rotate(Math.PI / 32);
                if (flag == 0) {
                    for (var j = -15; j < -5; j++) {
                        ctx2.moveTo(j, 350 - n * 7);
                        ctx2.lineTo(j, 350 - n * 7);
                    }
                    for (var k = 0; k < 10; k++) {
                        ctx2.moveTo(k, 350 - n * 7);
                        ctx2.lineTo(k, 350 - n * 7);
                    }
                } else {
                    for (var o = -15; o < 10; o++) {
                        ctx2.moveTo(o, 350 - n * 7);
                        ctx2.lineTo(o, 350 - n * 7);
                    }
                }
                if (yingyangArrText[i].length == 1) {
                    ctx2.fillText(yingyangArrText[i], 25, 360);
                } else {
                    ctx2.fillText(yingyangArrText[i], 18, 360);
                }
                ctx2.stroke();
            }
        }
        ctx2.restore();
    }

    yingyang();

    //     var CANVAS_WIDTH = 400;
    //     var CANVAS_HEIGHT = 400;  

    //     var myCanvas = document.getElementById('myCanvas');
    //     myCanvas.width = CANVAS_WIDTH;
    //     myCanvas.height = CANVAS_HEIGHT;

    //     var ctx = myCanvas.getContext('2d');

    //     ctx.font = '25px serif';
    // // 时钟
    //     var radius = CANVAS_WIDTH/2;
    //     var YTEMP = 20;
    //     var XTEMP = 5;
    //     var angle = 2 * Math.PI/360;
    //     var ax = 0;
    //     var by = 0;
    //     var r = radius - 10;
    //     // 表盘
    //     function drawCircle () {
    //         ctx.beginPath();
    //         // ctx.arc(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, radius, 0, Math.PI*2);
    //         ctx.arc(0, 0, radius, 0, Math.PI*2);

    //         ctx.stroke();
    //         ctx.closePath();
    //     }


    //     // 数字
    //     function drawNumber () {
    //         ctx.save();
    //         var angleNum = angle * 360/12;
    //         ctx.translate(CANVAS_WIDTH/2, -CANVAS_HEIGHT/2);
    //         ctx.rotate(Math.PI/2);
    //         for(var i=0; i<12; i++) {
    //             ax = r * Math.sin(angleNum*i) + radius - XTEMP;
    //             by = r - r * Math.cos(angleNum*i) + YTEMP;
    //             ctx.fillText(i, ax, by);
    //         }
    //         ctx.restore();
    //     }


    //     // 中心点
    //     function drawCenterPoint () {
    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.strokeStyle = 'red';
    //         ctx.arc(0, 0, 5, 0, Math.PI*2);
    //         ctx.stroke();
    //         ctx.closePath();
    //     }


    //     // 时针
    //     function drawHourLine () {
    //         ctx.beginPath();
    //         ctx.strokeStyle = 'red';
    //         ctx.moveTo(0, 0);
    //         ctx.lineTo(CANVAS_WIDTH/2, 0);
    //         ctx.stroke();
    //         ctx.restore();
    //     }

    //     // 分针
    //     function drawMinuteLine () {
    //         ctx.beginPath();
    //         ctx.strokeStyle = 'yellow';
    //         ctx.moveTo(0, 0);
    //         ctx.lineTo(CANVAS_WIDTH/2, 0);
    //         ctx.stroke();
    //         ctx.restore();
    //     }

    //     // 秒针
    //     function drawSecondeLine () {
    //         ctx.beginPath();
    //         ctx.strokeStyle = 'green';
    //         ctx.moveTo(0, 0);
    //         ctx.lineTo(CANVAS_WIDTH/2, 0);
    //         ctx.stroke();
    //         ctx.restore();
    //     }

    //     drawCircle();
    //     drawNumber();
    //     drawCenterPoint();

    //     // 实时
    //     function showTime () {
    //         ctx.clearRect(0, 0, 400, 400);

    //         ctx.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    //         ctx.rotate(-Math.PI/2);

    //         var now = new Date();
    //         var hr = now.getHours();
    //         var min = now.getMinutes();
    //         var sec = now.getSeconds();
    //         hr = hr >= 12 ? hr-12 : hr;
    //         ctx.save();
    //         ctx.rotate((2 * Math.PI/12) * hr + (2 * Math.PI/720)*min + (2 * Math.PI/43200)*sec);
    //         drawHourLine();

    //         ctx.save();
    //         ctx.rotate( (2 * Math.PI/60)*min + (2 * Math.PI/3600)*sec );
    //         drawMinuteLine();

    //         ctx.save();
    //         ctx.rotate(sec * 2 * Math.PI/60);
    //         drawSecondeLine();
    //     }

    //     showTime();
    //     window.setInterval(function () {
    //         showTime();
    //     }, 1000);

    // 事件操作
    // ctx.fillRect(10, 10, 100, 100);
    // ctx.strokeStyle = 'red';
    // ctx.strokeRect(110, 110, 100, 100);

    // function drawCircle() {
    //     ctx.beginPath();
    //     ctx.arc(160, 60, 50, 0, Math.PI*2);
    //     ctx.stroke();
    //     ctx.closePath();
    // }

    // drawCircle();

    // function drawSanjiao() {
    //     ctx.beginPath();
    //     ctx.moveTo(60, 110);
    //     ctx.lineTo(110, 210);
    //     ctx.lineTo(10, 210);
    //     ctx.lineTo(60, 110);
    //     ctx.stroke();
    //     ctx.closePath()
    // }
    // drawSanjiao();

    // myCanvas.onclick = function (e) {
    //     var x = e.clientX - myCanvas.offsetLeft;
    //     var y = e.clientY - myCanvas.offsetTop;

    //     if(x>=10&&x<=110&&y>=10&&y<=110){
    //         alert("你点中了黑色矩形");
    //     }else if(x>=110&&x<=210&&y>=110&&y<=210){
    //         alert("你点中了红色矩形");
    //     }else{
    //         drawCircle();
    //         if(ctx.isPointInPath(x,y)){
    //             alert("你点击了圆圈");
    //         }
    //         drawSanjiao();
    //         if(ctx.isPointInPath(x,y)){
    //             alert("你点击了三角");
    //         }

    //     }
    // }

    // 图形组合
    // var CANVAS_WIDTH = 300;
    // var CANVAS_HEIGHT = 300;

    // myCanvas.width = CANVAS_WIDTH;
    // myCanvas.height = CANVAS_HEIGHT;

    // var compositeArr = [
    //     'source-over', 'destination-over',
    //     'source-atop', 'destination-atop',
    //     'destination-in', 'source-in',
    //     'source-our', 'destination-out',
    //     'lighter', 'copy', 'xor'
    // ];

    // var i = 0, l = compositeArr.length;
    // draw(compositeArr[i]);

    // setInterval(function () {
    //     i++;
    //     if (i == l) {
    //         i = 0;
    //     }
    //     draw(compositeArr[i]);
    // }, 1000);

    // function draw(type) {
    //     ctx.clearRect(0, 0, 300, 300);

    //     ctx.fillStyle = 'blue';
    //     ctx.fillRect(0, 0, 100, 100);

    //     ctx.globalCompositeOperation = type;

    //     ctx.beginPath();
    //     ctx.arc(100, 100, 100, 0, Math.PI*2);
    //     ctx.fillStyle = 'red';
    //     ctx.fill();
    //     ctx.closePath();

    //     ctx.globalCompositeOperation = 'source-over';

    //     ctx.font = '30px Arial';
    //     ctx.strokeText(compositeArr[i], 0, 250);
    // }

    // 裁剪
    // ctx.beginPath();
    // ctx.arc(150, 100, 80, 0, 2*Math.PI);
    // ctx.closePath();

    // var img = new Image();
    // img.src = './yinyang.jpeg';
    // img.onload = function () {
    //     ctx.save();
    //     ctx.clip();
    //     ctx.drawImage(img, 50, 0, 200, 200);
    //     ctx.restore()
    // }

    // ctx.fillText('阴阳', 250, 150, 50, 50);

    // 阴影
    // var CANVAS_WIDTH = 300;
    // var CANVAS_HEIGHT = 200;

    // myCanvas.width = CANVAS_WIDTH;
    // myCanvas.height = CANVAS_HEIGHT;

    // var img = new Image();
    // img.src = './yinyang.jpeg';
    // img.onload = function () {
    //     ctx.shadowColor = '#222';
    //     ctx.shadowBlur = '10';
    //     ctx.shadowOffsetX = '5';
    //     ctx.shadowOffsetY = '5';

    //     ctx.drawImage(img, (CANVAS_WIDTH-200)/2, (CANVAS_HEIGHT-100)/2, 200, 100);
    // }

    // 像素操作
    // var myCanvas2 = document.getElementById('myCanvas2');

    // myCanvas2.width = '500';
    // myCanvas2.height = '300';
    // var ctx2 = myCanvas2.getContext('2d');

    // ctx.fillRect(10, 10, 200, 100);
    // ctx.beginPath();
    // ctx.arc(200, 100, 50, 0, Math.PI*2);
    // ctx.closePath();
    // ctx.fillStyle = 'red';
    // ctx.fill();

    // var imgData = ctx.getImageData(0, 0, 500, 300);
    // ctx2.putImageData(imgData, 0, 0);

    // 坐标操作 移动(translate) 旋转(rotate) 缩放(scale)
    // 绘制球
    // var x = 0, y = 0;
    // setInterval(function () {
    //     ctx.save();

    //     ctx.clearRect(x-11, y-11, 22, 22);

    //     x += 5;
    //     y += 5;
    //     ctx.translate(x, y);

    //     ctx.beginPath();
    //     ctx.arc(0, 0, 10, 0, 2*Math.PI, false);
    //     ctx.stroke();
    //     ctx.closePath();

    //     ctx.restore();
    // }, 100);

    // save && restore
    // var lg = ctx.createLinearGradient(200, 100, 250, 200);
    // lg.addColorStop(0, 'red');
    // lg.addColorStop(1, 'blue');

    // ctx.strokeStyle = 'red';
    // ctx.strokeRect(0, 0, 50, 100);
    // ctx.save();

    // ctx.fillStyle = lg;
    // ctx.strokeStyle = 'blue';
    // ctx.strokeRect(100, 10, 50, 100);
    // ctx.save();

    // ctx.restore();
    // ctx.restore();
    // ctx.restore();
    // ctx.strokeRect(200, 10, 50, 100);
    // ctx.fillRect(200, 100, 50, 100);

    // 图片
    // var img0 = new Image();
    // img0.src = './yinyang.jpeg';
    // img0.onload = function () {
    //     ctx.drawImage(img0, 225, 125, 50, 50);
    // }

    // var img1 = new Image();
    // img1.src = './yinyang.jpeg';
    // var nv2 = {
    //     x: 82,
    //     y: 0,
    //     w: 84,
    //     h: 110
    // };
    // img1.onload = function () {
    //     ctx.drawImage(img1, nv2.x, nv2.y, nv2.w, nv2.h, 0, 0, nv2.w/2, nv2.h/2);
    // }

    // var shengdanP = [
    //     {
    //         x: 0,
    //         y: 0,
    //         w: 220,
    //         h: 80
    //     },
    //     {
    //         x: 220,
    //         y: 0,
    //         w: 220,
    //         h: 80
    //     },
    //     {
    //         x: 440,
    //         y: 0,
    //         w: 220,
    //         h: 80
    //     },
    //     {
    //         x: 660,
    //         y: 0,
    //         w: 220,
    //         h: 80
    //     }
    // ];
    // var img2 = new Image();
    // img2.src = './yinyang.jpeg';
    // img2.onload = function () {
    //     setInterval(run, 100);
    // }

    // var index = 0;
    // function run () {
    //     if (index == shengdanP.length) {
    //         index = 0;
    //     }
    //     var sx = shengdanP[index].x;
    //     var sy = shengdanP[index].y;
    //     var sw = shengdanP[index].w;
    //     var sh = shengdanP[index].h;

    //     ctx.drawImage(img2, sx, sy, sw, sh, 10, 125, sw*2/3, sh*2/3);
    //     index++;
    // }

    // 填充-图案
    // var img = new Image();
    // img.src = './yinyang.jpeg';

    // img.onload = function () {
    //     var tuan = ctx.createPattern(img, 'repeat');

    //     ctx.fillStyle = tuan;
    //     ctx.fillRect(0, 0, 200, 200);
    // }

    // 线性渐变
    // 创建线性渐变对象
    // var lg = ctx.createLinearGradient(10, 10, 210, 110);
    // lg.addColorStop(0, 'red');
    // lg.addColorStop(1, 'blue');

    // // 带线性渐变矩形
    // ctx.fillStyle = lg;
    // ctx.fillRect(10, 10, 200, 100);

    // // 带线性渐变圆
    // var lg1 = ctx.createLinearGradient(80, 130, 140, 200);
    // lg1.addColorStop(0, 'green');
    // lg1.addColorStop(1, 'yellow');

    // ctx.beginPath();
    // ctx.arc(105, 160, 50, 0, Math.PI*2);
    // ctx.fillStyle = lg1;
    // ctx.fill();
    // ctx.closePath();

    // 鼠标画笔
    // var canvasL = myCanvas.offsetLeft;
    // var canvasT = myCanvas.offsetTop;

    // myCanvas.onmousedown = function (e) {
    //     var ev = e || window.event;
    //     var left = ev.clientX;
    //     var top = ev.clientY;
    //     var x = left - canvasL;
    //     var y = top - canvasT;

    //     ctx.moveTo(x, y);
    //     myCanvas.onmousemove = function (e) {
    //         var ev = e || window.event;
    //         var left = ev.clientX;
    //         var top = ev.clientY;
    //         var x = left - canvasL;
    //         var y = top - canvasT;
    //         ctx.lineTo(x, y);

    //         ctx.stroke();
    //     }

    //     myCanvas.onmouseup = function () {
    //         myCanvas.onmouseup = null;
    //         myCanvas.onmousemove = null;
    //     }

    //     myCanvas.onmouseout = function () {
    //         myCanvas.onmouseup = null;
    //         myCanvas.onmousemove = null;
    //         myCanvas.onmouseout = null;
    //     }
    // }

    // 橡皮擦 物体运动（本质是图形不断的擦除和绘制）

    // 圆
    // var x = 10, y = 10;
    // var a = 490, b = 290;
    // var duration = 2000;
    // var cishu = 2000/30;
    // var xstep = (a-x)/cishu;
    // var ystep = (b-y)/cishu;

    // function huayuan (x, y) {
    //     ctx.beginPath();
    //     ctx.arc(x, y, 10, 0, Math.PI*2);
    //     ctx.fillStyle = 'red';
    //     ctx.fill();
    // }

    // huayuan();

    // var timer = window.setInterval(function () {
    //     // 橡皮擦
    //     ctx.clearRect(x-11, y-11, 22, 22);

    //     x += xstep;
    //     y += ystep;

    //     if (x >= a) {
    //         x = a;
    //         y = b;
    //     }
    //     huayuan(x,y);
    // }, 100);

    // 图片 文字
    // 图片
    // var img = new Image();
    // img.src = './yinyang.jpeg';
    // img.onload = function () {
    //     ctx.drawImage(img, 0, 0, 300, 300);
    // }
    // // 文字
    // ctx.font = '30px Arial';

    // ctx.fillStyle = 'red';
    // ctx.fillText('阴阳', 300, 290);

    // ctx.strokeStyle = 'red';
    // ctx.strokeText('阴阳', 380, 290);

    // 圆 圆弧
    // 空心圆
    // ctx.beginPath();
    // ctx.arc(250, 150, 100, 0, Math.PI*2);
    // ctx.closePath();
    // ctx.stroke();
    // // 实心圆
    // ctx.beginPath();
    // ctx.arc(250, 150, 50, 0, Math.PI*2);
    // ctx.closePath();
    // ctx.fill();
    // // 弧度
    // ctx.beginPath();
    // ctx.arc(250, 150, 130, Math.PI*3/2, Math.PI, true);
    // ctx.stroke();
    // ctx.closePath();

    // 线
    // 三角形
    // ctx.moveTo(50, 50);
    // ctx.lineTo(250,100);
    // ctx.lineTo(50, 200);
    // ctx.lineTo(50, 50);
    // // 画直线
    // ctx.moveTo(350, 50);
    // ctx.lineTo(350, 200);

    // // 定义画线样式
    // ctx.strokeStyle = 'red';
    // ctx.lineWidth = '5';

    // ctx.lineCap = 'round';

    // ctx.stroke();

    // 矩形
    // ctx.fillStyle = '#f0f';
    // ctx.fillRect(50,50,200,100);