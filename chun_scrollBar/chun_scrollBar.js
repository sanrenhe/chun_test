/**
 * @fileOverview js原生滚动条
 * @athor qinchunzhen
 * @email chunzhen@leju.com
 * @date 2016-1-23 
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

function scrollBar(){
	this.$body = document.body;
	this.$scrollBar1 = document.getElementById("scrollBar1");
	this.$viewport = document.getElementById("viewport");
	this.$overview = document.getElementById("overview");
	this.scrollFlag = false;
};

scrollBar.prototype = {
	init : function(){
		var that = this;
		that.$viewport.style.height = '500px';
		that.$viewport.style.overflow = 'hidden';
		that.$viewport.style.margin = '0px';
		that.createBar();
		return that;
	},
	createBar : function(){
		var that = this;
		var $scrollBarBody = document.createElement('div');
		$scrollBarBody.id = 'scrollBar';
		$scrollBarBody.style.left = that.$viewport.offsetWidth-20 + 'px';
		$scrollBarBody.style.height = that.$viewport.offsetHeight + 'px';
		that.$scrollBar1.appendChild($scrollBarBody);

		var $track = document.createElement('div');
		$track.id = 'track';
		$track.style.height = that.$viewport.offsetHeight*0.2 + 'px';
		$scrollBarBody.appendChild($track);

		var start=distance=end=0;
		$track.addEventListener("mousedown", put, false);
		function put(e){
			e.stopPropagation();
			that.shakeFlag = true;
			that.$body.className = "noSelect";
			start = e.pageY;
			that.$body.addEventListener("mousemove", move, false);
			$track.addEventListener("mousemove", move, false);
			function move(evt){
				if(that.shakeFlag){
					evt.stopPropagation();
					end = evt.pageY;
					var startTop = parseInt($track.style.top);
					distance = end - startTop;
					$track.style.top = end-40 + 'px';
					that.$overview.style.top = -parseInt($track.style.top) + "px";
					console.log(that.$overview.style.top);
				}
			};
			that.$body.addEventListener("mouseup", up, false);
			$track.addEventListener("mouseup", up, false);
			function up(e){
				e.stopPropagation();
				that.shakeFlag = false;
				that.$body.className = "";
			};
			console.log("down");
		};
		return that;
	},
};

var sBar = new scrollBar();
sBar.init();
loadjscssfile('chun_scrollBar.css','css');





