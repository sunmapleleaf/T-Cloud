// 产生机器overview

var dataForFilter;
var filterMode = "filterByConnective";
var filterWord = "";
var option = 0;

var quantityPerPage = 3;
var quantityPerPageOfList = 20;
//用于大块显示时的每页个数、每列个数、列数
var quantityPerPageOfLarge = 3;
var quantityPerRow = 3;
var column = 1;

//页码
var pageNum = 1;

//显示模式 1：块显示，2列表显示
var showMode = 2;


var machineStatusStatistics = { workingCount: "", notworkCount: "", alarmCount: "", machineOffCount: "", connectiveCount: "", allCount: "" };

window.onload = function () {

    //算出每行个数，列数
    quantityPerRow = parseInt((winWidth * 0.8 - 320) / 330 + 1);


    column = parseInt((winHeight - 416) / 260);
    if (quantityPerRow < 3) quantityPerRow = 3;
    if (column < 1) column = 1;
    quantityPerPageOfLarge = parseInt((column+3) * quantityPerRow);

    var histogram = echarts.init(document.getElementById('histogram'));
    histogram.hideLoading();

    showMachineOverview(1);

    // getDataWithPost(userID,filterMode,filterWord,2) ;


}


$(document).ready(function () {
    //	if(!getCookie("loginFirst"))
    //		showDlg();
    // var timer = setInterval(function () { getDataWithPost(userID,filterMode, filterWord, option=showMode) }, 1000);
    $('.content').on("click", "#machine-overview .td-width", function () {

        if ($(this).html())
            location.href = 'http://' + location.host + '/monitor/machine.html?machineID=' + $($(this).find(' li')).text();
    });
    $('.content').on("click", ".detail table tr:nth-child(n+2)", function () {
        if ($('td:nth-child(3)', this).text())
            location.href = 'http://' + location.host + '/monitor/machine.html?machineID=' + $('td:nth-child(3)', this).text();
    });
    $(".filter-bar").after('<div class="info-list" style="display:none"><ul class="info-list-text bar-background"><li><i class="icon-th-large"></i></li><ul class="showSelect"><li>5</li><li>10</li><li class="active">20</li></ul><li><div class="search"><input type="text" name="searchIpt" value=""/></div></li></ul><ul class="detail"><table></table><div><ul></ul>');
    $(".filter-bar").after('<div id="machine-overview" style="display:none" ><table></table><ul id="pageNum"></ul>');
    $($('.filter-bar  li')[1]).click(function () {
        $('.filter-bar  li').removeClass("active");
        $($('.filter-bar  li')[1]).addClass("active");
        filterMode = "filterByConnective";
        getDataWithPost(userID, filterMode);
    });
    $($('.filter-bar  li')[2]).click(function () {
        $('.filter-bar  li').removeClass("active");
        $($('.filter-bar  li')[2]).addClass("active");
        filterMode = "filterByDisconnected";
        getDataWithPost(userID, filterMode);
    });
    $($('.filter-bar  li')[3]).click(function () {
        $('.filter-bar  li').removeClass("active");
        $($('.filter-bar  li')[3]).addClass("active");
        filterMode = "filterByAlarm";
        getDataWithPost(userID, filterMode);
    });
    $($('input[name=searchIpt]')).change(function () {
        filterMode = "filterByConnective";
        filterWord = $($('input[name=searchIpt]')).val();
        getDataWithPost(userID, filterMode, filterWord);
    });
    $("#divBox").on("click", "#validateNumID", function () {
        $("#validateNumID").attr("src", "../ValidateNum.aspx?rnd=" + Math.random());



    });
    $("#divBox").on("change", "#validateNum", function () {

        //   sendNumber();

    });
    $("#myModal").on("change", "#validateNum", function () {

        // sendNumber();

    });



    $(".content").on("click", ".icon-th-list", function () {
        showMode = 2;
        quantityPerPage = quantityPerPageOfList;
        pageNum = 1;
        $(".filter-bar").fadeOut("fast");
        $("#machine-overview").fadeOut("fast", function () {
            $(".info-list").fadeIn("fast");
            getDataWithPost(userID, filterMode, filterWord, 2);

        });
    });


    $(".content").on("click", ".icon-th-large", function () {
        showMode = 1;
        quantityPerPage = quantityPerPageOfLarge;
        pageNum = 1;

        $(".info-list").fadeOut("fast", function () {
            $(".filter-bar").fadeIn("fast");
            $("#machine-overview").fadeIn("fast");
            if ($("#machine-overview table").html())
                getDataWithPost(userID, filterMode, filterWord, 1);
            else getDataWithPost(userID, filterMode, filterWord, 0);

        });

    });
    $($('.detail ul')).on("click", "span", function () {
        if ($(this).html().indexOf("前一页") != -1) {
            pageNum = parseInt($(".detail ul .active").html()) - 1;
            getDataWithPost(userID, filterMode, filterWord, 2);
        }
        else if ($(this).html().indexOf("后一页") != -1) {
            pageNum = parseInt($(".detail ul .active").html()) + 1;
            getDataWithPost(userID, filterMode, filterWord, 2);
        }
        else {
            pageNum = parseInt($(this).html());
            getDataWithPost(userID, filterMode, filterWord, 2);

        }

    });

    $($('.detail table')).on("click", "tr:first-child td", function () {
        var filterDic = { "报警": "filterByAlarm", "机器编号": "machineID", "订单号": "filterByOrderID", "产品名称": "moldDataName", "产品数量": "productCounterAct", "循环周期": "lastCycleTime", "控制器": "controllerType", "状态": "filterByConnective" };
        getDataWithPost(userID, filterDic[$(this).text()], filterWord, 2);


    });

    $($('#machine-overview #pageNum')).on("click", "span", function () {
        if ($(this).html().indexOf("前一页") != -1) {
            pageNum = parseInt($("#machine-overview #pageNum .active").html()) - 1;
            getDataWithPost(userID, filterMode, filterWord, 0);
        }
        else if ($(this).html().indexOf("后一页") != -1) {
            pageNum = parseInt($("#machine-overview #pageNum .active").html()) + 1;
            getDataWithPost(userID, filterMode, filterWord, 0);
        }
        else {
            pageNum = parseInt($(this).html());
            getDataWithPost(userID, filterMode, filterWord, 0);

        }



    });
    $('.info-list-text .showSelect li').click(function () {
        quantityPerPage = $(this).html();
        quantityPerPageOfList = quantityPerPage;
        $('.info-list-text .showSelect li').removeClass("active");
        $(this).addClass("active");
        getDataWithPost(userID, filterMode, filterWord, 2);
    });

    $("#btnModal").click(function () {
        $("#validateNumID").attr("src", "../ValidateNum.aspx?rnd=" + Math.random());


    });

});

