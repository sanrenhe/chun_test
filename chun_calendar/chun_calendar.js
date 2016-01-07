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
		// 得到该月的日期数据
		var cal_rows = that.getCalenderValue(that, time);
		// 得到该月所有日期数据
		var arr = that.getShowCalValues(time.getFullYear(), time.getMonth());
		// 创建日历容器div
		var cal_div = document.createElement("div");
		cal_div.id = "calDiv";
		document.body.appendChild(cal_div);
		cal_div.appendChild(cal_rows);
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
		cal_table.appendChild(cal_tbody);

		var cal_tbody_tr_id = ""; 
		for(var row=0; row<6; row++){
			// table-tbody-tr
			var cal_tbody_tr = document.createElement("tr");
			cal_tbody_tr_id = "cal_tbody_tr" + row
			cal_tbody_tr.id = cal_tbody_tr_id;
			cal_tbody.appendChild(cal_tbody_tr);
			for(var col=0; col<7; col++){
				// table-tbody-tr-td
				var cal_tbody_tr_td = document.createElement("td");
				cal_tbody_tr_td.innerHTML = arr[row][col];
				document.getElementById(cal_tbody_tr_id).appendChild(cal_tbody_tr_td);
			}
		};
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
		 	nextMonthdayB = 1,// 下个月日期数B
		 	startFlag = false;// 填充该月日期数标识
		// 填充数据
		for(var row=0; row<6; row++){
			cal_rows[row] = ['','','','','','',''];
			for(var col=0; col<7; col++){
				if(col < currentMonthTopDay && row==0){
					cal_rows[row][col] = preMonthday.toString();
					preMonthday++;
				}
				if(!startFlag && col==currentMonthTopDay){
					cal_rows[row][col] = nowMonthday.toString();
					startFlag = true;
					nowMonthday++;
				}else if(startFlag && nowMonthday <= days){
					cal_rows[row][col] = nowMonthday.toString();
					nowMonthday++;
					if(nowMonthday == days+1){
						for(var i=1; i<7-col; i++){
							cal_rows[row][col+i] = nextMonthday.toString();
							nextMonthday++;
						}
					}
				}
				if(row == 5){
					if(cal_rows[row][col]=="" && cal_rows[6][6]<8){
						cal_rows[row][col] = nextMonthday.toString();
						nextMonthday++;
					}else if(cal_rows[row][col] == ""){
						cal_rows[row][col] = nextMonthdayB.toString();
						nextMonthdayB++;
					}
				}
			}
		};
		return cal_rows;
	},
}