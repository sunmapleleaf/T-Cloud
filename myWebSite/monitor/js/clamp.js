// JavaScript Document





var scanTime=200;
var lastMoldPosition=0;
var maxMoldPosition=320;
var moldClose=0;
var moldCloseEnd=1;
var moldOpen=0;
var moldOpenEnd=1;
var moldMoveTime=0;
var nextMoldMotion=0;

var lastEjectorPosition=0;
var maxEjectorPosition=50;
var ejectorFwd=0;
var ejectorFwdEnd=1;
var ejectorBwd=0;
var ejectorBwdEnd=1;
var ejectorMoveTime=0;
var nextEjectorMotion=0;

var lastInjectionPosition=0;
var maxInjectionPosition=150;
var injectionFwd=0;
var injectionFwdEnd=1;
var injectionBwd=0;
var injectionBwdEnd=1;
var injectionMoveTime=0;
var nextInjectionMotion=0;

var lastCarriagePosition=0;
var maxCarriagePosition=50;
var carriageFwd=0;
var carriageFwdEnd=1;
var carriageBwd=0;
var carriageBwdEnd=1;
var carriageMoveTime=0;
var nextCarriageMotion=0;
$(document).ready(function() {
	window.onload = function(){
      
	   var userID = getCookie('userID');
	   if(userID == null)
	         location.href = "../login.aspx?goto=clamp";
       $("#admin_settings").html(userID);
	   $( "#settings, #admin_settings" ).on( "click", function()//退出下拉菜单
		{
				 $("#admin").toggleClass("admin-color");
				$( "#menu" ).slideToggle( "fast","linear" );
		});
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
		//	getOverViewWithPost(machineID);	
		},1000);
	var timer2 =setInterval(function(){	
			getOverViewWithPost(machineID);	
		},scanTime);

/*click事件*/		


	$($('.machine-data-bar ul> li:nth-child(2) ')).click(function(){
	location.href= "http://"+location.host+"/monitor/clamp.html?machineID="+machineID;
	});
	$($('.machine-data-bar ul> li:nth-child(3) ')).click(function(){
	    location.href= "http://"+location.host+"/monitor/ejector.html?machineID="+machineID;	
	});
	$($('.machine-data-bar ul> li:nth-child(4) ')).click(function(){
	    location.href = "http://" + location.host + "/monitor/core.html?machineID=" + machineID;
	});	
	$($('.machine-data-bar ul> li:nth-child(5) ')).click(function(){
	    location.href = "http://" + location.host + "/monitor/injection.html?machineID=" + machineID;
	});	
	$($('.machine-data-bar ul> li:nth-child(6) ')).click(function(){
	    location.href = "http://" + location.host + "/monitor/carriage.html?machineID=" + machineID;
	});	
	$($('.machine-data-bar ul> li:nth-child(7) ')).click(function(){
	    location.href = "http://" + location.host + "/monitor/temperature.html?machineID=" + machineID;
	});	
/*数据*/		




/*var i=0;
	setInterval(function(){
		
		    
			if(i <10)
			{
				progress1(50,i*10,(i+1)*10);				
			}
			else if(i <20)
			{
				progress2(50,(i-10)*10,(i-9)*10);
			}
			else if(i<30)
			{
				progress3(50,(i-20)*10,(i-19)*10);
				
			}
			else if(i<40)
			{
				progress4(50,(i-30)*10,(i-29)*10);
				
			}
			else if(i <50)
			{
	        	progress1(50,100-(i-40)*10,100-(i-39)*10);	        	
				
			}
			else if(i <60)
			{
	        	progress2(50,100-(i-50)*10,100-(i-49)*10);

				
			}
			else if(i<70)
			{
	        	progress3(50,100-(i-60)*10,100-(i-59)*10);

				
			}
			else if(i<80)
			{
	        	progress4(50,100-(i-70)*10,100-(i-69)*10);

				
			}
			else{i=0}
			i++;
	},50);	*/

		

		
		

		
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
            // alert(JSON.stringify(data));
			for(var i =0;i <5 ;i++)
			{
				$($(".moldCloseVelocity input")[i]).val(data["moldCloseVelocity"][i][1]);
				$($(".moldClosePressure input")[i]).val(data["moldClosePressure"][i][1]);
				$($(".moldClosePosition input")[i]).val(data["moldClosePosition"][i][1]);
				if(i<4)
				{
					$($(".moldOpenVelocity input")[4-i]).val(data["moldOpenVelocity"][i][1]);
					$($(".moldOpenPressure input")[4-i]).val(data["moldOpenPressure"][i][1]);
					$($(".moldOpenPosition input")[4-i]).val(data["moldOpenPosition"][i][1]);
				}
			}
				$($(".moldFastClose input")[0]).val("使用");
				$($(".moldFastClose input")[1]).val(data["moldFastClose"][1]);
				$($(".useOpenVavleAsFastClose input")[0]).val("否");
				$($(".useOpenVavleAsFastClose input")[1]).val(data["useOpenVavleAsFastClose"][1]);
				$(".cycleDelayAct input").val(data["cycleDelayAct"][1]);
				$(".cycleDelaySet input").val(data["cycleDelaySet"][1]);
				$(".moldProtectTimeAct input").val(data["moldProtectTimeAct"][1]);
				$(".moldProtectTimeSet input").val(data["moldProtectTimeSet"][1]);
				$($(".moldFastOpen input")[0]).val("使用");
				$($(".moldFastOpen input")[1]).val(data["moldFastOpen"][1]);
				
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
var openCounter=0;
var closeCounter=0;
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
	        var process = 0;
						var inited = 0;
			if($('#machineID').text()!=null)inited=1;
            $('#machineID').text(machineID);
			$('#orderNumber').text("201601020001");
			$('#controllerType').text(data["controllerType"]);
			if ("moldDataName" in data)
			    $('#moldDataName').text(data["moldDataName"][1]);
			
			if("productCounterAct" in data)
				{
					var quantityMax= data["productCounterSet"][1];
					if(data["productCounterAct"][1]> quantityMax)
						quantityMax=99999;
					$('#productCounterAct').text(data["productCounterAct"][1]+'/'+quantityMax);
					//process = parseFloat(data[key]["productCounterAct"][1]*100/quantityMax).toFixed(1);
				}
			$('#connStatus').text(data["connStatus"]);
			
			$('#lastCycleTime').text(data["lastCycleTime"][1]);

			if("alarm" in data)  
			{
				if(data["alarm"][1]>0)
				{
					$('.circle').css("background-color","red");
				}	
				else
				{
					$('.circle').css("background-color","white");
				}
						
			} 
			//drawPie();
			
			if(data["connStatus"] == 0){
			
				$('.overView .above').css("background-color","#bfbfbf");
				$('.overView .below').css("background-color","#bfbfbf");
				$('.overView .cutoff').css("background-color","#bfbfbf");
				$('.overView .cutoffLine').css("background-color","#bfbfbf");
				$('.overView .circle').css("background-color","#7f7f7f");
			}
			else if( data["connStatus"] ==1)
			{
			    $('.overView .above').css("background-color", "#dff0d8");
			    $('.overView .below').css("background-color", "#dff0d8");
			    $('.overView .cutoff').css("background-color", "#dff0d8");
			    $('.overView .cutoffLine').css("background-color", "#dff0d8");
				
				}
			
			//$('.overView  canvas').text(process+"%");
			
			if(!inited)
			{
				lastMoldPosition = parseInt(data["moldPosition"][1]*100/maxMoldPosition);
				if(lastMoldPosition>100)lastMoldPosition=100;
				if(lastMoldPosition<=0)lastMoldPosition=0;
				lastMoldPosition = 100-lastMoldPosition;
				
				lastEjectorPosition = parseInt(data["ejectorPosition"][1]*100/maxEjectorPosition);
				if(lastEjectorPosition>100)lastEjectorPosition=100;
				if(lastEjectorPosition<=0)lastEjectorPosition=0;
				lastEjectorPosition = 100-lastEjectorPosition;
				
				lastInjectionPosition = parseInt(data["injectionPosition"][1]*100/maxInjectionPosition);
				if(lastInjectionPosition>100)lastInjectionPosition=100;
				if(lastInjectionPosition<=0)lastInjectionPosition=0;
				lastInjectionPosition = 100-lastInjectionPosition;
				
				lastCarriagePosition = parseInt(data["carriagePosition"][1]*100/maxCarriagePosition);
				if(lastCarriagePosition>100)lastCarriagePosition=100;
				if(lastCarriagePosition<=0)lastCarriagePosition=0;
				lastCarriagePosition = 100-lastCarriagePosition;
				
				return;
				
			}
				
          /*  mold*/
			var moldPosition =  parseInt(data["moldPosition"][1]*100/maxMoldPosition);
            if(moldPosition>100)moldPosition=100;
			if(moldPosition<=0)moldPosition=0;
			moldPosition = 100-moldPosition;
			//if(moldPosition == lastMoldPosition )
			//return;
			moldMoveTime = 100*scanTime/Math.abs(moldPosition-lastMoldPosition);
            if(!(moldMoveTime<100&&moldMoveTime>0))
			{
				moldMoveTime=200;
				}
            
			if(moldCloseEnd&&!moldClose&&moldPosition>lastMoldPosition)
			{
				moldOpen = 0;

				moldClose=1;
			}
			if(moldOpenEnd&&!moldOpen&&moldPosition<lastMoldPosition)
			{
				moldClose = 0;
				moldOpen=1;

			}
	        lastMoldPosition = moldPosition;		

    		if(nextMoldMotion==0&&moldClose&&moldCloseEnd&&moldOpenEnd)
			{
                nextMoldMotion=1;
				moldCloseEnd=0;
				progress1(moldMoveTime,0,100);
			}

			if(nextMoldMotion==1&&moldOpen)
			{
				nextMoldMotion=0;
				moldOpenEnd=0;
				progress1(moldMoveTime,100,0);
			}
			//$("#test").val(nextMoldMotion+";"+moldPosition+":"+lastMoldPosition+";"+closeCounter+":"+openCounter+";"+moldClose+":"+moldOpen+";"+moldCloseEnd+":"+moldOpenEnd);				
           
             /*  ejector*/
			 
			var ejectorPosition =  parseInt(data["ejectorPosition"][1]*100/maxEjectorPosition);
            if(ejectorPosition>100)ejectorPosition=100;
			if(ejectorPosition<=0)ejectorPosition=0;
			if(ejectorPosition != lastEjectorPosition )
					ejectorMoveTime = 100*scanTime/Math.abs(ejectorPosition-lastEjectorPosition);
				if(!(ejectorMoveTime<100&&ejectorMoveTime>0))
				{
					ejectorMoveTime=200;
					}
			$("#test").val(data["ejectorPosition"][1]+";"+ejectorMoveTime);

				if(ejectorFwdEnd&&!ejectorFwd&&ejectorPosition>lastEjectorPosition)
				{
					ejectorBwd = 0;
	
					ejectorFwd=1;
				}
				if(ejectorBwdEnd&&!ejectorBwd&&ejectorPosition<lastEjectorPosition)
				{
					ejectorFwd = 0;
					ejectorBwd=1;
	
				}
				lastEjectorPosition = ejectorPosition;		
	
				if(nextEjectorMotion==0&&ejectorFwd&&ejectorFwdEnd&&ejectorBwdEnd)
				{
					nextEjectorMotion=1;
					ejectorFwdEnd=0;
					progress2(ejectorMoveTime,0,100);
				}
	
				if(nextEjectorMotion==1&&ejectorBwd&&ejectorFwdEnd&&ejectorBwdEnd)
				{
					nextEjectorMotion=0;
					ejectorBwdEnd=0;
					progress2(ejectorMoveTime,100,0);
				}			
				/*  injection*/
			var injectionPosition =  parseInt(data["injectionPosition"][1]*100/maxInjectionPosition);
            if(injectionPosition>100)injectionPosition=100;
			if(injectionPosition<=0)injectionPosition=0;injectionPosition = 100-injectionPosition;
			//if(injectionPosition == lastinjectionPosition )
			//return;
			injectionMoveTime = 100*scanTime/Math.abs(injectionPosition-lastInjectionPosition);
            if(!(injectionMoveTime<100&&injectionMoveTime>0))
			{
				injectionMoveTime=200;
				}
            
			if(injectionFwdEnd&&!injectionFwd&&injectionPosition>lastInjectionPosition)
			{
				injectionBwd = 0;

				injectionFwd=1;
			}
			if(injectionBwdEnd&&!injectionBwd&&injectionPosition<lastInjectionPosition)
			{
				injectionFwd = 0;
				injectionBwd=1;

			}
	        lastInjectionPosition = injectionPosition;		

    		if(nextInjectionMotion==0&&injectionFwd&&injectionFwdEnd&&injectionBwdEnd)
			{
                nextInjectionMotion=1;
				injectionFwdEnd=0;
				progress3(injectionMoveTime,0,100);
			}

			if(nextInjectionMotion==1&&injectionBwd&&injectionFwdEnd&&injectionBwdEnd)
			{
				nextInjectionMotion=0;
				injectionBwdEnd=0;
				progress3(injectionMoveTime,100,0);
			}					
			
			/*  carriage*/
			var carriagePosition =  parseInt(data["carriagePosition"][1]*100/maxCarriagePosition);
            if(carriagePosition>100)carriagePosition=100;
			if(carriagePosition<=0)carriagePosition=0;carriagePosition = 100-carriagePosition;

			carriageMoveTime = 100*scanTime/Math.abs(carriagePosition-lastCarriagePosition);
            if(!(carriageMoveTime<100&&carriageMoveTime>0))
			{
				carriageMoveTime=200;
				}
            
			if(carriageFwdEnd&&!carriageFwd&&carriagePosition>lastCarriagePosition)
			{
				carriageBwd = 0;

				carriageFwd=1;
			}
			if(carriageBwdEnd&&!carriageBwd&&carriagePosition<lastCarriagePosition)
			{
				carriageFwd = 0;
				carriageBwd=1;

			}
	        lastCarriagePosition = carriagePosition;		

    		if(nextCarriageMotion==0&&carriageFwd&&carriageFwdEnd&&carriageBwdEnd)
			{
                nextCarriageMotion=1;
				carriageFwdEnd=0;
				progress4(carriageMoveTime,0,100);
			}
			if(nextCarriageMotion==1&&carriageBwd&&carriageFwdEnd&&carriageBwdEnd)
			{
				nextCarriageMotion=0;
				carriageBwdEnd=0;
				progress4(carriageMoveTime,100,0);
			}
			
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {


            $('.overView .above').css("background-color", "#bfbfbf");
            $('.overView .below').css("background-color", "#bfbfbf");
            $('.overView .cutoff').css("background-color", "#bfbfbf");
            $('.overView .cutoffLine').css("background-color", "#bfbfbf");
            $('.overView .circle').css("background-color", "#7f7f7f");
        }

    });

}

	function progress1(time,from,to){			
	    var increment = (Math.abs(to-from))/(time/20);
		var tmpWidth = from;
		var timer = setInterval(function(){
			if(from<to)
				tmpWidth+=increment;
			else
				tmpWidth-=increment;
			if(tmpWidth>100)
				tmpWidth=100;
			if(tmpWidth<0)
				tmpWidth=0;
				$('.progressMove1').css("width",tmpWidth+'%');
			if((from<to&&tmpWidth>=to)||(from>=to&&tmpWidth<=to))
			{
			     clearInterval(timer);	
				 moldCloseEnd = 1;
				 moldOpenEnd = 1;	
			}
			}, 20); 	
			
		}
	function progress2(time,from,to){			
	    var increment = (Math.abs(to-from))/(time/20);
		var tmpWidth = from;
		var timer = setInterval(function(){
			if(from<to)
				tmpWidth+=increment;
			else
				tmpWidth-=increment;
			if(tmpWidth>100)
				tmpWidth=100;
			if(tmpWidth<0)
				tmpWidth=0;
				$('.progressMove2').css("width",tmpWidth+'%');
			if((from<to&&tmpWidth>=to)||(from>=to&&tmpWidth<=to))
						{
			     clearInterval(timer);	
				 ejectorFwdEnd = 1;
				 ejectorBwdEnd = 1;	
			}			
			}, 20); 	
			
		}
	function progress3(time,from,to){			
	    var increment = (Math.abs(to-from))/(time/20);
		var tmpWidth = from;
		var timer = setInterval(function(){
			if(from<to)
				tmpWidth+=increment;
			else
				tmpWidth-=increment;
			if(tmpWidth>100)
				tmpWidth=100;
			if(tmpWidth<0)
				tmpWidth=0;
				$('.progressMove3').css("width",tmpWidth+'%');
			if((from<to&&tmpWidth>=to)||(from>=to&&tmpWidth<=to))
		{
			     clearInterval(timer);	
				 injectionFwdEnd = 1;
				 injectionBwdEnd = 1;	
			}
			}, 20); 	
			
		}
	function progress4(time,from,to){			
	    var increment = (Math.abs(to-from))/(time/20);
		var tmpWidth = from;
		var timer = setInterval(function(){
			if(from<to)
				tmpWidth+=increment;
			else
				tmpWidth-=increment;
			if(tmpWidth>100)
				tmpWidth=100;
			if(tmpWidth<0)
				tmpWidth=0;
				$('.progressMove4').css("width",tmpWidth+'%');
			if((from<to&&tmpWidth>=to)||(from>=to&&tmpWidth<=to))
			{
			     clearInterval(timer);	
				 carriageFwdEnd = 1;
				 carriageBwdEnd = 1;	
			}		
			}, 20); 	
			
		}
function GetQueryString(name) {

    var reg = new RegExp(name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) 
        return unescape(r[1]); 
    return null;

}