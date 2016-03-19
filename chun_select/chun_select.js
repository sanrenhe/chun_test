/**
 * @fileOverview js原生下拉框
 * @athor qinchunzhen
 * @email chunzhen@leju.com
 * @date 2016-2-18 
 */
function loadjscssfile(filename, filetype){
	if(filename == '' || filetype == ''){
		alert('引入错误！');
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
		alert('无效引入');
		return false;
	};
};

function select(){
	this.container = document.getElementById('selectContainer');
};
select.prototype = {
	init: function(){
		var that = this;

		that.createSelect();

		return that;
	},
	createSelect: function(){
		var that = this;

		var selectContent = document.createElement('div');
		selectContent.className = 'chun_selectContent';
		that.container.appendChild(selectContent);
		var selectIcon = document.createElement('i');
		selectIcon.className = 'chun_selectIcon' + ' ' + 'up';
		that.container.appendChild(selectIcon);

		return that;
	},
	clickEvent: function(){
		var that = this;

		var optionListCon = document.createElement('div');

		return that;
	},
};

var sele = new select();
sele.init();
loadjscssfile('chun_select.css','css');