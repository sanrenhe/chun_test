/**
 * @fileOverview 图片轮播英雄杀效果
 * @author qinchunzhen
 * @email chunzhen@leju.com
 * @date 2016/1/15
 */
function loadjscssfile(filename, filetype){
	if(filename == '' || filetype == ''){
		console.log('引入错误！');
		return false;
	};
	if(filetype == 'js'){
		var fileScript = document.createElement('script');
		fileScript.setAttribute('type','text/javascript');
		fileScript.setAttribute('src',filename);
		document.body.appendChild(fileScript);
	}else if(filetype == 'css'){
		var fileLink = document.createElement('link');
		fileLink.setAttribute('rel','stylesheet');
		fileLink.setAttribute('type','text/css');
		fileLink.setAttribute('href',filename);
		document.head.appendChild(fileLink);
	}else{
		console.log('无效引入');
		return false;
	};
};

function yingxiongsha(){
	this.pic_src = [
					"./images/0.jpg",
					"./images/1.jpg",
					"./images/2.jpg",
					"./images/3.jpg",
					"./images/4.jpg",
					];
	this.content_title = ["0","1","2","3","4"];
	this.content_cn = ["零","一","二","三","四"];
	this.content_info = [
						"零，是自然数中的一个。在数学和科学中有多种用法。零在汉字里有多种含义，中国也有零的姓氏。",
						"一，yi，汉语汉字：1、数字单位。如“第一”或“一位”。2、表示所有、皆是之义。3、表示平等、绝对之义。4、姓氏。5、始、初。如九九归一。",
						"二(èr)，汉语汉字，基本含义有三：1. 数名：一加一(在钞票和单据上常用大写“贰”代)。2. 双，比：独一无～。3. 两样，别的：～话。不～价。",
						"三，数名，二加一（在钞票和单据上常用大写“叁”代），三维空间。三部曲。三国（中国古代一个历史时期）。",
						"四，偶数（阴数）。基本含义为数字“4”。像四分的形状。所有与四相关的字，都采用“四”作边旁。"
						];
	this.li_trans = [
					"transition-duration: 500ms;transform: translate3d(518px,0px,0px);z-index:-1;",
					"transition-duration: 1000ms;transform: translate3d(-102px,16px,0px);",
					"transition-duration: 1000ms;transform: translate3d(-132px,12px,0px);",
					"transition-duration: 1000ms;transform: translate3d(-152px,-12px,0px);",
					"transition-duration: 1000ms;transform: translate3d(-132px,-16px,0px);"
					];
	this.img_trans = [
					"",
					"transition: width 1s, height 1s; height: 150px; width: 100px;",
					"transition: width 1s, height 1s; height: 180px; width: 130px;",
					"transition: width 1s, height 1s; height: 200px; width: 150px;",
					"transition: width 1s, height 1s; height:180px; width:130px;",
					];
	this.li_trans_Ni = [
						"transition-duration: 1000ms;transform: translate3d(102px,-16px,0px);",
						"transition-duration: 1000ms;transform: translate3d(132px,-12px,0px);",
						"transition-duration: 1000ms;transform: translate3d(152px,12px,0px);",
						"transition-duration: 1000ms;transform: translate3d(132px,16px,0px);",
						"transition-duration: 500ms;transform: translate3d(-518px,0px,0px);z-index:-1",
						];
	this.img_trans_Ni = [
						"transition: width 1s, height 1s; height:180px; width:130px;",
						"transition: width 1s, height 1s; height: 200px; width: 150px;",
						"transition: width 1s, height 1s; height: 180px; width: 130px;",
						"transition: width 1s, height 1s; height: 150px; width: 100px;",
						"",
						];
	this.li_trans_R = [
						"transition-duration: 200ms;transform: translate3d(386px,-16px,0px);z-index:-1;",
						"transition-duration: 500ms;transform: translate3d(416px,16px,0px);z-index:-2;",
						"transition-duration: 500ms;transform: translate3d(-234px,28px,0px);",
						"transition-duration: 500ms;transform: translate3d(-284px,0px,0px);",
						"transition-duration: 500ms;transform: translate3d(-284px,-28px,0px);",
						];
	this.img_trans_R = [
						"transition: width 0.5s, height 0.5s; height: 180px; width: 130px;",
						"transition: width 0.25s, height 0.25s; height: 150px; width: 100px;",
						"transition: width 0.5s, height 0.5s; height: 150px; width: 100px;",
						"",
						"transition: width 0.5s, height 0.5s; height: 200px; width: 150px;",
						];
	this.li_trans_L = [
						"transition-duration: 500ms;transform: translate3d(234px,-28px,0px);",
						"transition-duration: 500ms;transform: translate3d(284px,0px,0px);",
						"transition-duration: 500ms;transform: translate3d(284px,28px,0px);",
						"transition-duration: 500ms;transform: translate3d(-386px,16px,0px);z-index: -2",
						"transition-duration: 200ms;transform: translate3d(-416px,-16px,0px);z-index: -1",
						];
	this.img_trans_L = [
						"transition: width 0.5s, height 0.5s; height:200px; width:150px;",
						"",
						"transition: width 0.5s, height 0.5s; height: 150px; width: 100px;",
						"transition: width 0.25s, height 0.25s; height: 150px; width: 100px;",
						"transition: width 0.5s, height 0.5s; height: 180px; width: 130px;",
						];
	this.time = null;
};

