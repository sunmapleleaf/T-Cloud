	var data;
	var filterJson;
	var data2;
	var dataRecieved = 0;
var mapingTable = {"保压切换":"injection1CutOffPosition","螺杆终点":"injection1Cushion","注射时间":"injection1ActMoveTime","切换压力":"injection1CutOffPressure","机器循环":"systemCycleTimeMachine","周期时间":"systemShotTimeAct","熔胶时间":"plastActMoveTime","熔胶终点":"injection1PlastEndPosition","最大射压":"injection1InjPeakPressure"};

$(document).ready(function (){
		  	   var userID = getCookie('userID');
	  // if(userID == null)
	  //       location.href = "../login.aspx?goto=analysis";
       $("#admin_settings").html(userID);
	$( "#settings, #admin_settings" ).on( "click", function()//退出下拉菜单
	{
			 $("#admin").toggleClass("admin-color");
			$( "#menu" ).slideToggle( "fast","linear" );
	});
	
	$('.selectbox').wrap('<div class="select_wrapper"></div>')
	$('.selectbox').parent().children('span').width($('.select_wrapper').width());	
	$('.selectbox').css('display', 'none');					
	$('.selectbox').parent().append('<ul class="select_inner"></ul>');
	$("[id*=divBox]").each(function () {

	    $('.selectbox', this).parent().prepend('<span>' + $($('.selectbox', this).get(0)).find(':selected').text() + '</span>');
	    $('.selectbox', this).children().each(function () {
	        
		        var opttext = $(this).text();
		        var optval = $(this).val();
		        $(this).parent().parent().children('.select_inner').append('<li id="' + optval + '">' + opttext + '</li>');
	        });

	});
	

	$('.selectbox').parent().find('li').on('click', function () {
		var cur = $(this).attr('id');
		$(this).parent().parent().children('span').text($(this).text());
		$(this).parent().parent().children('.selectbox').children().removeAttr('selected');
		$(this).parent().parent().children('.selectbox').children('[value="' + cur + '"]').attr('selected', 'selected');

	});
	
	$('.selectbox').parent().on('click', function () {
	    event.stopPropagation();

		$(this).find('ul').slideToggle('fast');
	});
	

	$(document).not($('.selectbox').parent()).on('click', function () {
	   $($('.selectbox').parent()).find('ul').hide('fast');
	});
	
	$('.account-title li').click(function () {
	    if (this.innerHTML == '使 用') location.replace('analysisUsage.html');
	    else if (this.innerHTML == '质 量') location.replace('analysis.html');
	    else if (this.innerHTML == '状 态') location.replace('analysisStatus.html');
	    else if (this.innerHTML == '异 常') location.replace('analysisAlarm.html');


	});
	
	getQualityData("qualityData",'{"machineIDFilter":"keba001","parameterFilter":"保压切换","datePicker_1":"2015-12-30 14:13:01.157","datePicker_2":"2016-01-04 08:58:51.183","quantity":"10"}');
	$($('.demo')).on("click","thead td",function(){		
		    alert($(this).html());
			changeData($(this).html());
		});	



    // alarm
	if (location.href.indexOf("Alarm") != -1)
	    (function () {
	        var option = {
	            tooltip: {
	                trigger: 'axis',
	                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
	                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	                }
	            },
	            legend: {
	                data: ['马达未开', '温度异常', '安全门未关', '润滑未到位', '后安全门未关', '注射超时', '合模超时', '合模未到位', '其他']
	            },
	            grid: {
	                left: '3%',
	                right: '4%',
	                bottom: '3%',
	                containLabel: true
	            },
	            xAxis: [
                    {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
	            ],
	            yAxis: [
                    {
                        type: 'value'
                    }
	            ],
	            toolbox: {
	                feature:
                        {
                            saveAsImage: {},
                            dataView: {
                                show: true,
                                title: '数据',
                                readOnly: false,
                                lang: ['数据', '关闭', '刷新'],
                                backgroundColor: '#fff',
                                textareaColor: '#fff',
                                textareaBorderColor: '#333',
                                textColor: '#000',
                                buttonColor: '#c23531',
                                buttonTextColor: '#fff'
                            }
                        }
	            },
	            series: [
                    {
                        name: '马达未开',
                        type: 'bar',
                        data: [32, 33, 31, 34, 39, 33, 32]
                    },
                    {
                        name: '温度异常',
                        type: 'bar',
                        stack: '类型一',
                        data: [12, 12, 11, 13, 9, 23, 21]
                    },
                    {
                        name: '安全门未关',
                        type: 'bar',
                        stack: '类型一',
                        data: [22, 18, 19, 23, 29, 33, 31]
                    },
                    {
                        name: '润滑未到位',
                        type: 'bar',
                        stack: '类型一',
                        data: [15, 23, 21, 15, 19, 33, 41]
                    },
                    {
                        name: '后安全门未关',
                        type: 'bar',
                        data: [86, 101, 96, 102, 167, 160, 157],
                        markLine: {
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        type: 'dashed'
                                    }
                                }
                            },
                            data: [
                                [{ type: 'min' }, { type: 'max' }]
                            ]
                        }
                    },
                    {
                        name: '注射超时',
                        type: 'bar',
                        barWidth: 5,
                        stack: '类型二',
                        data: [62, 73, 70, 73, 109, 113, 112]
                    },
                    {
                        name: '合模超时',
                        type: 'bar',
                        stack: '类型二',
                        data: [12, 13, 10, 13, 29, 23, 22]
                    },
                    {
                        name: '合模未到位',
                        type: 'bar',
                        stack: '类型二',
                        data: [6, 7, 7, 7, 19, 13, 11]
                    },
                    {
                        name: '其他',
                        type: 'bar',
                        stack: '类型二',
                        data: [6, 8, 9, 8, 10, 11, 12]
                    }
	            ]
	        };
	        var barAlarm = document.getElementById("bar-alarm");
	        if (barAlarm) {
	            var barUsage = echarts.init(barAlarm);
	            barUsage.setOption(option);

	        }
	    })();

    //status
     if (location.href.indexOf("Status") != -1)
	(function () {
	    var subtractDays = 7;
	    var startDate = new Date(moment().subtract(subtractDays, 'days').utc().format());
	    var endDate = new Date(moment.utc().format());
	    var machineID = (window.location.href.match(/machineID[^&]+/) && window.location.href.match(/machineID[^&]+/).toString().split("=")[1].trim()) || "gefranVedo001";;
	    var data = {
	        "machineID":machineID,
	        "subtractDays": subtractDays,
	        "startDate": startDate,
	        "endDate": endDate
	    };
	    data = JSON.stringify(data);
	    $.ajax({
	        type: "POST",
	        url: "http://localhost:8000/json?callback=?",
	        data: data,
	        dataType: "jsonp",
	        jsonpCallback: "getStatus",
	        success: function (data) {  
	            var option = {
	                title: {
	                    text: machineID,
	                    subtext: '使用情况,单位(小时)',
	                    top: 'top',
	                    left: 'left'
	                },
	                tooltip: {
	                    trigger: 'axis',
	                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
	                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	                    }
	                },
	                legend: {
	                    data: ['关机', '报警', '空闲', '工作']
	                },
	                grid: {
	                    left: '3%',
	                    right: '4%',
	                    bottom: '3%',
	                    containLabel: true
	                },
	                xAxis: [
                        {
                            type: 'value'
                        }
	                ],
	                yAxis: [
                        {
                            type: 'category',
                            data: ['24小时', '前二天', '前三天', '前四天', '前五天', '前六天', '前七天']
                        }
	                ],
	                toolbox: {
	                    feature:
                            {
                                saveAsImage: {},
                                dataView: {
                                    show: true,
                                    title: '数据',
                                    readOnly: false,
                                    lang: ['数据', '关闭', '刷新'],
                                    backgroundColor: '#fff',
                                    textareaColor: '#fff',
                                    textareaBorderColor: '#333',
                                    textColor: '#000',
                                    buttonColor: '#c23531',
                                    buttonTextColor: '#fff'
                                }
                            }
	                },
	                series: [
                        {
                            name: '关机',
                            type: 'bar',
                            stack: '总量',

                            itemStyle: { normal: { label: { show: false, position: 'insideRight' } } },
                            data: data["softwareOff"]
                        },
                        {
                            name: '报警',
                            type: 'bar',
                            stack: '总量',
                            itemStyle: { normal: { label: { show: false, position: 'insideRight' } } },
                            data: data["alarm"]
                        },
                        {
                            name: '空闲',
                            type: 'bar',
                            stack: '总量',
                            itemStyle: { normal: { label: { show: false, position: 'insideRight' } } },
                            data: data["notwork"]
                        },
                        {
                            name: '工作',
                            type: 'bar',
                            stack: '总量',
                            itemStyle: { normal: { label: { show: false, position: 'insideRight' } } },
                            data: data["working"]
                        }
	                ]
	            };
	            var barUsage = document.getElementById("bar-usage");
	            if (barUsage) {
	                var barUsage = echarts.init(barUsage);
	                    barUsage.setOption(option);

	            }






	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            alert("error");

	        }
	    });


	})();

    //usage
    if(location.href.indexOf("Usage")!=-1)
	(function () {
	    var regExp = /machineID[^&]+/;
	    var machineID = "keba001";
	    var productCounterSet;
	    var productCounterAct;
	    machineID = (window.location.href.match(regExp) && window.location.href.match(regExp).toString().split("=")[1].trim()) || "gefranVedo001";
	    $.ajax(
            {
	                type: "POST",
	                url: "http://www.tnet.space/monitor/clamp.aspx",
	                //url: "clamp.aspx",
	                data: "MachineID=" + machineID + "&UnitID=overView",
	                dataType: "json",
	                success: function (data) {
	                    var option = {
	                        title: {
	                            //text: machineID,
	                            // subtext: '模数',
	                            top: 'bottom',
	                            left: 'right'
	                        },
	                        tooltip: {
	                            trigger: 'item',
	                            formatter: "{a} <br/>{b}: {c} ({d}%)"
	                        },
	                        legend: {
	                            orient: 'vertical',
	                            x: 'left',
	                            data: ['开模数', '未完成数']
	                        },
	                        series: [
                                {
                                    name: 'DH001-001',
                                    type: 'pie',
                                    radius: ['50%', '70%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'outside',
                                            formatter: '{b}\n{c}'
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: [
                                        { value: data.productCounterAct[1], name: '开模数' },
                                        { value: data.productCounterSet[1] - data.productCounterAct[1], name: '未完成数' },
                                    ]
                                }
	                        ]
	                    };
	                    var d = 0;
	                    var pieMould = echarts.init(document.getElementById('pie-mould'));
	                    pieMould.setOption(option);
	                    var option = {
	                        title: {
	                            text: machineID,
	                            subtext: '模数/时间',
	                            top: 'bottom',
	                            left: 'right'
	                        },
	                        tooltip: {
	                            trigger: 'item',
	                            formatter: "{a} <br/>{b}: {c} ({d}%)"
	                        },
	                        legend: {
	                            orient: 'vertical',
	                            x: 'left',
	                            data: ['使用时间', '未完成时间']
	                        },
	                        series: [
                                {
                                    name: 'DH001-001',
                                    type: 'pie',
                                    radius: ['50%', '70%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'outside',
                                            formatter: '{b}\n{c}'
                                        }

                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: [
                                        { value: 335, name: '使用时间' },
                                        { value: 310, name: '未完成时间' },
                                    ]
                                }
	                        ]
	                    };
	                    var pieTime = echarts.init(document.getElementById('pie-time'));
	                    pieTime.setOption(option);

	                }
	            }
            )
	})();


});


