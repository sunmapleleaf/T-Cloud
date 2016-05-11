// JavaScript Document


$(document).ready(function() {
	window.onload = function(){
     //  drawPie();
	}
/*初始化*/	
	var machineID = GetQueryString("machineID");
	var pathname = window.location.pathname.split("/");
	var unitID = pathname[pathname.length-1].split(".")[0];
	$('#machineID').text(machineID);


	getOverViewWithPost(machineID);	
	getDataWithPost(machineID,unitID);
	var timer =setInterval(function(){		
			getDataWithPost(machineID,unitID);

		},500);
	

/*click事件*/		
	$($('.machine-data-bar ul> li:nth-child(2) ')).click(function () {
	    location.href = "http://" + location.host + "/monitor/clamp.html?machineID=" + machineID;
	});
	$($('.machine-data-bar ul> li:nth-child(3) ')).click(function () {
	    location.href = "http://" + location.host + "/monitor/ejector.html?machineID=" + machineID;
	});
	$($('.machine-data-bar ul> li:nth-child(4) ')).click(function () {
	    location.href = "http://" + location.host + "/monitor/core.html?machineID=" + machineID;
	});
	$($('.machine-data-bar ul> li:nth-child(5) ')).click(function () {
	    location.href = "http://" + location.host + "/monitor/injection.html?machineID=" + machineID;
	});
	$($('.machine-data-bar ul> li:nth-child(6) ')).click(function () {
	    location.href = "http://" + location.host + "/monitor/carriage.html?machineID=" + machineID;
	});
	$($('.machine-data-bar ul> li:nth-child(7) ')).click(function () {
	    location.href = "http://" + location.host + "/monitor/temperature.html?machineID=" + machineID;
	});
/*数据*/		
		
});
function getDataWithPost(machineID,unitID) {
    $.ajax({
        type: "POST",
        url: "http://www.tnet.space/monitor/clamp.aspx",
	   //url: "clamp.aspx",
        data: "MachineID=" +machineID+ "&UnitID="+unitID,
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (msg) {
            var data = eval( msg );

			for(var i =0;i <6 ;i++)
			{
				$($(".injectionVelocity input")[5-i]).val(data["injectionVelocity"][i][1]);
				$($(".injectionPressure input")[5-i]).val(data["injectionPressure"][i][1]);
				$($(".injectionPosition input")[5-i]).val(data["injectionPosition"][i][1]);
				if(i<3)
				{
					var coreOutMode=["开","关"];

					$($(".injectionHoldVelocity input")[4-i]).val(data["injectionHoldVelocity"][i][1]);
					$($(".injectionHoldPressure input")[4-i]).val(data["injectionHoldPressure"][i][1]);
					$($(".injectionHoldPosition input")[4-i]).val(data["injectionHoldPosition"][i][1]);
	

					
					}
				
			}
				var cutOffUseScrew=["否","使用"];
				$($(".cutOffUseScrewPosition input")[0]).val(cutOffUseScrew[data["cutOffUseScrewPosition"][1]]);
				$($(".cutOffUseScrewPosition input")[1]).val(data["cutOffUseScrewPosition"][1]);
				$($(".cutOffScrewPosition input")[0]).val(data["cutOffScrewPosition"][1]);	
				$($(".cutOffThresholdInjectPressure input")[0]).val(data["cutOffThresholdInjectPressure"][1]);	
	
				$($(".cutOffUseInjectTime input")[0]).val(cutOffUseScrew[data["cutOffUseInjectTime"][1]]);
				$($(".cutOffUseInjectTime input")[1]).val(data["cutOffUseInjectTime"][1]);
				$($(".cutOffInjectTime input")[0]).val(data["cutOffInjectTime"][1]);	
				$($(".cutOffThresholdInjectTime input")[0]).val(data["cutOffThresholdInjectTime"][1]);	

				$($(".injectionActPressure input")[0]).val(data["injectionActPressure"][1]);
				$($(".screwPosition input")[0]).val(data["screwPosition"][1]);	
				$($(".actCoolingTime input")[0]).val(data["actCoolingTime"][1]);				
				$($(".setCoolingTime input")[0]).val(data["setCoolingTime"][1]);		
				/*overview 参数*/
				$('#timestamp').text((new Date()).toLocaleTimeString());
				
				$("input").each(function(index, element) {
				if(!$(this).val())
                	$(this).css("background-color","#fafafa");
            	});
				
				
				
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
				}
				
				

    });

}
function getOverViewWithPost(machineID) {
    $.ajax({
        type: "POST",
        url: "http://www.tnet.space/monitor/clamp.aspx",
	   //url: "clamp.aspx",
        data: "MachineID=" +machineID+ "&UnitID=overView",
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (msg) {
            var data = eval( msg );
            $('#machineID').text(machineID);
            $('#orderNumber').text("201601020001");
            $('#controllerType').text(data["controllerType"]);
            if ("moldDataName" in data)
                $('#moldDataName').text(data["moldDataName"][1]);

            if ("productCounterAct" in data) {
                var quantityMax = data["productCounterSet"][1];
                if (data["productCounterAct"][1] > quantityMax)
                    quantityMax = 99999;
                $('#productCounterAct').text(data["productCounterAct"][1] + '/' + quantityMax);
                //process = parseFloat(data[key]["productCounterAct"][1]*100/quantityMax).toFixed(1);
            }
            $('#connStatus').text(data["connStatus"]);

            $('#lastCycleTime').text(data["lastCycleTime"][1]);

            if ("alarm" in data) {
                if (data["alarm"][1] > 0) {
                    $('.circle').css("background-color", "red");
                }
                else {
                    $('.circle').css("background-color", "white");
                }

            }
            //drawPie();

            if (data["connStatus"] == 0) {

                $('.overView .above').css("background-color", "#bfbfbf");
                $('.overView .below').css("background-color", "#bfbfbf");
                $('.overView .cutoff').css("background-color", "#bfbfbf");
                $('.overView .cutoffLine').css("background-color", "#bfbfbf");
                $('.overView .circle').css("background-color", "#7f7f7f");
            }
            else if (data["connStatus"] == 1) {
                $('.overView .above').css("background-color", "#dff0d8");
                $('.overView .below').css("background-color", "#dff0d8");
                $('.overView .cutoff').css("background-color", "#dff0d8");
                $('.overView .cutoffLine').css("background-color", "#dff0d8");

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            $('.overView .above').css("background-color", "#bfbfbf");
            $('.overView .below').css("background-color", "#bfbfbf");
            $('.overView .cutoff').css("background-color", "#bfbfbf");
            $('.overView .cutoffLine').css("background-color", "#bfbfbf");
            $('.overView .circle').css("background-color", "#7f7f7f");
            //drawPie();
        }

    });

}
function GetQueryString(name) {

    var reg = new RegExp(name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) 
        return unescape(r[1]); 
    return null;

}