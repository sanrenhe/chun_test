/*
 * @fileOverview 提示弹框
 * @author qinchunzhen
 * @email chunzhen@leju.com
 * @data 2016/1/6
 */
window.onload = function(){
	var options = {
		txt : 'Hello World!'
	}
	new toolTips(options);
};

/*仿写$.extend()方法*/
// 复制对象方法
function cloneObj(oldObj){
	if(typeof(oldObj) != 'object' || oldObj == null) return oldObj;
	var newObj = new Object();
	for(var i in oldObj){
		newObj[i] = cloneObj(oldObj[i]);
		return newObj;
	}
};
//扩展对象方法
function extendObj(){
	var args = arguments;
	if(args.length < 2) return false;
	var temp = cloneObj(args[0]);
	for(var n=1; n<args.length; n++){
		for(var i in args[n]){
			temp[i] = args[n][i];
		}
	}
	return temp;
};
/*end*/
 
function toolTips(options){
	this.personality = {
		txt : '秦春臻的提示框',
	};
	this.css = {
			c_height : '100px',
			c_width : '200px',
			c_position : 'absolute',
			c_background_color : 'rgba(0,0,0,0.5)',
			c_text_align : 'center',
			c_fontsize : '400%',
			c_border_radius : '20px',
			c_paddind : '20px',
			c_color : "#fff",
			c_left : '50%',
			c_top : '50%',
			c_zIndex : '99999'
	};
	this.settings = extendObj(this.personality, options);
	this.init();
};

toolTips.prototype = {
	init : function(){
		var _this = this;
		// 初始化弹层
		var mes = _this.initialization();
		// 显示弹层
		_this.showTips(mes);
		// 隐藏弹层
		_this.removeTips();
	},
	initialization : function(){
		var _this = this,
			txt = _this.settings.txt || '秦春臻的提示框',
			c_height = _this.css.c_height,
			c_width = _this.css.c_width,
			c_position = _this.css.c_position,
			c_background_color = _this.css.c_background_color,
			c_text_align = _this.css.c_text_align,
			c_fontsize = _this.css.c_fontsize,
			c_border_radius = _this.css.c_border_radius,
			c_paddind = _this.css.c_paddind,
			c_color = _this.css.c_color,
			c_left = _this.css.c_left,
			c_top = _this.css.c_top,
			c_zIndex = _this.css.c_zIndex;
		var message = document.createElement("p");
		message.setAttribute("id", "tip");
		message.style.height = c_height;
		message.style.width = c_width;
		message.style.position = c_position;
		message.style.backgroundColor = c_background_color;
		message.style.textAlign = c_text_align;
		message.style.fontSize = c_fontsize;
		message.style.padding = c_paddind;
		message.style.color = c_color;
		message.style.left = c_left;
		message.style.top = c_top;
		message.style.zIndex = c_zIndex;
		message.style.borderRadius = c_border_radius;
		message.innerHTML = txt;
		return message;
	},
	showTips :  function(tip){
		document.body.appendChild(tip);
	},
	removeTips : function(tip){
		window.setTimeout(function(){
			document.body.removeChild(document.getElementById("tip"));
		}, 2000);
	},
}