function saveData()
{
		if($("#saveData").attr("class").indexOf("btn-success")!=-1)
		{
			var machineIDFilter = $("#machineIDFilter").val();
			var parameterFilter = $("#parameterFilter").val();
			var datePicker_1 = $("#datePicker_1").val();
			var datePicker_2 = $("#datePicker_2").val();
			var quantity = $("#quantity").val();
			var filter = '{"machineIDFilter":"'+machineIDFilter+'","parameterFilter":"'+parameterFilter+'","datePicker_1":"'+datePicker_1+'","datePicker_2":"'+datePicker_2+'","quantity":"'+quantity+'","saveData":"1"}';
			 $("#saveData").removeClass("btn-success");
		}
		getQualityData("qualityData",filter);
	
}

$(function () {
    //if ($('#datePicker_1').datetimepicker)
    //{
    //    $('#datePicker_1').datetimepicker({
    //        format: 'yyyy-mm-dd hh:ii'
    //    });

    //}

/*	$('#example_1').datetimepicker();
	$('#example_2').timepicker({});*/
	//$('#datePicker_1').datetimepicker({
	//    timeFormat: 'hh:mm'
    //});
	//$('#datePicker_2').datetimepicker({
	//    timeFormat: 'hh:mm'
	//});
	//$('#datePicker_3').datetimepicker({
	//    timeFormat: 'hh:mm'
	//});
	//$('#datePicker_4').datetimepicker({
	//    timeFormat: 'hh:mm'
	//});
	//$('#datePicker_5').datetimepicker({
	//    timeFormat: 'hh:mm'
	//});
	//$('#datePicker_6').datetimepicker({
	//    timeFormat: 'hh:mm'
	//});
/*	$('#example_4').timepicker({
	    ampm: true,
	    hourMin: 8,
	    hourMax: 16
    });
	$('#example_5').datetimepicker({
	   hour: 13,
	   minute: 15
    });
	$('#example_6').datetimepicker({
	   numberOfMonths: 2,
	   minDate: 0,
	   maxDate: 30
    });
	$('#example_7').timepicker({
	   hourGrid: 4,
	   minuteGrid: 10
    });*/

});


