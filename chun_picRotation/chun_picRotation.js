/**
 * @fileOverview 图片轮播
 * @author qinchunzhen
 * @email chunzhen@leju.com
 * @date 2016/1/10
 */
window.onload = function(){
	var pic = new picRotation();
	pic.init();
};

function picRotation(){
	this.pic_src = [
					"http://i.mmcdn.cn/simba/img/T117eTXmXqXXXXXXXX.jpg",
					"http://img03.taobaocdn.com/tps/i3/T1t8eTXbBtXXXXXXXX-490-170.png",
					"http://i.mmcdn.cn/simba/img/T1OVOUXeNjXXXXXXXX.jpg",
					"http://i.mmcdn.cn/simba/img/T1J.9TXc8lXXXXXXXX.jpg",
					"http://i.mmcdn.cn/simba/img/T117eTXmXqXXXXXXXX.jpg",
					"http://img03.taobaocdn.com/tps/i3/T1t8eTXbBtXXXXXXXX-490-170.png",
					];
	this.j = 0;
	this.count = 0;
	this.Width = 0;
};

picRotation.prototype = {
	init : function(){
		var that = this;
		that.createView(that);
		return that;
	},
	// 创建图片显示区域
	createView : function(){
		var that = this;
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
			picLi.id = i+1;
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
		for(var j=that.pic_src.length-3; j>=0; j--){
			var picLiBtn = document.createElement("li");
			picLiBtn.className = "liBottom";
			picLiBtn.innerHTML = (j+1).toString();
			picUlBtn.appendChild(picLiBtn);
		};
		that.movePic();
		return that;
	},
	// 动起来
	movePic : function(){
		var that = this;
		var $ul = document.getElementById("picUl");
		that.picloop = window.setInterval(function(){
			that.loopPic($ul);
		},2000);
		return that;
	},
	// 循环
	loopPic : function(pics){
		var that = this;
		if(this.count > that.pic_src.length-3){
			pics.setAttribute("style", 'transition-duration: 300ms; transform: translate3d(' + that.Width + 'px, 0px, 0px)');
			this.count = 0;
			that.j = 400;
		}
		that.j = that.j - pics.firstChild.offsetWidth;
		that.Width = pics.firstChild.offsetWidth * that.pic_src.length;
		pics.setAttribute("style", 'width:' + that.Width + 'px;' + 'transition-duration: 300ms; transform: translate3d(' + that.j + 'px, 0px, 0px)');
		this.count++;
		return that;
	},
}

