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
					"http://i.mmcdn.cn/simba/img/T1J.9TXc8lXXXXXXXX.jpg"
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
			xuan_div_ul.appendChild(xuan_div_ul_li);
			// div-ul-li-img
			var xuan_div_ul_li_img = document.createElement("img");
			xuan_div_ul_li_img.setAttribute("src", that.pic_src[i]);
			xuan_div_ul_li.appendChild(xuan_div_ul_li_img);
		};
		









		return that;
	}
}