function showMachineOverview(showMode) {
    if (showMode == 1) {
        quantityPerPage = quantityPerPageOfLarge;
        $(".filter-bar").fadeIn("fast");
        $("#machine-overview").fadeIn("fast");
        setInterval(function () {
            if ($("#machine-overview table").html())
                getDataWithPost(userID, filterMode, filterWord, 1);
            else
                getDataWithPost(userID, filterMode, filterWord, 0);
        }, 3000);


    }
    else {
        quantityPerPage = quantityPerPageOfList;
        $(".filter-bar").fadeOut("fast");
        $(".info-list").fadeIn("fast");
        getDataWithPost(userID, filterMode, filterWord, 2);

    }


}
var overviewHTML = '<div class="overview-index"><div class="above"><ul><li class="circle"></li><li></li></ul></div><div class="cutoff"><li class="cutoffLine"></li></div><div class="below color-tederic-gray"><div class="info"><table><tr><td><div>订单号：</div></td><td><div></div></td></tr><tr><td><div>产品名称：</div></td><td><div id="productName"></div></td></tr><tr><td><div>产品数量：</div></td><td><div id="productQuantity"></div></td></tr><tr><td><div>循环周期：</div></td><td><div id="periodicTime"></div></td></tr><tr><td><div>控制器：</div></td><td><div></div></td></tr><tr><td><div>状态：</div></td><td><div class="connStatus"></div></td></tr></table></div><div class="line" style="width:80px;height:120px;float:left;margin-top:20px"> </div></div></div>';


