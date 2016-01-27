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

		var start=distance=end=0;
		barDivUl.addEventListener("mousedown", put, false);
		function put(e){
			e.stopPropagation();
			document.body.setAttribute("style","user-select: none; -o-user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none;");
			start = e.pageY;
			document.body.addEventListener("mousemove", move, false);
			barDivUl.addEventListener("mousemove", move, false);
			function move(evt){
				evt.stopPropagation();
				end = evt.pageY;
				var startTop = parseInt(barDivUl.style.top);
				distance = end - startTop;
				barDivUl.style.top = end-40 + 'px';
				console.log("move");
			};
			document.body.addEventListener("mouseup", up, false);
			barDivUl.addEventListener("mouseup", up, false);
			function up(e){
				e.stopPropagation();
				barDivUl.style.top = e.pageY-40 + 'px';
				document.body.removeEventListener("mousemove", move, false);
				barDivUl.removeEventListener("mousemove", move, false);
				document.body.setAttribute("style","");

				// barDivUl.removeEventListener("mousedown", put, false);
				// barDivUl.style.top = e.pageY-40 + 'px';
				console.log("up");
			};
			document.body.addEventListener("mouseup", up, false);
			console.log("down");
			
			// debugger;
		};
		

		return that;
	},
}

var sBar = new scrollBar();
sBar.init();






