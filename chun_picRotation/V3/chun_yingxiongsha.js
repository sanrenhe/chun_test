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
	createView : function(){
		var that = this;
		var picViewDiv = document.createElement("div");
		picViewDiv.id = "picViewDiv";
		document.body.appendChild(picViewDiv);

		var pic_Ul = document.createElement('ul');
		pic_Ul.id = 'picUl';
		picViewDiv.appendChild(pic_Ul);

		for(var i=0; i<that.pic_src.length; i++){
			var pic_Li = document.createElement('li');
			pic_Li.id = 'li_' + i;
			pic_Ul.appendChild(pic_Li);
			var pic_Img = document.createElement('img');
			pic_Img.id = 'img_' + i;
			pic_Img.src = that.pic_src[i];
			pic_Li.appendChild(pic_Img);
		};

		that.time = window.setInterval(function(){
			that.yxs(1);
			console.log("start");
		},2000);
		that.overOrOut();
		return that;
	},
	yxs : function(circleFlag){
		var that = this;
		var $img = new Array,
			$li = new Array;
		for(var i=0; i<that.pic_src.length; i++){
			$img[i] = document.getElementById('img_' + i);
			$li[i] = document.getElementById('li_' + i);
		};
		switch(circleFlag){
			case -2:
			that.Counter_clockwise_Left($li,$img)
			break;
			case -1:
			that.Counter_clockwise($li,$img);
			break;
			case 1:
			that.Clockwise($li,$img);
			break;
			case 2:
			that.Clockwise_Right($li,$img);
			break;
			default:
			break;
		}
		return that;
	},
	Clockwise : function($li,$img){
		var that = this;
		$li[0].setAttribute("style",that.li_trans[0]);

		$li[1].setAttribute("style",that.li_trans[1]);
		$img[1].setAttribute("style",that.img_trans[1]);

		$li[2].setAttribute("style",that.li_trans[2]);
		$img[2].setAttribute("style",that.img_trans[2]);

		$li[3].setAttribute("style",that.li_trans[3]);
		$img[3].setAttribute("style",that.img_trans[3]);

		$li[4].setAttribute("style",that.li_trans[4]);
		$img[4].setAttribute("style",that.img_trans[4]);

		window.setTimeout(function(){
			for(var i=0; i<that.pic_src.length; i++){
				$img[i].removeAttribute("style");
				$li[i].removeAttribute("style");
			}
			// debugger;
			that.Clockwise_Huan($li,$img);
		},1000);
		return that;
	},
	Clockwise_Huan : function($li,$img){
		var that = this;
		for(var i=0; i<that.pic_src.length; i++){
			var j = $img[i].id.split("_")[1];
			if(parseInt(j)>0){
				$img[i].id = "img_" + (parseInt(j)-1);
				$li[i].id = "li_" + (parseInt(j)-1);
			}else{
				$img[i].id = "img_4";
				$li[i].id = "li_4";
			}
		};
		return that;
	},
	Clockwise_Right : function($li,$img){
		var that = this;
		$li[0].setAttribute("style",that.li_trans_R[0]);
		$img[0].setAttribute("style",that.img_trans_R[0]);
		// debugger;
		$li[1].setAttribute("style",that.li_trans_R[1]);
		$img[1].setAttribute("style",that.img_trans_R[1]);
		// debugger;
		$li[2].setAttribute("style",that.li_trans_R[2]);
		$img[2].setAttribute("style",that.img_trans_R[2]);
		// debugger;
		$li[3].setAttribute("style",that.li_trans_R[3]);
		$img[3].setAttribute("style",that.img_trans_R[3]);
		// debugger;
		$li[4].setAttribute("style",that.li_trans_R[4]);
		$img[4].setAttribute("style",that.img_trans_R[4]);
		// debugger;
		window.setTimeout(function(){
			for(var i=0; i<that.pic_src.length; i++){
				$img[i].removeAttribute("style");
				$li[i].removeAttribute("style");
			}
			// debugger;
			that.Clockwise_Right_Huan($li,$img);
		},1000);
		return that;
	},
	Clockwise_Right_Huan : function($li,$img){
		var that = this;
		for(var i=0; i<that.pic_src.length; i++){
			var j = $img[i].id.split("_")[1];
			if(parseInt(j)>1){
				$img[i].id = "img_" + (parseInt(j)-2);
				$li[i].id = "li_" + (parseInt(j)-2);
			}else{
				$img[i].id = "img_" + (parseInt(j)+3);
				$li[i].id = "li_" + (parseInt(j)+3);
			}
		};
		return that;
	},
	Counter_clockwise : function($li,$img){
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
			// debugger;
			that.Counter_Huan($li,$img);
		},1000);

		return that;
	},
	Counter_Huan : function($li,$img){
		var that = this;
		for(var i=that.pic_src.length-1; i>=0; i--){
			var j = $img[i].id.split("_")[1];
			if(parseInt(j)<4){
				$img[i].id = "img_" + (parseInt(j)+1);
				$li[i].id = "li_" + (parseInt(j)+1);
			}else{
				$img[i].id = "img_0";
				$li[i].id = "li_0";
			}
		};
		return that;
	},
	Counter_clockwise_Left : function($li,$img){
		var that = this;
		$li[4].setAttribute("style",that.li_trans_L[4]);
		$img[4].setAttribute("style",that.img_trans_L[4]);
		// debugger;
		$li[3].setAttribute("style",that.li_trans_L[3]);
		$img[3].setAttribute("style",that.img_trans_L[3]);
		// debugger;
		$li[2].setAttribute("style",that.li_trans_L[2]);
		$img[2].setAttribute("style",that.img_trans_L[2]);
		// debugger;
		$li[1].setAttribute("style",that.li_trans_L[1]);
		$img[1].setAttribute("style",that.img_trans_L[1]);
		// debugger;
		$li[0].setAttribute("style",that.li_trans_L[0]);
		$img[0].setAttribute("style",that.img_trans_L[0]);
		// debugger;
		window.setTimeout(function(){
			for(var i=0; i<that.pic_src.length; i++){
				$img[i].removeAttribute("style");
				$li[i].removeAttribute("style");
			}
			// debugger;
			that.Counter_Left_Huan($li,$img);
		},1000);
		return that;
	},
	Counter_Left_Huan : function($li,$img){
		var that = this;
		for(var i=0; i<that.pic_src.length; i++){
			var j = $img[i].id.split("_")[1];
			if(parseInt(j)<3){
				$img[i].id = "img_" + (parseInt(j)+2);
				$li[i].id = "li_" + (parseInt(j)+2);
			}else{
				$img[i].id = "img_" + (parseInt(j)-3);
				$li[i].id = "li_" + (parseInt(j)-3);
			}
		};
		return that;
	},
	overOrOut : function(){
		var that = this;
		var $ul = document.getElementById("picUl");
		$ul.addEventListener('mouseover', overOn, false);
		function overOn(){
			// console.log('over');
			window.clearInterval(that.time);
		};
		$ul.addEventListener('mouseout', outOn, false);
		function outOn(){
			// console.log('out');
			that.time = window.setInterval(function(){
				that.yxs(1);
				console.log("mouseout");
				// debugger;
			},2000);
		};
		that.liClick($ul);
		return that;
	},
	liClick : function($ul,$li,$img){
		var that = this;
		var ulLi = $ul.getElementsByTagName('li');
		$ul.addEventListener('click', mouseClick, false);
		function mouseClick(e){
			if(e.target.tagName.toLowerCase() != 'ul' && e.target.tagName.toLowerCase() != 'li'){
				console.log(e.target.tagName);
				that.imgClick(e.target);
			}else{
				return false;
			}
		};
		return that;
	},
	imgClick : function(clickimg){
		var that = this;
		var idNum = clickimg.id.split("_")[1];
		var dis = idNum - 2;
		console.log(dis);
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
	click_Right : function(){
		this.yxs(1);
	},
	clcik_Right_R : function(){
		this.yxs(2);
	},
	click_Left : function(){
		this.yxs(-1);
	},
	click_Left_L : function(){
		this.yxs(-2);
	},
};

var pic = new yingxiongsha();
pic.init();
loadjscssfile('chun_yingxiongsha.css','css');