function getDataWithPost(userID, filterMode, filterWord, option) {
    $.ajax({
        type: "POST",
        url: "http://www.tnet.space/monitor/clamp.aspx",
        data: "MachineID=all" + "&UnitID=overview" + "&userID=" + userID,
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (data) {
            //console.log(option);
            var key;
            //运行
            var keyArrConnectiveNotAlarm = new Array();
            //断开
            var keyArrDisconnected = new Array();
            //报警
            var keyArrAlarm = new Array();
            //排序后所有KEY
            var keyArr = new Array();
            //筛选后KEY
            var keyForSorting = new Array();

            for (key in data) {
                if (!("connStatus" in data[key]) || data[key]["connStatus"] == 1) {
                    if ("alarm" in data[key]) {
                        if (data[key]["alarm"][1] > 0) {
                            keyArrAlarm.push(key);
                        }
                        else
                            keyArrConnectiveNotAlarm.push(key);
                    }


                }
                else
                    keyArrDisconnected.push(key);
                keyForSorting.push(key);
            }
            keyArrAlarm = keyArrAlarm.sort();
            keyArrConnectiveNotAlarm = keyArrConnectiveNotAlarm.sort();
            keyArrDisconnected = keyArrDisconnected.sort();
            if (filterMode == "filterByConnective")
                keyArr = ((keyArr.concat(keyArrConnectiveNotAlarm)).concat(keyArrAlarm)).concat(keyArrDisconnected);
            else if (filterMode == "filterByDisconnected") {
                keyArr = ((keyArr.concat(keyArrDisconnected)).concat(keyArrConnectiveNotAlarm)).concat(keyArrAlarm);
            }
            else if (filterMode == "filterByAlarm")
                keyArr = ((keyArr.concat(keyArrAlarm)).concat(keyArrDisconnected)).concat(keyArrConnectiveNotAlarm);
            else if (filterMode != null) {

                keyForSorting.sort(compare(data, filterMode));
                keyArr = keyForSorting;
            }
            else {
                keyArr = ((keyArr.concat(keyArrConnectiveNotAlarm)).concat(keyArrAlarm)).concat(keyArrDisconnected);
            }
            if (!!filterWord) {

                var arrTmp = new Array();
                for (var index in keyArr)
                    arrTmp[index] = keyArr[index];
                keyArr.splice(0, keyArr.length);

                for (var index in arrTmp) {
                    if (arrTmp[index].indexOf(filterWord) != -1) {
                        keyArr.push(arrTmp[index]);
                    }
                }
            }


            //图标统计

            //运行机器数量
            var workingCount = keyArrConnectiveNotAlarm.length;
            //空闲机器数量
            var notworkCount = 0;
            //报警机器数量
            var alarmCount = keyArrAlarm.length;
            //断开机器数量
            var machineOffCount = keyArrDisconnected.length;

            //连接机器数量数量
            var connectiveCount = keyArrConnectiveNotAlarm.length + keyArrAlarm.length;
            //机器总数
            var allCount = keyArr.length;


            machineStatusStatistics.alarmCount = alarmCount;
            machineStatusStatistics.allCount = allCount;
            machineStatusStatistics.connectiveCount = connectiveCount;
            machineStatusStatistics.machineOffCount = machineOffCount;
            machineStatusStatistics.notworkCount = notworkCount;
            if (!option) {
                var echartsOption = {
                    title: {
                        text: '所有机器状态统计（单位:台）',
                        subtext: 'From ExcelHome',
                        // sublink: 'http://e.weibo.com/1341556070/AjQH99che'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function (params) {
                            var tar = params[0];
                            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                        }
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
                            splitLine: { show: false },
                            data: ['总机器数', '离线', '报警', '生产', '空闲', '在线数']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '辅助',
                            type: 'bar',
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(0,0,0,0)'
                                },
                                emphasis: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(0,0,0,0)'
                                }
                            },
                            data: [0, allCount - machineOffCount, notworkCount + workingCount, notworkCount, 0, 0]
                        },
                        {
                            name: '生活费',
                            type: 'bar',
                            stack: '总量',
                            itemStyle: { normal: { label: { show: true, position: 'inside' } } },
                            data: [allCount, machineOffCount, alarmCount, workingCount, notworkCount, connectiveCount]
                            //   data: [20, 10, 1, 5, 4, 10]
                        }
                    ]
                };
                var histogram = echarts.init(document.getElementById('histogram'));
                histogram.setOption(echartsOption, true);

                var echartsOptionPie = {
                    title: {
                        text: '机器状态',
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['离线', '报警', '工作', '空闲']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                { value: machineOffCount, name: '离线' },
                                { value: alarmCount, name: '报警' },
                                { value: workingCount, name: '工作' },
                                { value: notworkCount, name: '空闲' },
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                var pie = echarts.init(document.getElementById('pie'));
                pie.setOption(echartsOptionPie, true);

            }
 


            $($(".outlineRight table td:nth-child(2)")[0]).text(keyArr.length);
            $($(".outlineRight table td:nth-child(2)")[1]).text(keyArrDisconnected.length);
            $($(".outlineRight table td:nth-child(2)")[2]).text(keyArrConnectiveNotAlarm.length + keyArrAlarm.length);
            $($(".outlineRight table td:nth-child(5)")[2]).text(keyArrAlarm.length);
            $($(".outlineRight table td:nth-child(5)")[3]).text(keyArrConnectiveNotAlarm.length);
            $($(".outlineRight table td:nth-child(5)")[4]).text('');
            if (option == 2) {
                creatList(keyArr, data, pageNum, quantityPerPage);
            }
            else
                createLarge(keyArr, data, pageNum, quantityPerPage, option);




        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {


        }

    });

}
function compare(data, filterMode) {
    return function (key1, key2) {
        var value1 = key1;
        var value2 = key2;
        if (filterMode == "machineID") {
            value1 = key1;
            value2 = key2;
        }
        else if (filterMode == "controllerType") {

            if (filterMode in data[key1])
                value1 = data[key1][filterMode];
            else
                value1 = null;
            if (filterMode in data[key2])
                value2 = data[key2][filterMode];
            else
                value2 = null;
        }
        else {
            if (filterMode in data[key1]) {
                value1 = data[key1][filterMode][1];
            }
            else
                value1 = null;
            if (filterMode in data[key2]) {
                value2 = data[key2][filterMode][1];

            }
            else
                value2 = null;
            //alert(value1+" "+value2);
        }
        if (value1) value1 = value1.trim();
        if (value2) value2 = value2.trim();
        if (value1 > value2 || (value1 != null && value2 == null)) return -1;
        else if (value1 < value2 || (value1 == null && value2 != null)) return 1;
        else return 0;
    }
}
var chartOption = {                                                    //设置表盘样式
    tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        show: false,
        feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    series: [
        {
            name: '完成指标',
            type: 'gauge',
            radius: '100%',
            axisLine: {
                show: false,
                width: 20,
                lineStyle: {
                    width: 8,
                },
            },
            splitLine: {
                show: true,
                length: 8,
                lineStyle: {
                    width: 2,
                    type: 'solid',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                },
            },
            axisTick: {
                show: false,
                splitNumber: 3,
                length: 5,
                lineStyle: {
                    width: 1,
                    type: 'solid',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                },
            },
            axisLabel: {
                show: false,
            },
            title: {
                show: true,
                offsetCenter: [0, '-130%'],
                textStyle: {
                    color: 'white',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: '黑体,sans-serief',
                    fontSize: 16,
                },
            },

            pointer: {
                show: true,
                length: '70%',
                width: 4,
            },
            detail: {
                show: true,
                width: 25,
                height: 10,
                backgroundColor: 'transparent',
                borderWidth: 0,
                borderColor: '#0',
                offsetCenter: [0, '80%'],
                formatter: '{value}%',
                textStyle: {
                    color: 'auto',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: '黑体,sans-serief',
                    fontSize: 16,
                },
            },

            data: [{ value: 50, name: '完成率' }]
        }
    ]
};
function createLarge(keyArr, data, pageNum, quantityPerPage, option) {
    var i = 0;
    var length = keyArr.length;
    if (!option) {
 

    }
 
    if (pageNum > Math.ceil(length / quantityPerPage) || pageNum < 1) return;
    if (!option) {
        $("#machine-overview table").empty();
        var appendStr = "";
        if (location.href.indexOf("mobile") == -1) {
            for (var j = 0; j < quantityPerPage && j < length; j++) {
                if (pageNum == Math.ceil(length / quantityPerPage) && j >= (length % quantityPerPage) && length % quantityPerPage) break;
                var num = j + 1;
                if (j == 0)
                    appendStr = '<tr><td class="td-width"></td>';
                else if (j % quantityPerRow == 0)
                    appendStr += '</tr><td class="td-width"></td>';
                else
                    appendStr += '<td class="td-width"></td>';

            }
            appendStr += '</tr>';
            $("#machine-overview  table").append(appendStr);

            $("#machine-overview #pageNum").empty();
            $("#machine-overview #pageNum").append('<li><span >←前一页</span></li><li><span>后一页 →</span></li>');
            for (var j = 0; j < Math.ceil(length / quantityPerPage) ; j++) {
                var num = j + 1;
                $("#machine-overview #pageNum li:last-child").before('<li><span>' + num + '</span></li>')

            }
        }
        else {
            for (var j = 0; j < length; j++) {

                $("#machine-overview  table").append('<tr><td class="td-width"></td></tr>');
            }

        }


    }
    $($("#machine-overview #pageNum li span")[pageNum]).addClass("active");

    $("#machine-overview .td-width").each(function (index, element) {
        var key = keyArr[(pageNum - 1) * quantityPerPage + index];

        var process = 0;
        if (!option) {
            $($('#machine-overview  .td-width')[index]).append(overviewHTML);
        }

        $($($('#machine-overview .td-width')[index]).find(' li')[1]).text(key);             //machineID  

        if ('alarm' in data[key]) {
            if (data[key]["alarm"][1] > 0) {
                $($($('#machine-overview .td-width')[index]).find('.circle')).css("background-color", "red");
            }
            else {
                $($($('#machine-overview .td-width')[index]).find('.circle')).css("background-color", "white");
            }

        }
        //$($($('#machine-overview .td-width')[index]).find(' table div')[1]).text("test"+index); //订单号
        if ("moldDataName" in data[key])
            $($($('#machine-overview .td-width')[index]).find(' table div')[3]).text(data[key]["moldDataName"][1]); //产品名称

        if ("productCounterAct" in data[key] && "productCounterSet" in data[key]) {
            var quantityMax = data[key]["productCounterSet"][1];
            if (data[key]["productCounterAct"][1] > quantityMax)
                quantityMax = 999999;
            $($($('#machine-overview .td-width')[index]).find(' table div')[5]).text(data[key]["productCounterAct"][1] + '/' + quantityMax); //产品数量
            if (quantityMax == 0) process = 0;
            else
                process = parseFloat(data[key]["productCounterAct"][1] * 100 / quantityMax).toFixed(1);

        }
        if ("lastCycleTime" in data[key])
            $($($('#machine-overview .td-width')[index]).find(' table div')[7]).text(data[key]["lastCycleTime"][1]); //循环周期
        if ("controllerType" in data[key])
            $($($('#machine-overview .td-width')[index]).find(' table div')[9]).text(data[key]["controllerType"]); //控制器
        if ("connStatus" in data[key]) {

            if (data[key]["connStatus"] == 1) {
                $($($('#machine-overview .td-width')[index]).find('.above')).css("background-color", "#015097");
                $($($('#machine-overview .td-width')[index]).find('.below')).css("background-color", "#015097");
                $($($('#machine-overview .td-width')[index]).find('.cutoff')).css("background-color", "#015097");
                $($($('#machine-overview .td-width')[index]).find('.cutoffLine')).css("background-color", "#015097");
            }
            else {
                $($($('#machine-overview .td-width')[index]).find('.above')).css("background-color", "#bfbfbf");
                $($($('#machine-overview .td-width')[index]).find('.below')).css("background-color", "#bfbfbf");
                $($($('#machine-overview .td-width')[index]).find('.cutoff')).css("background-color", "#bfbfbf");
                $($($('#machine-overview .td-width')[index]).find('.cutoffLine')).css("background-color", "#bfbfbf");
                $($($('#machine-overview .td-width')[index]).find('.circle')).css("background-color", "#7f7f7f");

            }
            $($($('#machine-overview .td-width')[index]).find(' table div')[11]).text(data[key]["connStatus"]);//状态
        }
      //  if (!option)
        {
            var myChart1 = echarts.init($('.line')[index]);
            chartOption.series[0].data[0].value = process || 0;
            myChart1.setOption(chartOption, true);
        }


        $($($('#machine-overview .td-width')[index]).find('canvas')).text(process + "%");
        index++;

    });






}
function creatList(keyArr, data, pageNum, quantityPerPage) {
    var length = keyArr.length;
    if (pageNum > Math.ceil(length / quantityPerPage) || pageNum < 1) return;

    $(".detail table").empty();
    $(".detail table").append('<tr><td><div>序号</div></td><td><div>报警</div></td><td><div>机器编号</div></td><td><div>订单号</div></td><td><div>产品名称</div></td><td><div>产品数量</div></td><td><div>循环周期</div></td><td><div>控制器</div></td><td><div>状态</div></td></tr>');
    for (var i = 0; i < quantityPerPage && i < length; i++) {
        if (pageNum == Math.ceil(length / quantityPerPage) && i >= (length % quantityPerPage) && length % quantityPerPage) break;
        var num = i + 1;
        $(".detail table").append('<tr><td><div>' + num + '</div></td><td><div><li class="circle"><li></div></td><td><div></div></td><td><div></div></td><td><div></div></td><td><div></div></td><td><div></div></td><td><div></div></td><td><div></div></td></tr>');

    }
    $(".detail ul").empty();
    $(".detail ul").append('<li><span >←前一页</span></li><li><span>后一页 →</span></li>');
    for (var i = 0; i < Math.ceil(length / quantityPerPage) ; i++) {
        var num = i + 1;
        $(".detail ul li:last-child").before('<li><span>' + num + '</span></li>')

    }

    $(".detail table tr").each(function (index, element) {

        if (index) {
            var key = keyArr[(pageNum - 1) * quantityPerPage + index - 1];

            if ("alarm" in data[key]) {

                if (data[key]["alarm"][1] > 0 || data[key]["alarm"][1] == null) {
                    $($('.detail .circle')[index - 1]).css("background-color", "red");
                }
                else {
                    $($('.detail .circle')[index - 1]).css("background-color", "#5bb75b");
                }


            }
            else {

                $($('.detail .circle')[index - 1]).css("background-color", "#7f7f7f");
            }
            $($($(this).children("td")[2]).children("div")).text(key);
            if ("moldDataName" in data[key])
                $($($(this).children("td")[4]).children("div")).text(data[key]["moldDataName"][1]);
            if ("productCounterAct" in data[key])
                $($($(this).children("td")[5]).children("div")).text(data[key]["productCounterAct"][1]);
            if ("lastCycleTime" in data[key])
                $($($(this).children("td")[6]).children("div")).text(data[key]["lastCycleTime"][1]);
            if ("controllerType" in data[key])
                $($($(this).children("td")[7]).children("div")).text(data[key]["controllerType"]);
            if ("moldDataName" in data[key])
                $($($(this).children("td")[8]).children("div")).text(data[key]["moldDataName"][1]);
            if ("connStatus" in data[key]) {

                if (data[key]["connStatus"] == 1) {
                    $($($(this).children("td")[8]).children("div")).text("连接");
                }
                else {
                    $($($(this).children("td")[8]).children("div")).text("断开");
                    $($('.detail .circle')[index - 1]).css("background-color", "#7f7f7f");
                }
            }
        }
    });
    $($(".detail ul li span")[pageNum]).addClass("active");


}