function showDlg()
{
        //显示遮盖的层
        var objDeck = document.getElementById("deck");
        if(!objDeck)
        {
            objDeck = document.createElement("div");
            objDeck.id="deck";
            document.body.appendChild(objDeck);
        }
        objDeck.className="showDeck";
        objDeck.style.filter="alpha(opacity=50)";
        objDeck.style.opacity=40/100;
        objDeck.style.MozOpacity=40/100;
        //显示遮盖的层end
        
        //禁用select
        hideOrShowSelect(true);
        
        //改变样式
        document.getElementById('divBox').className='showDlg';
        
        //调整位置至居中
        adjustLocation("divBox");
        
}
function showDlg2() {
    //显示遮盖的层
    var objDeck = document.getElementById("deck");
    if (!objDeck) {
        objDeck = document.createElement("div");
        objDeck.id = "deck";
        document.body.appendChild(objDeck);
    }
    objDeck.className = "showDeck";
    objDeck.style.filter = "alpha(opacity=50)";
    objDeck.style.opacity = 40 / 100;
    objDeck.style.MozOpacity = 40 / 100;
    //显示遮盖的层end

    //禁用select
    hideOrShowSelect(true);

    //改变样式
    document.getElementById('divBox2').className = 'showDlg';

    //调整位置至居中
    adjustLocation("divBox2");

}
    function sendFliter(){
		var machineIDFilter = $("#machineIDFilter").val();
		var parameterFilter = $("#parameterFilter").val();
		var datePicker_1 = $("#datePicker_1").val();
        var datePicker_2 = $("#datePicker_2").val();
		var quantity = $("#quantity").val();
		var filter = '{"machineIDFilter":"'+machineIDFilter+'","parameterFilter":"'+parameterFilter+'","datePicker_1":"'+datePicker_1+'","datePicker_2":"'+datePicker_2+'","quantity":"'+quantity+'"}';

		getQualityData("qualityData",filter);
		        document.getElementById('divBox').className='hideDlg';
        		document.getElementById("deck").className="hideDeck";
            hideOrShowSelect(false);
    }
    //function sendFliter2() {
    //    var machineIDFilter = $("#machineIDFilter1").val();
    //    var parameterFilter = $("#parameterFilter1").val();
    //    var datePicker_1 = $("#datePicker_3").val();
    //    var datePicker_2 = $("#datePicker_4").val();
    //    var quantity = $("#quantity1").val();

    //    var filter = '{"machineIDFilter":"' + machineIDFilter + '","parameterFilter":"' + parameterFilter + '","datePicker_1":"' + datePicker_1 + '","datePicker_2":"' + datePicker_2 + '","quantity":"' + quantity + '"}';


    //    getQualityData("qualityData", filter, 2);
    //    var data3;
    //    var nextStep = 0;
    //    var timer = setInterval(function () {

    //        if (dataRecieved)
    //        {
                
    //            if (!nextStep)
    //            {
    //                nextStep = 1;
    //                machineIDFilter = $("#machineIDFilter2").val();
    //                 parameterFilter = $("#parameterFilter2").val();
    //                 datePicker_1 = $("#datePicker_5").val();
    //                 datePicker_2 = $("#datePicker_6").val();
    //                 quantity = $("#quantity1").val();

    //                 filter = '{"machineIDFilter":"' + machineIDFilter + '","parameterFilter":"' + parameterFilter + '","datePicker_1":"' + datePicker_1 + '","datePicker_2":"' + datePicker_2 + '","quantity":"' + quantity + '"}';
    //                 getQualityData("qualityData", filter, 2);
    //                 dataRecieved = 0;
    //                 data3 = data2;

    //            }
    //            else {

    //                    if (dataRecieved) {

    //                        clearInterval(timer);
    //                        dataRecieved = 0;
    //                        nextStep = 0;
    //                     var statisticData = new Array();
	//					 if(data2.length>=quantity&&data3.length>=quantity)
    //                     for (var i = 0; i < quantity; i++) {
	//						statisticData.push({ no: i.toString(), value: data3[i][mapingTable[$("#parameterFilter1").val()]][1], value2: data2[i][mapingTable[$("#parameterFilter2").val()]][1]});
    //                     }
                         

    //                     $("#area-example").empty();
    //                     Morris.Area({
    //                         element: 'area-example',
    //                         data: statisticData,
    //                         xkey: 'no',
    //                         ykeys: ['value', 'value2'],
    //                         labels: [$("#parameterFilter1").val(), $("#parameterFilter2").val()]
    //                     });
                        

    //                 }

    //            }
                     

                 
    //        }

    //    }, 100);
       
        



    //    document.getElementById('divBox2').className = 'hideDlg';
    //    document.getElementById("deck").className = "hideDeck";
    //    hideOrShowSelect(false);
    //}
    function cancel()
    {
        document.getElementById('divBox').className='hideDlg';
        document.getElementById("deck").className="hideDeck";
        hideOrShowSelect(false);

        document.getElementById('divBox2').className = 'hideDlg';
        document.getElementById("deck").className = "hideDeck";
        hideOrShowSelect(false);
    }
    
    function hideOrShowSelect(v)
    {
        var allselect = document.getElementsByTagName("select");
        for (var i=0; i<allselect.length; i++)
        {
            //allselect[i].style.visibility = (v==true)?"hidden":"visible";
            allselect[i].disabled =(v==true)?"disabled":"";
        }
    }
    
    function adjustLocation(name)
    {
        var obox=document.getElementById(name);
        if (obox !=null && obox.style.display !="none")
        {
            var w=368;
            var h=400;
            var oLeft,oTop;
            
            if (window.innerWidth)
            {
                oLeft=window.pageXOffset+(window.innerWidth-w)/2 +"px";
                oTop=window.pageYOffset+(window.innerHeight-h)/2 +"px";
            }
            else
            {
                var dde=document.documentElement;
                oLeft=dde.scrollLeft+(dde.offsetWidth-w)/2 +"px";
                oTop=dde.scrollTop+(dde.offsetHeight-h)/2 +"px";
            }
            
            obox.style.left=oLeft;
            obox.style.top=oTop;
        }
    }
    
    function changeData(parameter)
    {
        var statisticData = [];
        var series = [];
        var label = [];
        var lineName = ["保压切换","螺杆终点","注射时间","切换压力","机器循环","周期时间","熔胶时间","熔胶终点","最大射压"];
        var j = 0;
        var i = 0;
        for (var j in mapingTable)
        {
            series.push({});
            series[i].name = lineName[i];
            series[i].type = 'line';
            series[i].stack = '总量';
            series[i].areaStyle= {normal: {}},
            series[i].data = [];
	    
            i++;
        }
        i = 0; j = 0;
        for (i = 0 ; i < data.length; i++)
        {
            label[i] = i;
            j = 0;
            for (var key in mapingTable) {

                series[j].data[i] = data[i][mapingTable[key]][1];
                j++;
            }

        }
	    
        // for( i=0;i<filterJson["quantity"];i++)
        //{
	
        //	//statisticData.push({year:data[i]["systemShotCounterAct"][1],value:data[i][mapingTable[filterJson["parameterFilter"]]][1]});
        //	statisticData.push({no:i.toString(),value:data[i][mapingTable[parameter]][1]});
        //}
        //$("#myfirstchart").empty();
			
        ////alert(JSON.stringify(data));
        //	new Morris.Line({
        //			  // ID of the element in which to draw the chart.
        //			  element: 'myfirstchart',
        //			  // Chart data records -- each entry in this array corresponds to a point on
        //			  // the chart.
        //			  data: statisticData,
        //			  // The name of the data record attribute that contains x-values.
        //			  xkey: 'no',
        //			  // A list of names of data record attributes that contain y-values.
        //			  ykeys: ['value'],
        //			  // Labels for the ykeys -- will be displayed when you hover over the
        //			  // chart.
        //			  labels: [filterJson["parameterFilter"]]
        //	});


        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('line-graph'));
        // 指定图表的配置项和数据
        option = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                orient: 'horizontal',
                itemSize: 15,
                itemGap: 10,
                showTitle: true,
                feature:
                    {
                        saveAsImage: {},
                        dataView: {
                            show: true,
                            title: '数据',
                            readOnly: false,
                            lang: ['数据', '关闭', '刷新'],
                            backgroundColor: '#fff',
                            textareaColor: '#fff',
                            textareaBorderColor: '#333',
                            textColor: '#000',
                            buttonColor: '#c23531',
                            buttonTextColor: '#fff'
                        }
                    }
				    },
				    legend: {
				        data: lineName
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: label
                        }
				    ],
				    yAxis: [
                        {
                            type: 'value'
                        }
				    ],
				    series: series
				};


    // 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
	}

