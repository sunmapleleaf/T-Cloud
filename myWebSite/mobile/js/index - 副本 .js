

// 产生机器overview

var dataForFilter;
var filterMode = "filterByConnective";
var filterWord = "";
var option = 0;
var machineID;

var quantityPerPage = 3;
var pageNum = 1;
var showMode = 2;
window.onload = function () {
    //初始化以及事件处理
        //userID = getCookie('userID');
        //if (userID == null)
        //    location.href = "../login.aspx?goto=index";
        //$("#userID").text(userID);
        $(".filter-bar").after('<div id="machine-overview"><a href="#router2"><table></table></a></div>');
        getDataWithPost(userID, filterMode, filterWord, 0);
       // showMachineOverview(1);
        $('.content').on("click", "#machine-overview .td-width", function () {
            if ($(this).html())
            {
                machineID = $($(this).find(' li')).text();
                ($('#router2 .title')).text(machineID);
                (function () {
                    var h = document.getElementById('myChart');
                    h.style.width = document.body.clientWidth  + "px";
                    h.style.height = document.body.clientHeight - 50 + "px";
                    var myChart = echarts.init(document.getElementById('myChart'));
                    var categoryName = { '监控': 'clamp', '模具': 'clamp', '顶针': 'ejector', '注射': 'injection', '中子': 'core', '座台': 'carriage', '温度': 'temperature', '报警': '', '统计': 'analysis', '质量': 'analysis', '机器使用': 'analysisUsage', '机器状态': 'analysisStatus', '机器异常': 'analysisAlarm' };
                    myChart.showLoading();


                    $.get('machine.xml', function (xml) {
                        myChart.hideLoading();
                        var graph = echarts.dataTool.gexf.parse(xml);
                        console.log(JSON.stringify(graph.nodes));
                        var categories = [{ name: "监控" }, { name: "统计" }, { name: "机器信息" }];
                        graph.nodes.forEach(function (node) {
                            node.itemStyle = null;
                            node.value = node.symbolSize;
                            node.label.normal.show = node.symbolSize > 30;
                            node.category = node.attributes.modularity_class;
                        });
                        option = {
                            title: {
                                text: '',
                                subtext: 'Tederic',
                                top: 'bottom',
                                left: 'right'
                            },
                            tooltip: {
                                formatter: function (params, ticket, callback) {
                                    if (params.name.indexOf('-') == -1)
                                        return params.name;
                                    return '';
                                }

                            },
                            legend: [{
                                // selectedMode: 'single',
                                left: 'left',
                                top: 'top',
                                data: categories.map(function (a) {
                                    return a.name;
                                })
                            }],
                            animationDuration: 1500,
                            animationEasingUpdate: 'quinticInOut',

                            series: [
                                {
                                    name: 'DH001-001',
                                    type: 'graph',
                                    layout: 'none',
                                    top: '5%',
                                    bottom: '5%',
                                    data: graph.nodes,
                                    links: graph.links,
                                    categories: categories,
                                    roam: true,
                                    force: {
                                        initLayout: 'circular',
                                        repulsion: 50,
                                        gravity: 0.01,
                                        edgeLength: 30,
                                        layoutAnimation: true,
                                    },
                                    label: {
                                        normal: {
                                            position: 'right',
                                            formatter: ' '
                                        }
                                    },
                                    lineStyle: {
                                        normal: {
                                            curveness: 0.3
                                        }
                                    }
                                }
                            ]
                        };

                        option.title['subtext'] = machineID;
                        myChart.setOption(option);

                        myChart.on("click", function (param) {
                            if (param['name'] in categoryName) {
                                $.router.load("#" + categoryName[param['name']]);

                            }
                            //document.location = categoryName[param['name']] + ".html?machineID=" + mahineID;

                        })


                    }, 'xml');

                })(this);

            }
        });


        search.onchange = function () {
            //var search = document.getElementById('search');
            filterWord = search.value;
            filterMode = "filterByConnective";
            getDataWithPost(userID, filterMode, filterWord, 0);
        };
    
    //统计总机器状态
    (function () {

        var categoryName = { '监控': 'clamp', '模具': 'clamp', '顶针': 'ejector', '注射': 'injection', '中子': 'core', '座台': 'carriage', '温度': 'temperature', '报警': '', '统计': 'analysis', '质量': 'analysis', '机器使用': 'analysisUsage', '机器状态': 'analysisStatus', '机器异常': 'analysisAlarm' };

        var option = {
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
                    data: [0, 10, 9, 4, 0, 0]
                },
                {
                    name: '生活费',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: { normal: { label: { show: true, position: 'inside' } } },
                    data: [20, 10, 1, 5, 4, 10]
                }
            ]
        };
        var h = document.getElementById('histogram');
        h.style.width = document.body.clientWidth - 50 + "px";
        var histogram = echarts.init(document.getElementById('histogram'));
        histogram.setOption(option, true);

  

    })(this);
    //进入单台机器功能页
    
 

}

//浏览器判断
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        alert('http://' + location.host + '/mobile/index.html');
        window.location.replace('http://' + location.host + '/mobile/index.html');
    }
}



function showMachineOverview(showMode) {
    if (showMode == 1) {
        $(".filter-bar").fadeIn("fast");
        $("#machine-overview").fadeIn("fast");
        if ($("#machine-overview table").html())
            getDataWithPost(userID, filterMode, filterWord, 1);
        else
            getDataWithPost(userID, filterMode, filterWord, 0);

    }
    else {
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

            var key;
            var keyArrConnectiveNotAlarm = new Array();
            var keyArrDisconnected = new Array();
            var keyArrAlarm = new Array();
            var keyArr = new Array();
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
function createLarge(keyArr, data, pageNum, quantityPerPage, option) {
    var i = 0;
    var length = keyArr.length;
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
                else if (j % 3 == 0)
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

    $("#machine-overview .td-width").each(function (index, element)
    {
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
                quantityMax = 99999;
            $($($('#machine-overview .td-width')[index]).find(' table div')[5]).text(data[key]["productCounterAct"][1] + '/' + quantityMax); //产品数量
            process = parseFloat(data[key]["productCounterAct"][1] * 100 / quantityMax).toFixed(1);

        }
        if ("lastCycleTime" in data[key])
            $($($('#machine-overview .td-width')[index]).find(' table div')[7]).text(data[key]["lastCycleTime"][1]); //循环周期
        if ("controllerType" in data[key])
            $($($('#machine-overview .td-width')[index]).find(' table div')[9]).text(data[key]["controllerType"]); //控制器
        if ("connStatus" in data[key]) {
            if (data[key]["connStatus"] != $($($('#machine-overview .td-width')[index]).find(' table div')[11]).text() && option) {
                drawPie();

            }
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
         var myChart1 = echarts.init($('.line')[index]);

        chartOption.series[0].data[0].value = process;
        myChart1.setOption(chartOption, true);


        $($($('#machine-overview .td-width')[index]).find('canvas')).text(process + "%");
        index++;

    });

    if (!option)
        drawPie();





}