function showDlg() {
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
    document.getElementById('divBox').className = 'showDlg';

    //调整位置至居中
    adjustLocation();

}

function cancel() {
    document.getElementById('divBox').className = 'hideDlg';
    document.getElementById("deck").className = "hideDeck";
    hideOrShowSelect(false);
}
function sendNumber() {
    var messageData = { "param1": "999", "param2": "20", "param3": "100", "param4": "111" };
    messageData.param1 = machineStatusStatistics.allCount;
    messageData.param2 = machineStatusStatistics.connectiveCount;
    messageData.param3 = machineStatusStatistics.alarmCount;
    messageData.param4 = machineStatusStatistics.machineOffCount;
    if ($("#validateNum").val().toLowerCase() == getCookie("validateNum").toLowerCase()) {
        var telephone = $("#telephone").val();
        $.ajax({
            type: "POST",
            url: "clamp.aspx",
            data: 'message=shortMessage&userID=' + telephone + '&messageData=' + JSON.stringify(messageData),
            dataType: "json",
            success: function (data) {
                alert(JSON.stringify(data));

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }
        });
    }
    else {
        alert("验证码错误！");
        $("#validateNumID").attr("src", "../ValidateNum.aspx?rnd=" + Math.random());
    }
    //setCookie("loginFirst","1",0.1);










}

