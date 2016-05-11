// 产生机器overview


window.onload = function(){
	createOverview(5);
	
	}
$(document).ready(function() {
    $($('.square')[1]).click(function(){
	alert("adsf");
	});
});

function createOverview(number,data){
	var overviewHTML='<div class="overview-index"><div class="above"><ul><li class="circle"></li><li>DH1700-0001</li></ul></div><div class="cutoff"><li class="cutoffLine"></li></div><div class="below color-tederic-gray"><div class="info"><table><tr><td><div>订单号：</div></td><td><div>201604150001</div></td></tr><tr><td><div>产品名称：</div></td><td><div id="productName">混双色垃圾桶</div></td></tr><tr><td><div>产品数量：</div></td><td><div id="productQuantity">50000/100000</div></td></tr><tr><td><div>循环周期：</div></td><td><div id="periodicTime">30.24</div></td></tr><tr><td><div>控制器：</div></td><td><div>keba1000</div></td></tr><tr><td><div>状态：</div></td><td><div>连接</div></td></tr></table></div><div class="pie" id="keba001"><canvas width="80px" height="80px" >20%</canvas></div></div></div>';
	for(var i=0;i<number;i++)
	{
	$($('#machine-overview  .td-width')[i]).append(overviewHTML);//(function(index,element){if(index ==2)$(element).append(overviewHTML)});
	$($($('#machine-overview .td-width')[i]).find(' li')[1]).text("test"+i);
	$($($('#machine-overview .td-width')[i]).find(' table div')[1]).text("test"+i);
	$($($('#machine-overview .td-width')[i]).find(' table div')[3]).text("test"+i);
	$($($('#machine-overview .td-width')[i]).find(' table div')[5]).text("test"+i);
	$($($('#machine-overview .td-width')[i]).find(' table div')[7]).text("test"+i);
	$($($('#machine-overview .td-width')[i]).find(' table div')[9]).text("test"+i);
	$($($('#machine-overview .td-width')[i]).find(' table div')[11]).text("test"+i);
	$($($('#machine-overview .td-width')[i]).find(' canvas')[0]).text(i*5+"%");
	}
		drawPie();
/*	$('#machine-overview .td-width:nth-child(2)').append(overviewHTML);
	$('#machine-overview .td-width:nth-child(3)').append(overviewHTML);*/
	}
