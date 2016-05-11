

// 产生机器overview

var dataForFilter;
var filterMode = "filterByConnective";
var filterWord = "";
var option = 0;
var machineID;
var overviewHTML = '<div class="overview-index"><div class="above"><ul><li class="circle"></li><li></li></ul></div><div class="cutoff"><li class="cutoffLine"></li></div><div class="below color-tederic-gray"><div class="info"><table><tr><td><div>订单号：</div></td><td><div></div></td></tr><tr><td><div>产品名称：</div></td><td><div id="productName"></div></td></tr><tr><td><div>产品数量：</div></td><td><div id="productQuantity"></div></td></tr><tr><td><div>循环周期：</div></td><td><div id="periodicTime"></div></td></tr><tr><td><div>控制器：</div></td><td><div></div></td></tr><tr><td><div>状态：</div></td><td><div class="connStatus"></div></td></tr></table></div><div class="line" style="width:80px;height:120px;float:left;margin-top:20px"> </div></div></div>';

var quantityPerPage = 3;
var pageNum = 1;
var showMode = 2;
var controllerType = "keba";
//all connections param
var allConns;


//sina
$(function () {
    function b() {
        if ($(".j_wrapper").length > 0) {
            var c = $(".j_wrapper").length;
            $(".j_wrapper").each(function () {
                var i = $(this),
					f = i.find(".j_scroller"),
					k = f.find("li"),
					h = k.length * (k.css("width")).substring(0, k.css("width").length-2),
					g = k.height(),
					e = i.parent().find(".btn_l"),
					j = i.parent().find(".btn_r");
                if (k.length > 2) {
                    i.attr("id", "wrapper" + new Date().getTime());
                    k.css("width", (k.css("width")).substring(0, k.css("width").length - 2));
                    //f.css("width", h).css("height", g);
                    //i.css("height", g);
                    var d = new iScroll(i.attr("id"), {
                        hScroll: true,
                        vScroll: true,
                        hScrollbar: false,
                        bounce: true,
                        momentnum: true,
                        lockDirection: false,
                        onScrollMove: function () {
                            if (!(e.hasClass("end") && j.hasClass("end"))) {
                                var l = f[0].style.WebkitTransform;
                                var m = parseInt(l.substring(10, l.indexOf("p")));
                                if (m >= -20) {
                                    i.addClass("shadow_r").removeClass("shadow_l");
                                    e.addClass("end");
                                    j.removeClass("end")
                                }
                                if (m <= -h + i.width() + 20) {
                                    i.addClass("shadow_l").removeClass("shadow_r");
                                    e.removeClass("end");
                                    j.addClass("end")
                                }
                            }
                        },
                        onScrollEnd: function () {
                            if (!(e.hasClass("end") && j.hasClass("end"))) {
                                var l = f[0].style.WebkitTransform;
                                var m = parseInt(l.substring(10, l.indexOf("p")));
                                if (m >= -20) {
                                    i.addClass("shadow_r").removeClass("shadow_l");
                                    e.addClass("end");
                                    j.removeClass("end")
                                }
                                if (m <= -h + i.width() + 20) {
                                    i.addClass("shadow_l").removeClass("shadow_r");
                                    e.removeClass("end");
                                    j.addClass("end")
                                }
                            }
                        }
                    });
                    e.on("click tap", function () {
                        if (!e.hasClass("end")) {
                            d.scrollTo(-parseInt(k.width()), 0, 100, true)
                        }
                    });
                    j.on("click tap", function () {
                        if (!j.hasClass("end")) {
                            d.scrollTo(parseInt(k.width()), 0, 100, true)
                        }
                    })
                }
            })
        }
    }
    function a() {
        $(".j_teamTabs span").on("click tap", function () {
            var d = $(this),
				c = d.index(),
				e = d.parent().find("span"),
				f = d.parent().next().find(".j_teamLineup");
            if (!d.hasClass("cur")) {
                e.removeClass("cur");
                f.addClass("hide");
                e.eq(c).addClass("cur");
                f.eq(c).removeClass("hide")
            }
        })
    }
    //a();
    //b();
    setTimeout(function () {
        a();
        b()
    }, 1000)
});





