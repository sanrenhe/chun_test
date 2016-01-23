/**
 * @fileOverview js原生滚动条
 * @athour qinchunzhen
 * @email chunzhen@leju.com
 * @date 2016-1-23 
 */
function scrollBar(){

};

scrollBar.prototype = {
	init : function(){
		var that = this;
		console.log(document.body.offsetHeight);
		that.createBar();




		return that;
	},
	createBar : function(){
		var that = this;
		var barDiv = document.createElement('div');
		barDiv.id = 'barDiv';
		barDiv.style.position = 'relative';
		barDiv.style.cssFloat = 'right';
		barDiv.style.top = '0px';
		barDiv.style.border = '1px solid black';
		barDiv.style.width = '20px';
		barDiv.style.height = document.body.offsetHeight + 'px';
		barDiv.style.zIndex = '99999';
		document.body.appendChild(barDiv);



		return that;
	},
}

var sBar = new scrollBar();
sBar.init();






