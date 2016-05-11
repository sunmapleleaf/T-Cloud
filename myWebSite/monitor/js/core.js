// JavaScript Document


$(document).ready(function() {
	window.onload = function(){
      // drawPie();
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
			for(var i =0;i <4 ;i++)
			{
				$($(".coreInSetScrewCount input")[i]).val(data["coreInSetScrewCount"][i][1]);
				$($(".coreOutSetScrewCount input")[i]).val(data["coreOutSetScrewCount"][i][1]);
				$($(".coreInActScrewCount input")[i]).val(data["coreInActScrewCount"][i][1]);
				$($(".coreOutActScrewCount input")[i]).val(data["coreOutActScrewCount"][i][1]);
				$($(".coreInSetMoveTime input")[i]).val(data["coreInSetMoveTime"][i][1]);
				$($(".coreInActMoveTime input")[i]).val(data["coreInActMoveTime"][i][1]);
				$($(".coreOutSetMoveTime input")[i]).val(data["coreOutSetMoveTime"][i][1]);
				$($(".coreOutActMoveTime input")[i]).val(data["coreOutActMoveTime"][i][1]);
				$($(".coreInVelocity input")[i]).val(data["coreInVelocity"][i][1]);
				$($(".coreInPressure input")[i]).val(data["coreInPressure"][i][1]);
				$($(".coreOutVelocity input")[i]).val(data["coreOutVelocity"][i][1]);
				$($(".coreOutPressure input")[i]).val(data["coreOutPressure"][i][1]);
				$($(".coreInMonitorPosition input")[i]).val(data["coreInMonitorPosition"][i][1]);
				$($(".coreOutMonitorPosition input")[i]).val(data["coreOutMonitorPosition"][i][1]);
				$($(".coreInActPosition input")[i]).val(data["coreInActPosition"][i][1]);
				$($(".coreOutActPosition input")[i]).val(data["coreOutActPosition"][i][1]);
				$($(".coreInPriority input")[i]).val(data["coreInPriority"][i][1]);
				$($(".coreOutPriority input")[i]).val(data["coreOutPriority"][i][1]);
	
					var coreUse=["关","开"];
					var coreOutMode = { "keba": ["合模前", "合模中", "合模后"], "gefranPerfoma": ["前", "之间", "停止", "后"] };
					var coreInMode = { "keba": ["开模前", "开模中", "开模后"], "gefranPerfoma": ["前", "之间", "停止", "后"] };
					var coreHold=["关","开"];
					$($(".coreUse input")[i*2]).val(coreUse[data["coreUse"][i][1]]);
					$($(".coreUse input")[i*2+1]).val(data["coreUse"][i][1]);
					$($(".coreOutMode input")[i * 2]).val(coreOutMode[controllerType][data["coreOutMode"][i][1]]);
					$($(".coreOutMode input")[i*2+1]).val(data["coreOutMode"][i][1]);
					$($(".coreInMode input")[i * 2]).val(coreInMode[controllerType][data["coreInMode"][i][1]]);
					$($(".coreInMode input")[i*2+1]).val(data["coreInMode"][i][1]);
					$($(".coreHold input")[i*2]).val(coreHold[data["coreHold"][i][1]]);
					$($(".coreHold input")[i*2+1]).val(data["coreHold"][i][1]);

					
					
				
			}
	
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
var controllerType;
function getOverViewWithPost(machineID) {
    $.ajax({
        type: "POST",
        url: "http://www.tnet.space/monitor/clamp.aspx",
	   //url: "clamp.aspx",
        data: "MachineID=" +machineID+ "&UnitID=overView",
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (msg) {
            var data = eval(msg);
            controllerType = data["controllerType"];
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