window.onload = function () {
    //初始化以及事件处理
        //userID = getCookie('userID');
        //if (userID == null)
        //    location.href = "../login.aspx?goto=index";
        //jQuery("#userID").text(userID);
        jQuery(".filter-bar").after('<div id="machine-overview"><a href="#router2"><table></table></a></div>');
        getDataWithPost(userID, filterMode, filterWord, 0);
       // showMachineOverview(1);
        jQuery('.content').on("click", "#machine-overview .td-width", function () {
            if (jQuery(this).html())
            {
                machineID = jQuery(jQuery(this).find(' li')).text();
                (jQuery('#router2 .title')).text(machineID);
                (function () {
                    var h = document.getElementById('myChart');
                    h.style.width = document.body.clientWidth  + "px";
                    h.style.height = document.body.clientHeight - 50 + "px";
                    var myChart = echarts.init(document.getElementById('myChart'));
                    var categoryName = { '监控': 'clamp', '模具': 'clamp', '顶针': 'clamp', '注射': 'clamp', '中子': 'clamp', '座台': 'clamp'};
                    var subCategoryName = { '监控': '0', '模具': '0', '顶针': '1', '中子': '3', '注射': '2', '座台': '4', '温度': '5', '报警': '6' };
                    var subCategoryNameEn = { '监控': 'clamp', '模具': 'clamp', '顶针': 'ejector', '中子': 'core', '注射': 'injection', '座台': 'carriage', '温度': '', '报警': '' };

                    myChart.showLoading();


                    jQuery.get('machine.xml', function (xml) {
                        myChart.hideLoading();
                        var graph = echarts.dataTool.gexf.parse(xml);
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
                                    top: '10%',
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
                                var active = document.getElementsByClassName("tab-link active button");
                                active[0].className = "tab-link button";
                                active = document.getElementsByClassName("tab-link  button");
                                active[subCategoryName[param['name']]].className +=" active";

                                active = document.getElementsByClassName("tab active");
                                active[0].className = "tab";
                                active = document.getElementsByClassName("tab");
                                active[subCategoryName[param['name']]].className += " active";
                                getMachineData(machineID, subCategoryNameEn[param['name']]);
                                jQuery("#detailInfo").empty();
                                jQuery("#detailInfo").append(overviewHTML);

                                $.router.load("#" + categoryName[param['name']]);   //jQuery confict

                            }
                            //document.location = categoryName[param['name']] + ".html?machineID=" + mahineID;

                        })


                    }, 'xml');

                })(this);

            }
        });


        jQuery('.tab-link').click(function () {
            
            getMachineData(machineID, { "模 具": "clamp", "顶 针": "ejector", "中 子": "core", "注 射": "injection", "座 台": "carriage" }[jQuery(this).text()]);

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
        jQuery(".filter-bar").fadeIn("fast");
        jQuery("#machine-overview").fadeIn("fast");
        if (jQuery("#machine-overview table").html())
            getDataWithPost(userID, filterMode, filterWord, 1);
        else
            getDataWithPost(userID, filterMode, filterWord, 0);

    }
    else {
        jQuery(".filter-bar").fadeOut("fast");
        jQuery(".info-list").fadeIn("fast");
        getDataWithPost(userID, filterMode, filterWord, 2);

    }


}


