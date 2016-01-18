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
	this.j = 0;
	this.count = 0;
	this.Width = 0;
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
			that.yingxiongsha();
		},2000);
		that.overOrOut();
		// that.yingxiongsha();
		return that;
	},
	yingxiongsha : function(){
		var that = this;
		var $img = new Array,
			$li = new Array;
		for(var i=0; i<that.pic_src.length; i++){
			$img[i] = document.getElementById('img_' + i);
			$li[i] = document.getElementById('li_' + i);
		};
		
		$li[0].setAttribute("style","transition-duration: 500ms;transform: translate3d(518px,0px,0px)");

		$li[1].setAttribute("style","transition-duration: 1000ms;transform: translate3d(-102px,16px,0px);");
		$img[1].setAttribute("style","transition: width 1s, height 1s; height: 150px; width: 100px");

		$li[2].setAttribute("style","transition-duration: 1000ms;transform: translate3d(-132px,12px,0px);");
		$img[2].setAttribute("style","transition: width 1s, height 1s; height: 180px; width: 130px");

		$li[3].setAttribute("style","transition-duration: 1000ms;transform: translate3d(-152px,-12px,0px);");
		$img[3].setAttribute("style","transition: width 1s, height 1s; height: 200px; width: 150px");

		$li[4].setAttribute("style","transition-duration: 1000ms;transform: translate3d(-132px,-16px,0px)");
		$img[4].setAttribute("style","transition: width 1s, height 1s; height:180px; width:130px;");

		window.setTimeout(function(){
			for(var i=0; i<that.pic_src.length; i++){
				$img[i].removeAttribute("style");
				$li[i].removeAttribute("style");
			}
			that.Huan($img,$li);
		},1000);
		return that;
	},
	Huan : function($img,$li){
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
	overOrOut : function(){
		var that = this;
		var $ul = document.getElementById("picUl");
		$ul.addEventListener('mouseover', overOn, false);
		function overOn(){
			console.log('over');
			window.clearInterval(that.time);
		};
		$ul.addEventListener('mouseout', outOn, false);
		function outOn(){
			console.log('out');
			that.time = window.setInterval(function(){
				that.yingxiongsha();
			},2000);
		};
		that.liClick($ul);
		return that;
	},
	liClick : function($ul){
		var that = this;
		var ulLi = $ul.getElementsByTagName('li');
		$ul.addEventListener('click', mouseClick, false);
		function mouseClick(e){
			
			if(e.target.tagName.toLowerCase() != 'ul' e.target.tagName.toLowerCase() != 'li'){
				console.log(e.target.tagName);
			}else{
				return false;
			}
		};





		return that;
	},
};

var pic = new yingxiongsha();
pic.init();
loadjscssfile('chun_yingxiongsha.css','css');