yingxiongsha.prototype = {
	init : function(){
		var that = this;
		that.createView(that);
		return that;
	},
	// 创建显示框架
	createView : function(){
		var that = this;
		// div
		var picViewDiv = document.createElement("div");
		picViewDiv.id = "picViewDiv";
		document.body.appendChild(picViewDiv);
		// div-ul
		var pic_Ul = document.createElement('ul');
		pic_Ul.id = 'picUl';
		picViewDiv.appendChild(pic_Ul);
		// div-ul-li-img
		// <div><h4>西施<span>西子</span></h4><p>西施，名夷光，春秋时间越国人，今浙江诸暨市城关苎萝村。同范蠡同卒于陶（定陶）。</p></div>
		for(var i=0; i<that.pic_src.length; i++){
			var pic_Li = document.createElement('li');
			pic_Li.id = 'li_' + i;
			pic_Ul.appendChild(pic_Li);
			var pic_Img = document.createElement('img');
			pic_Img.id = 'img_' + i;
			pic_Img.src = that.pic_src[i];
			pic_Li.appendChild(pic_Img);
			var infoDiv = document.createElement('div');
			infoDiv.className = 'infoDiv';
			infoDiv.id = 'infoDiv_' + [i];
			infoDiv.style.display = "none";
			pic_Li.appendChild(infoDiv);
			var infoDiv_h4 = document.createElement('h4');
			infoDiv_h4.innerHTML = that.content_title[i];
			infoDiv.appendChild(infoDiv_h4);
			var infoDiv_h4_span = document.createElement('span');
			infoDiv_h4_span.innerHTML = that.content_cn[i];
			infoDiv_h4.appendChild(infoDiv_h4_span);
			var infoDiv_p = document.createElement('p');
			infoDiv_p.innerHTML = that.content_info[i];
			infoDiv.appendChild(infoDiv_p);
		};
		// 间隔调用图片循环
		that.time = window.setInterval(function(){
			// console.log(document.getElementById("infoDiv_2").offsetHeight,document.getElementById("li_2").offsetHeight);
			that.yxs(1);
		},2000);
		// 鼠标移入移出功能
		that.overOrOut();
		return that;
	},
	// 图片循环开始
	yxs : function(circleFlag){
		var that = this;
		// li、img标签数组
		var $img = new Array,
			$li = new Array,
			$info = new Array;
		for(var i=0; i<that.pic_src.length; i++){
			$img[i] = document.getElementById('img_' + i);
			$li[i] = document.getElementById('li_' + i);
			$info[i] = document.getElementById('infoDiv_' + i);
			$info[i].style.display = "none";
		};
		// 判断传入标志值：-2：点击最左边图片；-1：点击次左边图片；1：点击次右边图片；2：点击最右边图片
		switch(circleFlag){
			case -2:
			that.Counter_clockwise_Left($li,$img,$info);
			break;
			case -1:
			that.Counter_clockwise($li,$img,$info);
			break;
			case 1:
			that.Clockwise($li,$img,$info);
			break;
			case 2:
			that.Clockwise_Right($li,$img,$info);
			break;
			default:
			break;
		}
		return that;
	},
	// 顺时针循环
	Clockwise : function($li,$img,$info){
		var that = this;
		$li[0].setAttribute("style",that.li_trans[0]);
		$img[0].setAttribute("style",that.img_trans[0]);

		$li[1].setAttribute("style",that.li_trans[1]);
		$img[1].setAttribute("style",that.img_trans[1]);

		$li[2].setAttribute("style",that.li_trans[2]);
		$img[2].setAttribute("style",that.img_trans[2]);

		$li[3].setAttribute("style",that.li_trans[3]);
		$img[3].setAttribute("style",that.img_trans[3]);

		$li[4].setAttribute("style",that.li_trans[4]);
		$img[4].setAttribute("style",that.img_trans[4]);

		// for(var i=0; i<that.pic_src.length; i++){
		// 	document.getElementById("infoDiv_" + i).style.top = ($li[i].offsetHeight - document.getElementById("infoDiv_" + i).offsetHeight) + "px";
		// 	console.log(document.getElementById("infoDiv_" + i).offsetTop);
		// }

		window.setTimeout(function(){
			for(var i=0; i<that.pic_src.length; i++){
				$img[i].removeAttribute("style");
				$li[i].removeAttribute("style");
				// document.getElementById("infoDiv_" + i).style.top = ($li[i].offsetHeight - document.getElementById("infoDiv_" + i).offsetHeight) + "px";
			}
			that.Clockwise_Huan($li,$img,$info);
		},1000);
		return that;
	},
	// 顺时针循环完成后，标签id变化
	Clockwise_Huan : function($li,$img,$info){
		var that = this;
		for(var i=0; i<that.pic_src.length; i++){
			var j = $img[i].id.split("_")[1];
			if(parseInt(j)>0){
				$img[i].id = "img_" + (parseInt(j)-1);
				$li[i].id = "li_" + (parseInt(j)-1);
				$info[i].id = "infoDiv_" + (parseInt(j)-1);
			}else{
				$img[i].id = "img_4";
				$li[i].id = "li_4";
				$info[i].id = "infoDiv_4";
			}
			if($info[i].id.split("_")[1] == 2){
				$info[i].style.display = "";
			}
			$info[i].style.top = ($img[i].offsetHeight - $info[i].offsetHeight) + "px";
			
		};
		return that;
	},
	// 顺时针循环2，即点击最右侧图片
	Clockwise_Right : function($li,$img,$info){
		var that = this;
		$li[0].setAttribute("style",that.li_trans_R[0]);
		$img[0].setAttribute("style",that.img_trans_R[0]);

		$li[1].setAttribute("style",that.li_trans_R[1]);
		$img[1].setAttribute("style",that.img_trans_R[1]);

		$li[2].setAttribute("style",that.li_trans_R[2]);
		$img[2].setAttribute("style",that.img_trans_R[2]);

		$li[3].setAttribute("style",that.li_trans_R[3]);
		$img[3].setAttribute("style",that.img_trans_R[3]);

		$li[4].setAttribute("style",that.li_trans_R[4]);
		$img[4].setAttribute("style",that.img_trans_R[4]);

		window.setTimeout(function(){
			for(var i=0; i<that.pic_src.length; i++){
				$img[i].removeAttribute("style");
				$li[i].removeAttribute("style");
			}
			that.Clockwise_Right_Huan($li,$img,$info);
		},1000);
		return that;
	},
	// 顺时针循环2完成后，标签id变换
	Clockwise_Right_Huan : function($li,$img,$info){
		var that = this;
		for(var i=0; i<that.pic_src.length; i++){
			var j = $img[i].id.split("_")[1];
			if(parseInt(j)>1){
				$img[i].id = "img_" + (parseInt(j)-2);
				$li[i].id = "li_" + (parseInt(j)-2);
				$info[i].id = "infoDiv_" + (parseInt(j)-2);
			}else{
				$img[i].id = "img_" + (parseInt(j)+3);
				$li[i].id = "li_" + (parseInt(j)+3);
				$info[i].id = "infoDiv_" + (parseInt(j)+3);
			}
			if($info[i].id.split("_")[1] == 2){
				$info[i].style.display = "";
			}
			$info[i].style.top = ($img[i].offsetHeight - $info[i].offsetHeight) + "px";
			
		};
		return that;
	},
	// 逆时针循环，即点击次左边图片
	Counter_clockwise : function($li,$img,$info){
		var that = this;
		$li[4].setAttribute("style",that.li_trans_Ni[4]);
		$img[4].setAttribute("style",that.img_trans_Ni[4]);

		$li[3].setAttribute("style",that.li_trans_Ni[3]);
		$img[3].setAttribute("style",that.img_trans_Ni[3]);

		$li[2].setAttribute("style",that.li_trans_Ni[2]);
		$img[2].setAttribute("style",that.img_trans_Ni[2]);

		$li[1].setAttribute("style",that.li_trans_Ni[1]);
		$img[1].setAttribute("style",that.img_trans_Ni[1]);

		$li[0].setAttribute("style",that.li_trans_Ni[0]);
		$img[0].setAttribute("style",that.img_trans_Ni[0]);

		window.setTimeout(function(){
			for(var i=0; i<that.pic_src.length; i++){
				$img[i].removeAttribute("style");
				$li[i].removeAttribute("style");
			}
			that.Counter_Huan($li,$img,$info);
		},1000);

		return that;
	},
	// 逆时针循环完成后，标签id变换
	Counter_Huan : function($li,$img,$info){
		var that = this;
		for(var i=that.pic_src.length-1; i>=0; i--){
			var j = $img[i].id.split("_")[1];
			if(parseInt(j)<4){
				$img[i].id = "img_" + (parseInt(j)+1);
				$li[i].id = "li_" + (parseInt(j)+1);
				$info[i].id = "infoDiv_" + (parseInt(j)+1);
			}else{
				$img[i].id = "img_0";
				$li[i].id = "li_0";
				$info[i].id = "infoDiv_0";
			}
			if($info[i].id.split("_")[1] == 2){
				$info[i].style.display = "";
			}
			$info[i].style.top = ($img[i].offsetHeight - $info[i].offsetHeight) + "px";
			
		};
		return that;
	},
	// 逆时针循环2，即点击最左侧图片
	Counter_clockwise_Left : function($li,$img,$info){
		var that = this;
		$li[4].setAttribute("style",that.li_trans_L[4]);
		$img[4].setAttribute("style",that.img_trans_L[4]);

		$li[3].setAttribute("style",that.li_trans_L[3]);
		$img[3].setAttribute("style",that.img_trans_L[3]);

		$li[2].setAttribute("style",that.li_trans_L[2]);
		$img[2].setAttribute("style",that.img_trans_L[2]);

		$li[1].setAttribute("style",that.li_trans_L[1]);
		$img[1].setAttribute("style",that.img_trans_L[1]);

		$li[0].setAttribute("style",that.li_trans_L[0]);
		$img[0].setAttribute("style",that.img_trans_L[0]);

		window.setTimeout(function(){
			for(var i=0; i<that.pic_src.length; i++){
				$img[i].removeAttribute("style");
				$li[i].removeAttribute("style");
			}
			that.Counter_Left_Huan($li,$img,$info);
		},1000);
		return that;
	},
	// 逆时针循环2完成后,标签id变换
	Counter_Left_Huan : function($li,$img,$info){
		var that = this;
		for(var i=0; i<that.pic_src.length; i++){
			var j = $img[i].id.split("_")[1];
			if(parseInt(j)<3){
				$img[i].id = "img_" + (parseInt(j)+2);
				$li[i].id = "li_" + (parseInt(j)+2);
				$info[i].id = "infoDiv_" + (parseInt(j)+2);
			}else{
				$img[i].id = "img_" + (parseInt(j)-3);
				$li[i].id = "li_" + (parseInt(j)-3);
				$info[i].id = "infoDiv_" + (parseInt(j)-3);
			}
			if($info[i].id.split("_")[1] == 2){
				$info[i].style.display = "";
			}
			$info[i].style.top = ($img[i].offsetHeight - $info[i].offsetHeight) + "px";
			
		};
		return that;
	},
	// 鼠标移入移除效果
	overOrOut : function(){
		var that = this;
		var $ul = document.getElementById("picUl");
		// 鼠标移入，图片停止轮播
		$ul.addEventListener('mouseover', overOn, false);
		function overOn(){
			window.clearInterval(that.time);
		};
		// 鼠标移出，图片轮播
		$ul.addEventListener('mouseout', outOn, false);
		function outOn(){
			that.time = window.setInterval(function(){
				that.yxs(1);
			},2000);
		};
		// 鼠标点击
		that.liClick($ul);
		return that;
	},
	// 鼠标点击
	liClick : function($ul,$li,$img){
		var that = this;
		var ulLi = $ul.getElementsByTagName('li');
		$ul.addEventListener('click', mouseClick, false);
		function mouseClick(e){
			if(e.target.tagName.toLowerCase() != 'ul' && e.target.tagName.toLowerCase() != 'li'){
				that.imgClick(e.target);
			}else{
				return false;
			}
		};
		return that;
	},
	// 点击图片
	imgClick : function(clickimg){
		var that = this;
		var idNum = clickimg.id.split("_")[1];
		var dis = idNum - 2;
		// -2：点击最左侧；-1：点击次左侧；0：点击中间；1：点击次右侧；2：点击最右侧；
		switch(dis){
			case 1:
			that.click_Right();
			break;
			case 2:
			that.clcik_Right_R();
			break;
			case 0:
			break;
			case -1:
			that.click_Left();
			break;
			case -2:
			that.click_Left_L();
			break;
			default:
			break;
		}
		return that;
	},
	// 点击次右侧
	click_Right : function(){
		this.yxs(1);
	},
	// 点击最右侧
	clcik_Right_R : function(){
		this.yxs(2);
	},
	// 点击次左侧
	click_Left : function(){
		this.yxs(-1);
	},
	// 点击最左侧
	click_Left_L : function(){
		this.yxs(-2);
	},
};

var pic = new yingxiongsha();
pic.init();
loadjscssfile('chun_yingxiongsha.css','css');