function getDataWithPost(userID, filterMode, filterWord, option) {
    jQuery.ajax({
        type: "POST",
        url: "http://www.tnet.space/monitor/clamp.aspx",
        data: "MachineID=all" + "&UnitID=overview" + "&userID=" + userID,
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (data) {
            allConns = data;
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
            jQuery(jQuery(".outlineRight table td:nth-child(2)")[0]).text(keyArr.length);
            jQuery(jQuery(".outlineRight table td:nth-child(2)")[1]).text(keyArrDisconnected.length);
            jQuery(jQuery(".outlineRight table td:nth-child(2)")[2]).text(keyArrConnectiveNotAlarm.length + keyArrAlarm.length);
            jQuery(jQuery(".outlineRight table td:nth-child(5)")[2]).text(keyArrAlarm.length);
            jQuery(jQuery(".outlineRight table td:nth-child(5)")[3]).text(keyArrConnectiveNotAlarm.length);
            jQuery(jQuery(".outlineRight table td:nth-child(5)")[4]).text('');
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
        jQuery("#machine-overview table").empty();
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
            jQuery("#machine-overview  table").append(appendStr);

            jQuery("#machine-overview #pageNum").empty();
            jQuery("#machine-overview #pageNum").append('<li><span >←前一页</span></li><li><span>后一页 →</span></li>');
            for (var j = 0; j < Math.ceil(length / quantityPerPage) ; j++) {
                var num = j + 1;
                jQuery("#machine-overview #pageNum li:last-child").before('<li><span>' + num + '</span></li>')

            }
        }
        else {
            for (var j = 0; j < length; j++) {

                jQuery("#machine-overview  table").append('<tr><td class="td-width"></td></tr>');
            }

        }


    }
    jQuery(jQuery("#machine-overview #pageNum li span")[pageNum]).addClass("active");

    jQuery("#machine-overview .td-width").each(function (index, element)
    {
        var key = keyArr[(pageNum - 1) * quantityPerPage + index];

        var process = 0;
        if (!option) {
            jQuery(jQuery('#machine-overview  .td-width')[index]).append(overviewHTML);
        }

        jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find(' li')[1]).text(key);             //machineID  

        if ('alarm' in data[key]) {
            if (data[key]["alarm"][1] > 0) {
                jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find('.circle')).css("background-color", "red");
            }
            else {
                jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find('.circle')).css("background-color", "white");
            }

        }
        //jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find(' table div')[1]).text("test"+index); //订单号
        if ("moldDataName" in data[key])
            jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find(' table div')[3]).text(data[key]["moldDataName"][1]); //产品名称

        if ("productCounterAct" in data[key] && "productCounterSet" in data[key]) {
            var quantityMax = data[key]["productCounterSet"][1];
            if (data[key]["productCounterAct"][1] > quantityMax)
                quantityMax = 99999;
            jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find(' table div')[5]).text(data[key]["productCounterAct"][1] + '/' + quantityMax); //产品数量
            if (quantityMax == 0)
                process = 0;
            else
                process = parseFloat(data[key]["productCounterAct"][1] * 100 / quantityMax).toFixed(1);


        }
        if ("lastCycleTime" in data[key])
            jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find(' table div')[7]).text(data[key]["lastCycleTime"][1]); //循环周期
        if ("controllerType" in data[key])
            jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find(' table div')[9]).text(data[key]["controllerType"]); //控制器
        if ("connStatus" in data[key]) {

            if (data[key]["connStatus"] == 1) {
                jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find('.above')).css("background-color", "#015097");
                jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find('.below')).css("background-color", "#015097");
                jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find('.cutoff')).css("background-color", "#015097");
                jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find('.cutoffLine')).css("background-color", "#015097");
            }
            else {
                jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find('.above')).css("background-color", "#bfbfbf");
                jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find('.below')).css("background-color", "#bfbfbf");
                jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find('.cutoff')).css("background-color", "#bfbfbf");
                jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find('.cutoffLine')).css("background-color", "#bfbfbf");
                jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find('.circle')).css("background-color", "#7f7f7f");

            }
            jQuery(jQuery(jQuery('#machine-overview .td-width')[index]).find(' table div')[11]).text(data[key]["connStatus"]);//状态
        }
         var myChart1 = echarts.init(jQuery('.line')[index]);
             chartOption.series[0].data[0].value = process;
        myChart1.setOption(chartOption, true);


        index++;

    });







}
function insertIntoDF(name,value,documentFragment)
{
    var elt = document.createElement('li');
    elt.className = "item-content";
    elt.innerHTML = '<div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner"><div class="item-title"></div><div class="item-after"></div></div>';
    var elt2 = elt.getElementsByTagName("div");
    elt2[2].innerHTML = name;
    elt2[3].innerHTML = value;
    documentFragment.appendChild(elt);
}
function createFrozenTable(monitorOption) {
    var teamColumn = document.createElement('ul');
    var teamRows = document.createElement('div');

    //构建列名字部分ul
    teamColumn.className = "team_l";  
    for (var index in monitorOption.row.data)
    {
        var tempNode = document.createElement('li');
        tempNode.innerHTML="<p>"+monitorOption.row.data[index]+"</p>";
        teamColumn.appendChild((document.createElement('li')).appendChild(tempNode));
    }
    //构建数据部分，先建立ul,再插入DIV中
    
    teamRows.innerHTML = '<ul class="j_scroller" style="width: 2613px; height: 361px; transition-property: transform; transform-origin: 0px 0px 0px; transform: translate(0px, 0px) translateZ(0px);"></ul>';
    teamRows.className = "team_r j_wrapper shadow_r";
    teamRows.id = "wrapper1460615956649";
    teamRows.style = "height: 361px; overflow: hidden;";
    var teamRow = "";

    for (var index in monitorOption.series)
    {
        teamRow += '<li style="width:210px"><p>' + monitorOption.series[index].name+"</p>";
        for (var j in monitorOption.series[index].data)
        {
            teamRow +="<p>"+monitorOption.series[index].data[j]+"</p>";
        }
        teamRow+="</li>"

    }
    teamRows.getElementsByTagName("ul")[0].innerHTML = teamRow;

    //名字部分和数据部分加入section
    var section = document.createElement("section");
    section.innerHTML = '<div class="contTable"><div class="j_teamLineup"><div class="teamTable clearfix"><div class="team_top"><div class="team_name">热火</div><div class="btns"><span class="btn_l end"></span><span class="btn_r"></span></div></div></div></div></div>';
    section.getElementsByClassName("teamTable")[0].appendChild(teamColumn);
    section.getElementsByClassName("teamTable")[0].appendChild(teamRows);
    (document.getElementById('tab1').getElementsByTagName('ul')[0]).appendChild(section);


}
//function getOverViewWithPost(machineID) {
//    $.ajax({
//        type: "POST",
//        url: "http://www.tnet.space/monitor/clamp.aspx",
//        //url: "clamp.aspx",
//        data: "MachineID=" + machineID + "&UnitID=overView",
//        dataType: "json",
//        success: function (msg) {
//            var data = eval(msg);
//            controllerType = data["controllerType"];
//            $('#tab1 .machineID').text(machineID);
//            $('#tab1 .orderNumber').text("201601020001");
//            $('#tab1 .controllerType').text(data["controllerType"]);
//            if ("moldDataName" in data)
//                $('#tab1 .moldDataName').text(data["moldDataName"][1]);

