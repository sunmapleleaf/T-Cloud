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

			for(var i =0;i <1 ;i++)
			{
				$($(".carriageFwdVelocity input")[2-i]).val(data["carriageFwdVelocity"][i][1]);
				$($(".carriageFwdPressure input")[2-i]).val(data["carriageFwdPressure"][i][1]);
				//$($(".carriageFwdPosition input")[1-i]).val(data["carriageFwdPosition"][i+1][1]);
				$($(".carriageBwdVelocity input")[2-i]).val(data["carriageBwdVelocity"][i][1]);
				$($(".carriageBwdPressure input")[2-i]).val(data["carriageBwdPressure"][i][1]);
				$($(".carriageBwdPosition input")[2-i]).val(data["carriageBwdPosition"][i][1]);
				
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