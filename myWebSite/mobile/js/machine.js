window.onload = function () {
    var h = document.getElementById('myChart');
    h.style.width = document.body.clientWidth - 30 + "px";
    h.style.height = document.body.clientHeight - 50 + "px";
    var myChart = echarts.init(document.getElementById('myChart'));
    var categoryName = { '监控': 'clamp', '模具': 'clamp', '顶针': 'ejector', '注射': 'injection', '中子': 'core', '座台': 'carriage', '温度': 'temperature' ,'报警':'','统计':'analysis','质量':'analysis','机器使用':'analysisUsage','机器状态':'analysisStatus','机器异常':'analysisAlarm'};
    var mahineID = '';
    myChart.showLoading();


    $.get('machine.xml', function (xml) {
        myChart.hideLoading();
        var graph = echarts.dataTool.gexf.parse(xml);
        var categories = [{ name: "监控" }, { name: "统计" }, { name: "机器信息" }];
        //for (var i = 0; i < 9; i++) {
        //    categories[i] = {
        //        name: '类目' + i
        //    };
        //}
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
                    bottom:'5%',
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


        mahineID = GetQueryString('machineID');
        option.title['text'] = mahineID;
        myChart.setOption(option);
        myChart.on("click", function (param) {
           // var hz = param;
            if (param['name'] in categoryName)
            document.location = categoryName[param['name']]+".html?machineID="+mahineID;
        })
    }, 'xml');



}

function GetQueryString(name) {

    var reg = new RegExp(name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[1]);
    return null;

}