//            if ("productCounterAct" in data) {
//                var quantityMax = data["productCounterSet"][1];
//                if (data["productCounterAct"][1] > quantityMax)
//                    quantityMax = 99999;
//                $('#tab1 .productCounterAct').text(data["productCounterAct"][1] + '/' + quantityMax);
//                //process = parseFloat(data[key]["productCounterAct"][1]*100/quantityMax).toFixed(1);
//            }
//            $('#tab1 .connStatus').text(data["connStatus"]);

//            $('#tab1 .lastCycleTime').text(data["lastCycleTime"][1]);

//            if ("alarm" in data) {
//                if (data["alarm"][1] > 0) {
//                    $('#tab1 .circle').css("background-color", "red");
//                }
//                else {
//                    $('#tab1 .circle').css("background-color", "white");
//                }

//            }

//            if (data["connStatus"] == 0) {

//                $('#tab1 .above').css("background-color", "#bfbfbf");
//                $('#tab1 .below').css("background-color", "#bfbfbf");
//                $('#tab1 .cutoff').css("background-color", "#bfbfbf");
//                $('#tab1 .cutoffLine').css("background-color", "#bfbfbf");
//                $('#tab1 .circle').css("background-color", "#7f7f7f");
//            }
//            else if (data["connStatus"] == 1) {
//                $('#tab1 .above').css("background-color", "#dff0d8");
//                $('#tab1 .below').css("background-color", "#dff0d8");
//                $('#tab1 .cutoff').css("background-color", "#dff0d8");
//                $('#tab1 .cutoffLine').css("background-color", "#dff0d8");

//            }
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            $('#tab1 .above').css("background-color", "#bfbfbf");
//            $('#tab1 .below').css("background-color", "#bfbfbf");
//            $('#tab1 .cutoff').css("background-color", "#bfbfbf");
//            $('#tab1 .cutoffLine').css("background-color", "#bfbfbf");
//            $('#tab1 .circle').css("background-color", "#7f7f7f");
//            //drawPie();

//        }

//    });

//}

