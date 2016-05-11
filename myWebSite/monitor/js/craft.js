
var keyArrConnective = new Array();

$(document).ready(function(e) {
	   var userID = getCookie('userID');
	/*   if(userID == null)
	         location.href = "../login.aspx?goto=clamp";*/
       $("#admin_settings").html(userID);

	   $( "#settings, #admin_settings" ).on( "click", function()//退出下拉菜单
		{
				 $("#admin").toggleClass("admin-color");
				$( "#menu" ).slideToggle( "fast","linear" );
		});
	

	   $('.selectbox').wrap('<div class="select_wrapper"></div>')
	   $('.selectbox').parent().prepend('<span>' + $(this).find(':selected').text() + '</span>');
	   $('.selectbox').parent().children('span').width($('.select_wrapper').width());
	   $('.selectbox').css('display', 'none');
	   $('.selectbox').parent().append('<ul class="select_inner"></ul>');
	   $('.selectbox').children().each(function () {
	       var opttext = $(this).text();
	       var optval = $(this).val();
	       $('.selectbox').parent().children('.select_inner').append('<li id="' + optval + '">' + opttext + '</li>');
	   });
	   $('.selectbox').parent().on('click', function () {
	       $(this).find('ul').slideToggle('fast');
	   });
	  
	
	var quantityPerPage = 5;
	var pageNum=1;
	getMoldData("moldData", "",1,quantityPerPage);
    
   $($('.context ul')).on("click","span" , function(){	   
	   if($(this).html().indexOf("前一页")!=-1)
	   {
		   pageNum =parseInt($(".context ul .active").html())-1;
		   getMoldData("moldData", "",pageNum,quantityPerPage);
		   
		}
		else if($(this).html().indexOf("后一页")!=-1)
		{
			pageNum =parseInt($(".context ul .active").html())+1; 
			getMoldData("moldData", "",pageNum,quantityPerPage); 
		}
		else
		{
			pageNum =parseInt($(this).html());
			getMoldData("moldData", "",pageNum,quantityPerPage);
			}
		
   
	   	   
	   });  
	$('.title-text .showSelect li').click(function(){
		quantityPerPage = $(this).html();
		$('.title-text .showSelect li').removeClass("active");
		$(this).addClass("active");
		getMoldData("moldData", "",1,quantityPerPage); 
		});   
	   
	   
	$($('.context table')).on("click","tr" , function(){
	
		$('#moldID').val($($(this).children('td:nth-child(2)').children('div')).html());
		showDlg();
	});
	
	$('#upload').click(function(){
		getDataWithPost();
		showDlg2();
		
		});
    
	
	
	
	
});
function testData(){
	
	location.href="analysis.html";
	
	}
function showDlg()
    {
        //显示遮盖的层
        var objDeck = document.getElementById("deck");
        if(!objDeck)
        {
            objDeck = document.createElement("div");
            objDeck.id="deck";
            document.body.appendChild(objDeck);
        }
        objDeck.className="showDeck";
        objDeck.style.filter="alpha(opacity=50)";
        objDeck.style.opacity=40/100;
        objDeck.style.MozOpacity=40/100;
        //显示遮盖的层end
        
        //禁用select
        hideOrShowSelect(true);
        
        //改变样式
        document.getElementById('divBox').className='showDlg';
        
        //调整位置至居中
        adjustLocation();
        
    }
 
    function cancel()
    {
        document.getElementById('divBox').className='hideDlg';
        document.getElementById("deck").className="hideDeck";
        hideOrShowSelect(false);
    }
    
    function hideOrShowSelect(v)
    {
        var allselect = document.getElementsByTagName("select");
        for (var i=0; i<allselect.length; i++)
        {
            //allselect[i].style.visibility = (v==true)?"hidden":"visible";
            allselect[i].disabled =(v==true)?"disabled":"";
        }
    }
    
    function adjustLocation()
    {
        var obox=document.getElementById('divBox');
        if (obox !=null && obox.style.display !="none")
        {
            var w=368;
            var h=400;
            var oLeft,oTop;
            
            if (window.innerWidth)
            {
                oLeft=window.pageXOffset+(window.innerWidth-w)/2 +"px";
                oTop=window.pageYOffset+(window.innerHeight-h)/2 +"px";
            }
            else
            {
                var dde=document.documentElement;
                oLeft=dde.scrollLeft+(dde.offsetWidth-w)/2 +"px";
                oTop=dde.scrollTop+(dde.offsetHeight-h)/2 +"px";
            }
            
            obox.style.left=oLeft;
            obox.style.top=oTop;
        }
    }
    

