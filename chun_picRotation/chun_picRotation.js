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
	this.pic_src = [
					"http://i.mmcdn.cn/simba/img/T117eTXmXqXXXXXXXX.jpg",
					"http://img03.taobaocdn.com/tps/i3/T1t8eTXbBtXXXXXXXX-490-170.png",
					"http://i.mmcdn.cn/simba/img/T1OVOUXeNjXXXXXXXX.jpg",
					"http://i.mmcdn.cn/simba/img/T1J.9TXc8lXXXXXXXX.jpg"
					];


	this.init();
};

picRotation.prototype = {
	init : function(){
		var _this = this;
		_this.createView(_this);
	},
	// 创建图片显示区域
	createView : function(that){
		// div
		var picViewDiv = document.createElement("div");
		picViewDiv.id = "picViewDiv";
		document.body.appendChild(picViewDiv);
		// div-ul(content)
		var picUl = document.createElement("ul");
		picUl.id = "picUl";
		picViewDiv.appendChild(picUl);
		// div-ul-li(content)
		for(var i=0; i<that.pic_src.length; i++){
			var picLi = document.createElement("li");
			picLi.className = "liContent";
			picLi.style.left = "0px";
			picUl.appendChild(picLi);
			// div-ul-li-img
			var picLiImg = document.createElement("img");
			picLiImg.setAttribute("src", that.pic_src[i]);
			picLi.appendChild(picLiImg);
		};
		// div-ul(bottom)
		var picUlBtn = document.createElement("ul");
		picUlBtn.id = "picUlBtn";
		picViewDiv.appendChild(picUlBtn);
		// div-ul-li(bottom)
		for(var j=that.pic_src.length-1; j>=0; j--){
			var picLiBtn = document.createElement("li");
			picLiBtn.className = "liBottom";
			picLiBtn.innerHTML = (j+1).toString();
			picUlBtn.appendChild(picLiBtn);
		};
		that.movePic(that);
	},
	// 动起来
	movePic : function(that){
		var $ul = document.getElementById("picUl");
		var $li = $ul.getElementsByTagName("li");
		
	},
	// 循环
	loopPic : function(that, pics){

	},
}

