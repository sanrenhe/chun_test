/**
 * @fileOverview 图片轮播
 * @author qinchunzhen
 * @email chunzhen@leju.com
 * @date 2016/1/10
 */
window.onload = function(){
	new picRotation();
};

function picRotation(){
	this.pic_src = ["","","",""];


	this.init();
};

picRotation.prototype = {
	init : function(){
		var _this = this;
		console.log(_this.pic_src);
		_this.createView(_this);
	},
	// 创建图片显示区域
	createView : function(that){
		// div
		var picViewDiv = document.createElement("div");
		picViewDiv.id = "picViewDiv";
		document.body.appendChild(picViewDiv);
		// div-ul
		var picUl = document.createElement("ul");
		picUl.id = "picUl";
		picViewDiv.appendChild(picUl);
		// div-ul-li	div-ul-button
		for(var i=0; i<that.pic_src.length; i++){
			var picLi = document.createElement("li");
			picLi.src = that.pic_src[i];
			picUl.appendChild(picLi);
			var picBtn = document.createElement("button");
			picUl.appendChild(picBtn);
		}
		// div-button
		

	},
}

