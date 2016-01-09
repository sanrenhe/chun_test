/*
 * @fileOverview 原生js日历
 * @author qinchunzhen
 * @email chunzhen@leju.com
 * @data 2016/1/7
 */
window.onload = function(){
	new calendar();
}

function calendar(){
	this.monthArray = [["一月","January"],["二月","February"],["三月","March"],["四月","April"],["五月","May"],["六月","June"],["七月","July"],["八月","August"],["九月","September"],["十月","October"],["十一月","November"],["十二月","December"]];
	this.weekArray = [["日","Sun"],["一","Mon"],["二","Tue"],["三","Web"],["四","Thu"],["五","Fri"],["六","Sat"]];
	this.daysOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	this.marks = ["cn","en"];
	this.init();
};

calendar.prototype = {
	init : function(){
		var _this = this;
		var nowTime = new Date();
		// 创建Calender
		_this.createCalender(_this, nowTime);
	},
	// 创建Calender
	createCalender : function(that, time){
		// 得到该月的日期数据模板
		var cal_rows = that.getCalenderValue(that, time);
		// 得到该月所有日期数据
		var arr = that.getShowCalValues(time.getFullYear(), time.getMonth());
		// 最外层div
		var div = document.createElement("div");
		div.id = "div";
		document.body.appendChild(div);
		// 创建日历容器div
		var cal_div = document.createElement("div");
		cal_div.id = "calDiv";
		div.appendChild(cal_div);
		// 创建日期显示容器div
		var cal_title = document.createElement("div");
		cal_title.id = "calTitle";
		cal_div.appendChild(cal_title);
		// 创建向前翻一年按钮
		var cal_button_preYear = document.createElement("button");
		cal_button_preYear.innerHTML = "<<";
		cal_button_preYear.id = "cal_button_preYear";
		cal_button_preYear.className = "prev";
		cal_title.appendChild(cal_button_preYear);
		// 创建向前翻一个月按钮
		var cal_button_preMonth = document.createElement("button");
		cal_button_preMonth.innerHTML = "<";
		cal_button_preMonth.id = "cal_button_preMonth";
		cal_button_preMonth.className = "prev";
		cal_title.appendChild(cal_button_preMonth);
		// 渲染日期显示
		cal_title.appendChild(cal_rows);
		// 创建向后翻一个月按钮
		var cal_button_nextMonth = document.createElement("button");
		cal_button_nextMonth.innerHTML = ">";
		cal_button_nextMonth.id = "cal_button_nextMonth";
		cal_button_nextMonth.className = "next";
		cal_title.appendChild(cal_button_nextMonth);
		// 创建向后翻一年按钮
		var cal_button_nextYear = document.createElement("button");
		cal_button_nextYear.innerHTML = ">>";
		cal_button_nextYear.id = "cal_button_nextYear";
		cal_button_nextYear.className = "next";
		cal_title.appendChild(cal_button_nextYear);
		// 创建日历表格 table
		var cal_table = document.createElement("table");
		cal_table.id = "calTable";
		cal_div.appendChild(cal_table);
		// table-thead
		var cal_thead = document.createElement("thead");
		cal_table.appendChild(cal_thead);
		// table-thead-tr
		var cal_thead_tr = document.createElement("tr");
		cal_thead.appendChild(cal_thead_tr);
		// table-thead-tr-th
		for(var i=0; i<7; i++){
			var cal_thead_tr_th = document.createElement("th");
			cal_thead_tr_th.innerHTML = that.weekArray[i][0];
			cal_thead_tr.appendChild(cal_thead_tr_th);
		};
		// table-tbody
		var cal_tbody = document.createElement("tbody");
		cal_tbody.id = "cal_tbody";
		cal_table.appendChild(cal_tbody);
		that.createTbody(false,arr);
		// prev按钮事件
		that.prevButtonEvent(that);
		// next按钮事件
		that.nextButtonEvent(that);
		// 日期点击事件
		that.dateClickEvent(that);
	},
	// 创建日期表格
	createTbody : function(createFlag,arr){
		var caltime = document.getElementById("cal_title_h4").innerHTML;
		var yearMonthDate = caltime.split("-");
		this.isFisrtCreat(createFlag);
		var cal_tbody_tr_id = ""; 
		for(var row=0; row<6; row++){
			// table-tbody-tr
			var cal_tbody_tr = document.createElement("tr");
			cal_tbody_tr_id = "cal_tbody_tr" + row
			cal_tbody_tr.id = cal_tbody_tr_id;
			document.getElementById("cal_tbody").appendChild(cal_tbody_tr);
			for(var col=0; col<7; col++){
				// table-tbody-tr-td
				var cal_tbody_tr_td = document.createElement("td");
				cal_tbody_tr_td.setAttribute("data-date", arr[row][col].split("/")[1]);
				cal_tbody_tr_td.className = "calDate";
				document.getElementById(cal_tbody_tr_id).appendChild(cal_tbody_tr_td);
				// table-tbody-tr-td-a
				var cal_tbody_tr_td_a = document.createElement("a");
				cal_tbody_tr_td_a.href = "javascript:;";
				cal_tbody_tr_td_a.innerHTML = arr[row][col].split("-")[0];
				cal_tbody_tr_td_a.className = arr[row][col].split("-")[1].split("/")[0];
				if(arr[row][col].split("-")[0] == yearMonthDate[2] && arr[row][col].split("-")[1].split("/")[0] == "nowMonth"){
					cal_tbody_tr_td_a.id = "choose";
				};
				cal_tbody_tr_td.appendChild(cal_tbody_tr_td_a);
			}
		};
	},
	// 判断是否首次载入
	isFisrtCreat : function(createFlag){
		if(createFlag){
			var $cal_tbody = document.getElementById("cal_tbody");
			var len = $cal_tbody.childNodes.length;
			for(var i=len-1; i>=0; i--){
				$cal_tbody.removeChild($cal_tbody.childNodes[i]);
			}
		}else{
			return false;
		}
	},
	// 得到Calender的所有数据
	getCalenderValue : function(that, time){
		var calendarValue = that.getFirstRowUi(that, time);
		return calendarValue;
	},
	// 得到Calender的第一行数据
	getFirstRowUi : function(that, time){
		var month = that.doHandleStr(time.getMonth() + 1),
		    day = that.doHandleStr(time.getDate());
		// 渲染第一行数据
		var firstRowValues = document.createElement("h4");
		firstRowValues.id = "cal_title_h4";
		firstRowValues.innerHTML = time.getFullYear() + "-" + month + "-" + day;
		return firstRowValues;
	},
	doHandleStr : function(str){
		var _str = str;
		if(str.toString().lenght == 1){
			_str = parseInt("0" + str);
		};
		return _str;
	},
	// 得到该月所有日期数据
	getShowCalValues : function(year, month){
		var cal_rows = new Array();
		var monthTop = new Date(year, month);
		var currentMonthTopDay = monthTop.getDay();
		// 判断是否是闰年
		if(month == 1 && ((year%4==0 && year%100!=0) || year%400==0)){
			this.daysOfMonth[month] = 29;
		};
		var days = this.daysOfMonth[month],// 该月天数
		 	preMonthday = this.daysOfMonth[month-1<0 ? 11 : month-1] - currentMonthTopDay + 1,// 前一个月在该月视图中的日期
		 	nowMonthday = 1,// 该月日期数
		 	nextMonthday = 1,// 下个月日期数
		 	startFlag = false;// 填充该月日期数标识
		// 填充数据
		for(var row=0; row<6; row++){
			cal_rows[row] = ['','','','','','',''];
			for(var col=0; col<7; col++){
				if(col < currentMonthTopDay && row==0){
					cal_rows[row][col] = preMonthday.toString() + "-" + "prevMonth";
					preMonthday++;
				}
				if(!startFlag && col==currentMonthTopDay){
					cal_rows[row][col] = nowMonthday.toString() + "-"  + "nowMonth" + "/" + year + "-" + (month+1) + "-" + nowMonthday;
					startFlag = true;
					nowMonthday++;
				}else if(startFlag && nowMonthday <= days){
					cal_rows[row][col] = nowMonthday.toString() + "-"  + "nowMonth" + "/" + year + "-" + (month+1) + "-" + nowMonthday;
					nowMonthday++;
					if(nowMonthday == days+1){
						for(var i=1; i<7-col; i++){
							cal_rows[row][col+i] = nextMonthday.toString() + "-"  + "nextMonth";
							nextMonthday++;
						}
					}
				}
				if(row == 5){
					if(cal_rows[row][col]=="" && cal_rows[4][6]<8){
						cal_rows[row][col] = nextMonthday.toString() + "-"  + "nextMonth";
						nextMonthday++;
					}else if(cal_rows[row][col] == ""){
						cal_rows[row][col] = nextMonthday.toString() + "-"  + "nextMonth";
						nextMonthday++;
					}
				}
			}
		};
		return cal_rows;
	},
	prevButtonEvent : function(that){
		var $prevYear = document.getElementById("cal_button_preYear");
		$prevYear.onclick = function(){
			var caltime = document.getElementById("cal_title_h4").innerHTML;
			var yearMonthDate = caltime.split("-");
			var year = parseInt(yearMonthDate[0]) - 1;
			var month = parseInt(yearMonthDate[1]) - 1;
			var date = parseInt(yearMonthDate[2]);
			var arr = that.getShowCalValues(year, month);
			document.getElementById("cal_title_h4").innerHTML = year + "-" + (month+1) + "-" + date;
			that.createTbody(true,arr);
		};
		var $prevMonth = document.getElementById("cal_button_preMonth");
		$prevMonth.onclick = function(){
			var caltime = document.getElementById("cal_title_h4").innerHTML;
			var yearMonthDate = caltime.split("-");
			if(yearMonthDate[1] == 1){
				var year = parseInt(yearMonthDate[0]) - 1;
				var month = 11;
			}else{
				var year = parseInt(yearMonthDate[0]);
				var month = parseInt(yearMonthDate[1]) - 2;
			}
			var date = parseInt(yearMonthDate[2]);
			var arr = that.getShowCalValues(year, month);
			document.getElementById("cal_title_h4").innerHTML = year + "-" + (month+1) + "-" + date;
			that.createTbody(true,arr);
		};
	},
	nextButtonEvent : function(that){
		var $nextYear = document.getElementById("cal_button_nextYear");
		$nextYear.onclick = function(){
			var caltime = document.getElementById("cal_title_h4").innerHTML;
			var yearMonthDate = caltime.split("-");
			var year = parseInt(yearMonthDate[0]) + 1;
			var month = parseInt(yearMonthDate[1]) - 1;
			var date = parseInt(yearMonthDate[2]);
			var arr = that.getShowCalValues(year, month);
			document.getElementById("cal_title_h4").innerHTML = year + "-" + (month+1) + "-" + date;
			that.createTbody(true,arr);
		};
		var $nextMonth = document.getElementById("cal_button_nextMonth");
		$nextMonth.onclick = function(){
			var caltime = document.getElementById("cal_title_h4").innerHTML;
			var yearMonthDate = caltime.split("-");
			if(yearMonthDate[1] == 12){
				var year = parseInt(yearMonthDate[0]) + 1;
				var month = 0;
			}else{
				var year = parseInt(yearMonthDate[0]);
				var month = parseInt(yearMonthDate[1]);
			}
			var date = parseInt(yearMonthDate[2]);
			var arr = that.getShowCalValues(year, month);
			document.getElementById("cal_title_h4").innerHTML = year + "-" + (month+1) + "-" + date;
			that.createTbody(true,arr);
		};
	},
	dateClickEvent : function(that){
		var $table = document.getElementById("calTable");
		$table.addEventListener('click', chooseDate, false);
		function chooseDate(e){
			var $a = e.target;
			if($a.className == "prevMonth" || $a.className == "nextMonth" || $a.nodeName != "A"){
				return false;
			};
			document.getElementById("choose").setAttribute("id", "");
			$a.setAttribute("id", "choose");
			var caltime = document.getElementById("cal_title_h4").innerHTML;
			var yearMonthDate = caltime.split("-");
			var year = parseInt(yearMonthDate[0]);
			var month = parseInt(yearMonthDate[1]);
			document.getElementById("cal_title_h4").innerHTML = year + "-" + month + "-" + $a.innerHTML;
			console.log($a.parentElement.getAttribute("data-date"));
		}
	},
}