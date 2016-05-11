
/*window.onload = function(){
	drawPie();
	}; */


/*function drawPie(){
	var timer;
var increment= new Array();
var drawPieTime = new Array();
var timeSlice = 5;
var radius=40;
var width = 3;
var text= new Array();

$('.pie').each(function(index,element) {
    	text[index]=$(element).text();
		drawPieTime[index]=text[index].substring(0,text[index].length-2)*8; //100% 需要0.8秒
	   $(element).append('<canvas width="80px" height="80px" >'+text[index]+'</canvas>');
	   $(element).empty();
	   increment[0]=0;
	  
	
	
});

    timer = setInterval(function(){
		if(increment[0]>drawPieTime[0]){
			clearInterval(timer);
		}else{
			
					
			var percentage = increment[0]/timeSlice;
			percentage=percentage/100; 
			drawProcess(text[0],percentage,radius,width);
			increment[0]+=timeSlice;
			

		}
	},timeSlice);
  

}*/
function drawPie(){
	var timer;
var increment=0;
var drawPieTime;
var timeSlice = 5;
var radius=40;
var width = 3;
var text;


		text='50%';
		drawPieTime=text.substring(0,text.length-1)*8; //100% 需要0.8秒
	  // $('.pie').append('<canvas width="80px" height="80px" >20%</canvas>');
	   increment=0;
    timer = setInterval(function(){
		if(increment>drawPieTime){
			clearInterval(timer);
		}else{
			
		
			var percentage = increment*drawPieTime/timeSlice;
			percentage=percentage/800; 
/*			alert(percentage+' '+drawPieTime+' '+increment);
*/			drawProcess(text,percentage,radius,width);
			increment+=timeSlice;

		}
	},timeSlice);
  

}


function drawProcess(text,process,radius,width) {  
    // 选出页面上所有class为process的canvas元素,然后迭代每一个元素画图(这里用Jquery的选择器选的)  
    $('.pie canvas').each(function() {                  
            // 一个canvas标签  
        var canvas = this;  
            // 拿到绘图上下文,目前只支持"2d"  
        var context = canvas.getContext('2d');  
		var backgroundColor = $(".above").css("background-color");
		
    // 将绘图区域清空,如果是第一次在这个画布上画图,画布上没有东西,这步就不需要了  
        context.clearRect(0, 0, radius*2, radius*2);  
          
    // ***开始画一个灰色的圆  
        context.beginPath();  
            // 坐标移动到圆心  
        context.moveTo(radius, radius);  
            // 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
        context.arc(radius, radius, radius, 0, Math.PI * 2, false);  
        context.closePath();  
            // 填充颜色  
        context.fillStyle = '#ffffff';  
        context.fill();  
            // ***灰色的圆画完  
          
        // 画进度  
        context.beginPath();  
            // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
        context.moveTo(radius, radius);  
            // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
        context.arc(radius, radius, radius, 0, Math.PI * 2 * process / 100, false);  
        context.closePath();  
        context.fillStyle = '#e74c3c';  
        context.fill();  
  
        // 画内部空白  
        context.beginPath();  
        context.moveTo(radius, radius);  
        context.arc(radius, radius, radius-width, 0, Math.PI * 2, true);  
        context.closePath();  
        context.fillStyle = backgroundColor;  
        context.fill();  
          
  /*  // 画一条线  
        context.beginPath();  
        context.arc(24, 24, 18.5, 0, Math.PI * 2, true);  
        context.closePath();  
            // 与画实心圆的区别,fill是填充,stroke是画线  
        context.strokeStyle = '#ddd';  
        context.stroke();  */
		//在中间写字
              context.font = "bold 16px Arial";  
        context.fillStyle = '#e74c3c';  
        context.textAlign = 'center';  
        context.textBaseline = 'middle';  
        context.moveTo(radius, radius);  
        context.fillText(text, radius, radius);      
 
		});
}