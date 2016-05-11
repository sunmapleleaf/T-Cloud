window.onload = function () {
    var h = document.getElementById('myChart');
    h.style.width = document.body.clientWidth + "px";
    h.style.height = document.body.clientHeight - 50 + "px";
    var myChart = echarts.init(document.getElementById('myChart'));
    var categoryName = { '工艺管理': 'craft', '统计': 'analysisMould', '模具信息': 'mouldInfo', '辅机': 'auxiliary' };
    var mahineID = '';
    myChart.showLoading();
    getMoldData('moldData');
    $.get('mould.xml', function (xml) {
        myChart.hideLoading();
        var graph = echarts.dataTool.gexf.parse(xml);
        var categories = [{ name: "模具信息" }, { name: "工艺管理" }, { name: "辅机" }, { name: "统计" }];
        graph.nodes.forEach(function (node) {
            node.itemStyle = null;
            node.value = node.symbolSize;
            node.label.normal.show = node.symbolSize > 30;
            node.category = node.attributes.modularity_class;
        });
        option = {
            title: {
                text: 'DH001-001',
                subtext: 'Tederic',
                top: 'bottom',
                left: 'right'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '30%',
                top: '30%',
                containLabel: true
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
                    nodeScaleRatio: 0,
                    symbolSize: 10,
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
        mahineID = GetQueryString('machineID');
        option.title['text'] = mahineID;
        myChart.setOption(option);
        myChart.on("click", function (param) {
            if (param['name'] in categoryName)
            {
                $.router.load("#" + categoryName[param['name']]);
            }
                //document.location = categoryName[param['name']] + ".html?machineID=" + mahineID;

        })
    }, 'xml');



}

function getMoldData(command, filter) {
    $.ajax({
        type: "POST",
        url: "http://www.tnet.space/monitor/clamp.aspx",
        //url: "clamp.aspx",
        data: "command=" + command + "&filter=" + filter,
        dataType: "json",
        //contentType: "application/json; charset=utf-8",

        success: function (msg) {
            var data = eval(msg);
            var documentFragment = document.createDocumentFragment();
             
            $('#craft #tab1-1').empty();
            for (var i = 0; i < data.length; i++)
            {
                var elt = document.createElement('div');
                elt.innerHTML='<div class="content-block-title">垃圾桶</div><div class="list-block"><ul><li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner"><div class="item-title">适用机型</div><div class="item-after">DH001-01</div></div></li><li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner"><div class="item-title">控制器</div><div class="item-after">keba</div></div></li><li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner"><div class="item-title">日期</div><div class="item-after">2015-01-02</div></div></li></ul></div>';
                
                var elt2 = elt.getElementsByTagName("div");
                elt2[0].innerHTML = data[i]["name"];
                elt2[5].innerHTML = "";
                elt2[9].innerHTML = data[i]["controllerType"];
                elt2[13].innerHTML = data[i]["date"];

                documentFragment.appendChild(elt);

            }
            document.getElementById('tab1-1').appendChild(documentFragment);





        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }

    });

}


function GetQueryString(name) {

    var reg = new RegExp(name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[1]);
    return null;

}