/**
 * @fileOverview 图片轮播Xuan
 * @author qinchunzhen
 * @email chunzhen@leju.com
 * @date 2016/1/13
 */
window.onload = function(){
	var pic = new picXuan();
	pic.init();
};

function picXuan(){
	this.pic_src = [
					"http://i.mmcdn.cn/simba/img/T117eTXmXqXXXXXXXX.jpg",
					"http://img03.taobaocdn.com/tps/i3/T1t8eTXbBtXXXXXXXX-490-170.png",
					"http://i.mmcdn.cn/simba/img/T1OVOUXeNjXXXXXXXX.jpg",
					"http://i.mmcdn.cn/simba/img/T1J.9TXc8lXXXXXXXX.jpg",
					];
	this.j = 0;
	this.count = 0;
	this.Width = 0;
};

picXuan.prototype = {
	init : function(){
		var that = this;
		that.createXuan(that);
		return that;
	},
	// 创建图片显示区域
	createXuan : function(){
		var that = this;
		// div
		var xuan_div = document.createElement("div");
		xuan_div.id = "xuanDiv";
		document.body.appendChild(xuan_div);
		// div-ul
		var xuan_div_ul = document.createElement("ul");
		xuan_div_ul.id = "xuanDivUl";
		xuan_div.appendChild(xuan_div_ul);
		// div-ul-li
		for(var i=0; i<that.pic_src.length; i++){
			var xuan_div_ul_li = document.createElement("li");
			xuan_div_ul_li.className = "xuanLi";
			xuan_div_ul_li.id = "xuanLi" + i;
			xuan_div_ul.appendChild(xuan_div_ul_li);
			// div-ul-li-img
			var xuan_div_ul_li_img = document.createElement("img");
			xuan_div_ul_li_img.id = "img" + i;
			xuan_div_ul_li_img.setAttribute("src", that.pic_src[i]);
			xuan_div_ul_li.appendChild(xuan_div_ul_li_img);
		};
		that.time = window.setInterval(function(){
			that.Xuan();
		},4000);
		
		return that;
	},
	Xuan : function(){
		var that = this;
		// window.clearTimeout(that.time);
		var $img = new Array,
			$xuanLi = new Array;
		for(var i=0; i<that.pic_src.length; i++){
			$img[i] = document.getElementById("img" + i);
			$xuanLi[i] = document.getElementById("xuanLi" + i);
		};
		$xuanLi[0].setAttribute("style", "transition-duration: 2000ms;transform: translate3d(-210px,-120px,0px);");
		$img[0].setAttribute("style", "transition: width 2s, height 2s; height: 160px; width: 120px");
		$xuanLi[1].setAttribute("style", "transition-duration: 2000ms;transform: translate3d(210px,-160px,0px);");
		$xuanLi[2].setAttribute("style", "transition-duration: 2000ms;transform: translate3d(210px,160px,0px);");
		$xuanLi[3].setAttribute("style", "transition-duration: 2000ms;transform: translate3d(-210px,120px,0px);");
		$img[3].setAttribute("style", "transition: width 2s, height 2s; height: 200px; width: 150px");
		
		window.setTimeout(function(){
			for(var i=0; i<that.pic_src.length; i++){
				$img[i].removeAttribute("style");
				$xuanLi[i].removeAttribute("style");
			};
			that.Huan($img,$xuanLi);
		},2000);
		return that;
	},
	Huan : function($img, $xuanLi){
		var that = this;
		console.log("chun");
		for(var i=0; i<that.pic_src.length; i++){
			if(i<3){
				$img[i].id = "img" + (i+1);
				$xuanLi[i].id = "xuanLi" + (i+1);
			}else{
				$img[i].id = "img0";
				$xuanLi[i].id = "xuanLi0";
			}
		};
		return that;
	},
}