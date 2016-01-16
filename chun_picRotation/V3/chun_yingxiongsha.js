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
			pic_Li.id = 'li' + i;
			pic_Ul.appendChild(pic_Li);
			var pic_Img = document.createElement('img');
			pic_Img.id = 'img' + i;
			pic_Img.src = that.pic_src[i];
			pic_Li.appendChild(pic_Img);
		};






		return that;
	}
};

var pic = new yingxiongsha();
pic.init();
loadjscssfile('chun_yingxiongsha.css','css');