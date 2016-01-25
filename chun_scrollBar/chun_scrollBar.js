/**
 * @fileOverview js原生滚动条
 * @athor qinchunzhen
 * @email chunzhen@leju.com
 * @date 2016-1-23 
 */
function scrollBar(){
	this.option = {

	};
};

scrollBar.prototype = {
	init : function(){
		var that = this;
		that.$slider = document.getElementById("slider");
		that.$slider.style.height = '500px';
		that.$slider.style.overflow = 'hidden';
		that.$slider.style.margin = '0px';
		that.$firstChild = that.$slider.firstElementChild;
		console.log(that.$firstChild);
		that.createBar();




		return that;
	},
	createBar : function(){
		var that = this;
		var barDiv = document.createElement('div');
		barDiv.id = 'barDiv';
		barDiv.style.position = 'absolute';
		barDiv.style.left = that.$slider.offsetWidth-20 + 'px';
		barDiv.style.top = '0px';
		barDiv.style.border = '1px solid black';
		barDiv.style.width = '20px';
		barDiv.style.height = that.$slider.offsetHeight + 'px';
		barDiv.style.zIndex = '4';
		barDiv.style.textAlign = 'center';
		barDiv.style.paddingTop = '1px';
		that.$slider.appendChild(barDiv);

		var barDivUl = document.createElement('ul');
		barDivUl.style.top = '1px';
		barDivUl.style.position = 'relative';
		barDivUl.style.border = '1px solid grey';
		barDivUl.style.paddingLeft = '0px';
		barDivUl.style.width = (parseInt(barDiv.offsetWidth)-6) + 'px';
		barDivUl.style.height = that.$slider.offsetHeight*0.2 + 'px';
		barDivUl.style.margin = '0 auto';
		barDivUl.style.zIndex = '5';
		barDivUl.style.borderRadius = '5px';
		barDivUl.style.backgroundColor = '#3399FF';
		barDivUl.style.cursor = 'pointer';
		barDiv.appendChild(barDivUl);

		barDivUl.addEventListener("mousedown", put, false);
		
		function put(e){
			console.log(e.pageY);
			var start = e.pageY;
			var distance = 0;
			var end = 0;
			barDivUl.addEventListener("mousemove", move, false);
			function move(evt){
				end = evt.pageY;
				if(end > barDivUl.offsetHeight*0.5){
					barDivUl.style.top = end-40 + 'px';
				}
				document.body.addEventListener("mouseup", up, false);
				function up(e){
					console.log("up");
					barDivUl.removeEventListener("mousemove", move, false);
					barDivUl.style.top = e.pageY-40 + 'px';
					distance = 0;
					end = 0;
				}
			};
			
			// debugger;
		};
		

		return that;
	},
}

var sBar = new scrollBar();
sBar.init();