function post(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        // alert(opt.name)        
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}
$(document).ready(function () {
    //var temp = post('https://oauth.api.189.cn/emp/oauth2/v3/access_token', { grant_type:'client_credentials',app_id:'242559790000249986',app_secret:'bb864c1b918bb9ff0cb83a3cf3afff6e' });
    //alert(temp.access_token);
    //var params = { grant_type: 'client_credentials', app_id: '242559790000249986', app_secret: 'bb864c1b918bb9ff0cb83a3cf3afff6e' };



})


function hideOrShowSelect(v) {
    var allselect = document.getElementsByTagName("select");
    for (var i = 0; i < allselect.length; i++) {
        //allselect[i].style.visibility = (v==true)?"hidden":"visible";
        allselect[i].disabled = (v == true) ? "disabled" : "";
    }
}

function adjustLocation() {
    var obox = document.getElementById('divBox');
    if (obox != null && obox.style.display != "none") {
        var w = 368;
        var h = 400;
        var oLeft, oTop;

        if (window.innerWidth) {
            oLeft = window.pageXOffset + (window.innerWidth - w) / 2 + "px";
            oTop = window.pageYOffset + (window.innerHeight - h) / 2 + "px";
        }
        else {
            var dde = document.documentElement;
            oLeft = dde.scrollLeft + (dde.offsetWidth - w) / 2 + "px";
            oTop = dde.scrollTop + (dde.offsetHeight - h) / 2 + "px";
        }

        obox.style.left = oLeft;
        obox.style.top = oTop;
    }
}