function showDlg2()
    {
        //显示遮盖的层
        var objDeck = document.getElementById("deck2");
        if(!objDeck)
        {
            objDeck = document.createElement("div");
            objDeck.id="deck2";
            document.body.appendChild(objDeck);
        }
        objDeck.className="showDeck2";
        objDeck.style.filter="alpha(opacity=50)";
        objDeck.style.opacity=40/100;
        objDeck.style.MozOpacity=40/100;
        //显示遮盖的层end
        
        //禁用select
        hideOrShowSelect(true);
        
        //改变样式
        document.getElementById('divBox2').className='showDlg2';
        
        //调整位置至居中
        adjustLocation();
        
    }
 
    function cancel2()
    {
        document.getElementById('divBox2').className='hideDlg2';
        document.getElementById("deck2").className="hideDeck2";
        hideOrShowSelect(false);
    }
    function upLoad() {
       // $('#craftName').empty();

        
        getMoldDataFileName("moldDataName");
       
		
		}
    function hideOrShowSelect2(v)
    {
        var allselect = document.getElementsByTagName("select");
        for (var i=0; i<allselect.length; i++)
        {
            //allselect[i].style.visibility = (v==true)?"hidden":"visible";
            allselect[i].disabled =(v==true)?"disabled":"";
        }
    }
    
    function adjustLocation2()
    {
        var obox=document.getElementById('divBox2');
        if (obox !=null && obox.style.display !="none")
        {
            var w=368;
            var h=400;
            var oLeft,oTop;
            
            if (window.innerWidth)
            {
                oLeft=window.pageXOffset+(window.innerWidth-w)/2 +"px";
                oTop=window.pageYOffset+(window.innerHeight-h)/2 +"px";
            }
            else
            {
                var dde=document.documentElement;
                oLeft=dde.scrollLeft+(dde.offsetWidth-w)/2 +"px";
                oTop=dde.scrollTop+(dde.offsetHeight-h)/2 +"px";
            }
            
            obox.style.left=oLeft;
            obox.style.top=oTop;
        }
    }
    

function getMoldData(command, filter,currentPageNum,quantityPerPage) {
    $.ajax({
        type: "POST",
        url: "http://www.tnet.space/monitor/clamp.aspx",
        //url: "clamp.aspx",
        data: "command=" + command + "&filter=" + filter,
        dataType: "json",
        //contentType: "application/json; charset=utf-8",

        success: function (msg) {
            var data = eval(msg);
			
			if(currentPageNum > Math.ceil(data.length/quantityPerPage)||currentPageNum<1)return;
			$(".context table").empty();
			$(".context table").append('<tr><td><div>编号</div></td><td><div>工艺名称</div></td><td><div>控制器</div></td><td><div>适用机型</div></td><td><div>日期</div></td></tr>');
				for(var i=0;i < quantityPerPage&&i<data.length;i++)
				{
					if(currentPageNum == Math.ceil(data.length/quantityPerPage)&&i>=(data.length%quantityPerPage)&&data.length%quantityPerPage)break;
					var num = i+1;
					$(".context table").append('<tr><td><div>'+num+'</div></td><td><div></div></td><td><div></div></td><td><div></div></td><td><div></div></td></tr>');
					
				}
				$(".context ul").empty();
				$(".context ul").append('<li><span >←前一页</span></li><li><span>后一页 →</span></li>');
				for(var i=0;i< Math.ceil(data.length/quantityPerPage);i++)
				{
					var num = i+1;
					$(".context ul li:last-child").before('<li><span>'+num+'</span></li>')
					
				}
				//alert(currentPageNum+" "+ i);
				
			$(".context table tr").each(function(index, element) {
				
				if(index)
				{
					$($(".context ul li span")[index]).removeClass("active");
				    
                	$($($(this).children("td")[1]).children("div")).text(data[(currentPageNum-1)*quantityPerPage+index-1]["name"]);
                	//$($($(this).children("td")[1]).children("div")).text(data[data[(currentPage-1)*quantityPerPage+index-1]["name"]);
                	$($($(this).children("td")[3]).children("div")).text(data[(currentPageNum-1)*quantityPerPage+index-1]["controllerType"]);
                	$($($(this).children("td")[4]).children("div")).text(data[(currentPageNum-1)*quantityPerPage+index-1]["date"]);

				}
            });
            	$($(".context ul li span")[currentPageNum]).addClass("active");

    

           
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }

    });

}

function getDataWithPost(filterMode,filterWord) {
    $.ajax({
        type: "POST",
        url: "http://www.tnet.space/monitor/clamp.aspx",
	   //url: "clamp.aspx",
        data: "MachineID=all" + "&UnitID=overview",
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (data) {
			

			for( key in data)
				{
					if(data[key]["connStatus"] == 1)
					{
						keyArrConnective.push(key);
					}
				}
				
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }

    });

}
function getMoldDataFileName(command, filter) {
    $.ajax({
        type: "POST",
        url: "http://www.tnet.space/monitor/clamp.aspx",
        //url: "clamp.aspx",
        data: "command="+command + "&filter="+filter,
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (data) {
            var select="";
            var selectInner="";
            
            for (var tmp in data)
            {
                select += '<option>'+data[tmp]+'</option>';
                selectInner += '<li id="' + data[tmp] + '">'+data[tmp]+'</li>';
            }

            alert(selectInner);
            $('#craftName select').empty();
            $('#craftName .select_inner').empty();
            $('#craftName select').append(select);
            $('#craftName .select_inner').append(selectInner);

            $('.select_inner').parent().find('li').on('click', function () {
                var cur = $(this).attr('id');

                $('.selectbox').parent().children('span').text($(this).text());
                $('.selectbox').children().removeAttr('selected');
                $('.selectbox').children('[value="' + cur + '"]').attr('selected', 'selected');

            });


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