function getQualityData(command, filter,option) {
    dataRecieved = 0;
    $.ajax({
        type: "POST",
        url: "http://www.tnet.space/monitor/clamp.aspx",
	   //url: "clamp.aspx",
        data: "command=" +command+"&filter=" +filter,
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
		
        success: function (msg) {
            if (option == 2) {
                
                data2 = eval(msg);
            }
            else {
                data = eval(msg);
                var statisticData = new Array();
                filterJson = JSON.parse(filter);
                if(filterJson.hasOwnProperty("saveData") )
				{
					location.href = "../monitor/quality.xlsx";
				    $("#saveData").addClass("btn-success");

				}
                $('.demo').empty();
                $('.demo').append('<table id="thetable" cellspacing="0" cellpadding="0"><thead><tr><td>产品编号</td><td>工艺名称</td><td>保压切换</td><td>螺杆终点</td><td>注射时间</td><td>切换压力</td><td>机器循环</td><td>周期时间</td><td>熔胶时间</td><td>熔胶终点</td><td>最大射压</td></tr></thead><tbody></tbody></table>');
                for (var i = 0; i < data.length; i++) {
                    var appendData = "<tr><td>" + data[i]["systemShotCounterAct"][1] + "</td>";
                    if ("moldDataName" in data[i])
                        appendData += "<td>" + data[i]["moldDataName"][1] + "</td>";
                    else
                        appendData += "<td>" + "" + "</td>";
                    for (var tmp in mapingTable) {

                        appendData += "<td>" + parseFloat(data[i][mapingTable[tmp]][1]).toFixed(3) + "</td>";
                    }
                    appendData += "</tr>";
                    $('#thetable tbody').append(appendData);

                }
                $('#thetable tr:first-child').addClass("first");
              //  $.fn.tableScroll({ "width": 850, "height": 150 });

                changeData(filterJson["parameterFilter"]);
  
            }
			dataRecieved = 1;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }

    });

}// JavaScript Document


