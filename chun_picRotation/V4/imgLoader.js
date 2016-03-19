define(function(require, exports, module){
	module.exports = imgLoading;

	function imgLoading(imgList, callback, timeout){
		imgList = isArray(imgList) && imgList || [];
		timeout = timeout || 5000;
		callback = typeof(callback) === 'function' && callback;

		var total = imgList.length,
			loaded = 0,
			imgages = [],
			_on = function(){
				loaded < total && (++loaded, callback && callback(loaded/total));
			};

		if(!total){
			return callback && callback(1);
		};

		for(var i=0; i<total; i++ ){
			imgages[i] = new Image();
			imgages[i].onload = imgages[i].onerror = _on;
			imgages[i].src = imgList[i];
		};

		setTimeout(function(){
			loaded < total && (loaded = total, callback && callback(loaded/total));
		}, timeout*total);
	};
	function isArray(obj){
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
});