function getMachineData(machineID, unitID) {
    jQuery.ajax({
        type: "POST",
        url: "http://www.tnet.space/monitor/clamp.aspx",
        //url: "clamp.aspx",
        data: "MachineID=" + machineID + "&UnitID=" + unitID,
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (msg) {
            var data = eval(msg);
            var documentFragment;
            var ejectorModeStr = ["否", "保持", "连续", "振动"];
            var airModeStr = { "keba": ["否", "溶胶后", "开模后", "顶针后", "开模中", "溶胶前"], "gefranPerfoma": ["否", "开模后时间", "开模中1", "开模中2", "冷却前", "溶胶前"] };
            var param = [];

            //overview
            $('.tabs .machineID').text(machineID);
            $('.tabs .orderNumber').text("201601020001");
            $('.tabs .controllerType').text(allConns[machineID]["controllerType"]);
            if ("moldDataName" in allConns)
                $('.tabs .moldDataName').text(allConns[machineID]["moldDataName"][1]);

            if ("productCounterAct" in allConns[machineID]) {
                var quantityMax = allConns[machineID]["productCounterSet"][1];
                if (allConns[machineID]["productCounterAct"][1] > quantityMax)
                    quantityMax = 99999;
                $('.tabs .productCounterAct').text(allConns[machineID]["productCounterAct"][1] + '/' + quantityMax);
                //process = parseFloat(data[key]["productCounterAct"][1]*100/quantityMax).toFixed(1);
            }
            $('.tabs .connStatus').text(allConns[machineID]["connStatus"]);

            $('.tabs .lastCycleTime').text(allConns[machineID]["lastCycleTime"][1]);

            if ("alarm" in allConns[machineID]) {
                if (allConns[machineID]["alarm"][1] > 0) {
                    $('.tabs .circle').css("background-color", "red");
                }
                else {
                    $('.tabs .circle').css("background-color", "white");
                }

            }

            if (allConns[machineID]["connStatus"] == 0) {

                $('.tabs .above').css("background-color", "#bfbfbf");
                $('.tabs .below').css("background-color", "#bfbfbf");
                $('.tabs .cutoff').css("background-color", "#bfbfbf");
                $('.tabs .cutoffLine').css("background-color", "#bfbfbf");
                $('.tabs .circle').css("background-color", "#7f7f7f");
            }
            else if (allConns[machineID]["connStatus"] == 1) {
                $('.tabs .above').css("background-color", "#015097");
                $('.tabs .below').css("background-color", "#015097");
                $('.tabs .cutoff').css("background-color", "#015097");
                $('.tabs .cutoffLine').css("background-color", "#015097");

            }


            if (unitID == "clamp")
            {
                for (var i = 0; i < 5; i++) {
                    if (i < 4){
                        param[i] = [data["moldCloseVelocity"][i][1], data["moldClosePressure"][i][1], data["moldClosePosition"][i][1], data["moldOpenVelocity"][i][1], data["moldOpenPressure"][i][1], data["moldOpenPosition"][i][1]];
                    }
                    else{
                        param[i] = [data["moldCloseVelocity"][i][1], data["moldClosePressure"][i][1], data["moldClosePosition"][i][1], null, null, null];
                        
                    }

                }
                    $("#tab1 .j_scroller li").each(function (index1,element) {
                        $("p", element).each(function (index2,elm) {
                            if(index2>0){
                                elm.innerHTML = param[index1][index2-1];

                            }
                        })
                    })

            }
            else if (unitID == "ejector")
            {
                for (var i = 0; i < 4; i++) {
                    if (i < 3) {
                        param[i] = [data["ejectorFwdVelocity"][i][1], data["ejectorFwdPressure"][i][1], data["ejectorFwdPosition"][i][1], data["ejectorBwdVelocity"][i][1], data["ejectorBwdPressure"][i][1], data["ejectorBwdPosition"][i][1]];
                    }
                    else {
                        //param[i] = [data["ejectorFwdVelocity"][i][1], data["ejectorFwdPressure"][i][1], data["ejectorFwdPosition"][i][1], null, null, null];

                    }

                }
                $("#tab2 .j_scroller li").each(function (index1, element) {
                    $("p", element).each(function (index2, elm) {
                        if (index2 > 0) {
                            elm.innerHTML = param[index1][index2 - 1];

                        }
                    })
                })
                //documentFragment = null;
                //documentFragment = document.createDocumentFragment();
                //(document.getElementById('tab2').getElementsByTagName('ul')[0]).innerHTML = "";
                //for (var i = 0; i < 3 ; i++) {


                //    insertIntoDF("顶进速度" + i + "段", data["ejectorFwdVelocity"][i][1], documentFragment);
                //    insertIntoDF("顶进压力" + i + "段", data["ejectorFwdPressure"][i][1], documentFragment);
                //    insertIntoDF("顶进位置" + i + "段", data["ejectorFwdPosition"][i][1], documentFragment);
                //    insertIntoDF("顶退速度" + i + "段", data["ejectorBwdVelocity"][i][1], documentFragment);
                //    insertIntoDF("顶退压力" + i + "段", data["ejectorBwdPressure"][i][1], documentFragment);
                //    insertIntoDF("顶退位置" + i + "段", data["ejectorBwdPosition"][i][1], documentFragment);

                //}
                //insertIntoDF("顶针模式时间", ejectorModeStr[data["ejectorMode"][1]], documentFragment);
                //insertIntoDF("顶针次数", data["ejectorShakeCounter"][1], documentFragment);

                //(document.getElementById('tab2').getElementsByTagName('ul')[0]).appendChild(documentFragment);
                //documentFragment = null;
                //documentFragment = document.createDocumentFragment();
                //(document.getElementById('tab2').getElementsByTagName('ul')[1]).innerHTML = "";

                //for (var i = 0; i < 4 ; i++) {
                //    insertIntoDF("气阀" + i + "模式", airModeStr["gefranPerfoma"][data["airVavleMode"][i][1]], documentFragment);
                //    insertIntoDF("气阀" + i + "模板位置", data["airVavleStartPosition"][i][1], documentFragment);
                //    insertIntoDF("气阀" + i + "延时", data["airVavleSetDelayTime"][i][1], documentFragment);
                //    insertIntoDF("气阀" + i + "时间", data["airVavleSetDelayTime"][i][1], documentFragment);

                //}
                //(document.getElementById('tab2').getElementsByTagName('ul')[1]).appendChild(documentFragment);
            }
            else if (unitID == "core") {
                for (var i = 0; i < 4; i++) {

                        param[2*i] = [data["coreInVelocity"][i][1], data["coreInPressure"][i][1], data["coreInMonitorPosition"][i][1], data["coreInActPosition"][i][1], data["coreInSetMoveTime"][i][1], data["coreInActMoveTime"][i][1], data["coreInSetScrewCount"][i][1], data["coreInActScrewCount"][i][1]];
                        param[2 * i + 1] = [data["coreOutVelocity"][i][1], data["coreOutPressure"][i][1], data["coreOutMonitorPosition"][i][1], data["coreOutActPosition"][i][1], data["coreOutSetMoveTime"][i][1], data["coreOutActMoveTime"][i][1], data["coreOutSetScrewCount"][i][1], data["coreOutActScrewCount"][i][1]];
                }
                $("#tab3 .j_scroller li").each(function (index1, element) {
                    $("p", element).each(function (index2, elm) {
                        if (index2 > 0) {
                            elm.innerHTML = param[index1][index2];

                        }
                    })
                })


                //var coreOutMode = { "keba": ["合模前", "合模中", "合模后"], "gefranPerfoma": ["前", "之间", "停止", "后"] };
                //var coreInMode = { "keba": ["开模前", "开模中", "开模后"], "gefranPerfoma": ["前", "之间", "停止", "后"] };
                //documentFragment = null;
                //documentFragment = document.createDocumentFragment();
                //(document.getElementById('tab3').getElementsByTagName('ul')[0]).innerHTML = "";

                //for (var i = 0; i < 4 ; i++) {
                //    insertIntoDF("中子" + i + "使用", ["关", "开"][data["coreUse"][i][1]], documentFragment);
                //    insertIntoDF("中子" + i + "进模式", coreInMode[controllerType][data["coreInMode"][i][1]], documentFragment);
                //    insertIntoDF("中子" + i + "出模式", coreOutMode[controllerType][data["coreOutMode"][i][1]], documentFragment);
                //    insertIntoDF("中子" + i + "保持", ["关", "开"][data["coreHold"][i][1]], documentFragment);


                //    insertIntoDF("中子" + i + "进速度", data["coreInVelocity"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "进压力", data["coreInPressure"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "进设置位置", data["coreInMonitorPosition"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "进实际位置", data["coreInActPosition"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "进设置时间", data["coreInSetMoveTime"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "进实际时间", data["coreInActMoveTime"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "进设置绞牙数", data["coreInSetScrewCount"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "进实际绞牙数", data["coreInActScrewCount"][i][1], documentFragment);

                //    insertIntoDF("中子" + i + "出速度", data["coreOutVelocity"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "出压力", data["coreOutPressure"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "出设置位置", data["coreOutMonitorPosition"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "出实际位置", data["coreOutActPosition"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "出设置时间", data["coreOutSetMoveTime"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "出实际时间", data["coreOutActMoveTime"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "出设置绞牙数", data["coreOutSetScrewCount"][i][1], documentFragment);
                //    insertIntoDF("中子" + i + "出实际绞牙数", data["coreOutActScrewCount"][i][1], documentFragment);






                //}
                //(document.getElementById('tab3').getElementsByTagName('ul')[0]).appendChild(documentFragment);


            }
            else if (unitID == "injection") {
                documentFragment = null;
                documentFragment = document.createDocumentFragment();
                (document.getElementById('tab4').getElementsByTagName('ul')[0]).innerHTML = "";
                for (var i = 0; i < 6 ; i++) {


                    insertIntoDF("注射速度" + i + "段", data["injectionVelocity"][i][1], documentFragment);
                    insertIntoDF("注射压力" + i + "段", data["injectionPressure"][i][1], documentFragment);
                    insertIntoDF("注射位置" + i + "段", data["injectionPosition"][i][1], documentFragment);


                }
                for (var i = 0; i < 6 ; i++) {


                    insertIntoDF("保压速度" + i + "段", data["injectionHoldVelocity"][i][1], documentFragment);
                    insertIntoDF("保压压力" + i + "段", data["injectionHoldPressure"][i][1], documentFragment);
                    insertIntoDF("保压位置" + i + "段", data["injectionHoldPosition"][i][1], documentFragment);


                }
                insertIntoDF("螺杆位置模式", ["否", "使用"][data["cutOffUseScrewPosition"][1]], documentFragment);
                insertIntoDF("螺杆位置", data["cutOffUseScrewPosition"][1], documentFragment);
                insertIntoDF("切换位置", data["cutOffThresholdInjectPressure"][1], documentFragment);
                insertIntoDF("射胶时间模式", ["否", "使用"][data["cutOffUseScrewPosition"][1]], documentFragment);
                insertIntoDF("时间", data["cutOffUseScrewPosition"][1], documentFragment);
                insertIntoDF("切换时间", data["cutOffThresholdInjectPressure"][1], documentFragment);
                insertIntoDF("实际射压", data["injectionActPressure"][1], documentFragment);
                insertIntoDF("螺杆位置", data["screwPosition"][1], documentFragment);
                insertIntoDF("冷却设置时间", data["setCoolingTime"][1], documentFragment);
                insertIntoDF("冷却实际时间", data["actCoolingTime"][1], documentFragment);
                (document.getElementById('tab4').getElementsByTagName('ul')[0]).appendChild(documentFragment);


            }
            else if (unitID == "carriage") {
                documentFragment = null;
                documentFragment = document.createDocumentFragment();
                (document.getElementById('tab5').getElementsByTagName('ul')[0]).innerHTML = "";
                for (var i = 0; i < 6 ; i++) {


                    insertIntoDF("座台进速度" + i + "段", data["carriageFwdVelocity"][i][1], documentFragment);
                    insertIntoDF("座台进压力" + i + "段", data["carriageFwdPressure"][i][1], documentFragment);
                    insertIntoDF("座台进位置" + i + "段", data["carriageFwdPosition"][i][1], documentFragment);
                    insertIntoDF("座台退速度" + i + "段", data["carriageBwdVelocity"][i][1], documentFragment);
                    insertIntoDF("座台退压力" + i + "段", data["carriageBwdPressure"][i][1], documentFragment);
                    insertIntoDF("座台退位置" + i + "段", data["carriageBwdPosition"][i][1], documentFragment);

                }
               
                (document.getElementById('tab5').getElementsByTagName('ul')[0]).appendChild(documentFragment);


            }
          

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }



    });

}





