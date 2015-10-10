
define(['util/util'],function(util){
    function wheel(){
		var wheel_num=1;
		function animate(){
            //console.log(wheel_num);
			if($(".guide-mousewheel").length < 1){
				return;
			}
			$(".guide-mousewheel").attr("src","../../templates/default/assets/image/wheel"+wheel_num+".png");
            wheel_num++;
			if(wheel_num==5){
				wheel_num = 1;
			}
			return setTimeout(animate,30);
		}
		return setTimeout(animate,30);
	}
    function createArrow(lightObject,part,step,stepNode){ //lightObject 指向对象，part 动画对象的part，step = guide.step stepNode = guide.stepNode
		 	var text = text ||"text",
		 		arrow = "<div class=\"guide-arrow-div\"></div>",
		 		textIcon="<img class=\"guide-text\"src='../../templates/default/assets/image/"+part+step+".png'width=\"337\" height=\"137\"/>",
		 		doubleclick = "<div class=\"guide-dbclick\"><div class=\"dbclick-next\"></div></div>",
		 		arrowIcon="<img class=\"guide-arrow\"src='../../templates/default/assets/image/arrow.png'width=\"191\" height=\"109\"/>",
		 		mousewheel = "<img class=\"guide-mousewheel\" src=\"\" width=\"337\" height=\"137\"/>";
		 
		 	if(lightObject == "mask"){
		 		textIcon = $(textIcon).attr("src","../../templates/default/assets/image/mask.png")
		 		arrow = $(arrow).append(doubleclick).append(textIcon);
		 		$(arrow).addClass("dbclick-div");
		 		$(textIcon).css("float","left");
		 		$(textIcon).css("width",437);
		 		$("body").append(arrow);
		 		$(".guide-arrow-div").css("opacity","1");
		 		$(".guide-arrow-div").css("right","35%");
		 		$(".guide-arrow-div").css("top","40%");
		 	}
		 	else if(lightObject == "end"){
		 		var textIcon1 = $(textIcon).attr("src","../../templates/default/assets/image/mousewheel.png"),
		 			arrow1 = $(arrow).append(mousewheel).append(textIcon1),
		 			arrow2 = $(arrow).append(arrowIcon);
		 		
		 		$("body").append(arrow1);
		 		 wheel();
		 		$(arrow1).css("right","40%");
		 		$(arrow1).css("top","40%");
		 		$(textIcon1).css("float","left");
		 		
		 		$(arrow2).css("bottom","110px");
		 		$(arrow2).css("left","170px");
		 		$(arrow2).css("transform","rotate(-55deg)");
		 	}
		 	else if(lightObject == ".exitIcon"){
		 		var textIcon1 = $(textIcon).attr("src","../../templates/default/assets/image/end.png"),
		 			arrow1 = $(arrow).append(textIcon1),
		 			arrow2 = $(arrow).append(arrowIcon);
		 		
		 		$("body").append(arrow1);
		 		$("body").append(arrow2);
		 		$(arrow1).css("right","40%");
		 		$(arrow1).css("top","40%");
		 		$(textIcon1).css("float","left");
		 		
		 		$(arrow2).css("bottom","110px");
		 		$(arrow2).css("left","170px");
		 		$(arrow2).css("transform","rotate(-55deg)");
		 	}else{
                arrow = $(arrow).append(arrowIcon).append(textIcon);
		 	    $("body").append(arrow);
		 	    var positionJson = util.lightingOffset(lightObject);
		 	    $(".guide-arrow-div").css("left",positionJson.x+5);
		 	    $(".guide-arrow-div").css("top",positionJson.y-20);
            }
            return {
                    done:function(f){
                        if(lightObject == "end"){
                            postaction=f || function(){}
                        }
                    }
                } 
		 	
		 }
    
    function createRhombus(){
    	var rhombus = "<div class=\"rhombus red \" onclick=''></div>";
    	var top = $(".top-chart>svg").css("height");
    	var rhombusSvg = $(".capi-main>g").eq(6).children();
			top = util.pxToInt(top);
			top = (52 - top);
    	$(".rhombus").remove();
    	//for(var i=1;i<2;i++){
    		var rhombusSvg = rhombusSvg.eq(1);
                rhombusTraform = util.getTransform(rhombusSvg),
                left = rhombusTraform.left,
    			scale = rhombusTraform.scale;
    		left = left+3 +"px"; //模拟图形定位
    		$("body").before($(rhombus));
        var graphObject = $(".rhombus").eq(0);
    			var obWidth = util.pxToInt(graphObject.css("width"))*scale,//自适应
    			obHeight = util.pxToInt(graphObject.css("height"))*scale,//自适应
    			rtop = top-obHeight*0+"px";//模拟图形定位
    		graphObject.css("width",obWidth);
    		graphObject.css("height",obHeight);
            var offset = util.lightingOffset(rhombusSvg);
            graphObject.css("top",offset.y + 3*scale/2);
    		graphObject.css("left",offset.x + 3*scale/2);
    		
    	//}
    	//return rhombusSvg;
		}
    
    function createRect(){
    	var rectOb = "<div class=\"rect \" onclick=''></div>";
    	var rectSvg = $(".capi-main>g").eq(3).children();
    	var top = $(".top-chart>svg").css("height"),
    		left,
    		bugTop = 0;
    		top = util.pxToInt(top);
    	//for(var i=15;i<18;i++){
    		var svgRect = rectSvg.eq(20).find("rect").eq(1),
                rectTop = svgRect.attr("y"),
    			rectWidth = svgRect.attr("width"),
    			rectHeight = svgRect.attr("height"),
    			rectLeft = util.getTransform(rectSvg.eq(20),"left"),
    			rectBG = rectSvg.eq(20).attr("fill"),
    			rectTop= parseInt(rectTop) - top - bugTop  +"px";
    			//console.log(rectBG);
    		$("body").before($(rectOb));
        var graphObject = $(".rect").eq(0);
            graphObject.css("width",rectWidth);
    		graphObject.css("height",rectHeight);
        var offset = util.lightingOffset(svgRect);
    		graphObject.css("top",offset.y);
    		graphObject.css("left",offset.x);
    		
    		if(rectBG === "#33AA11" || rectBG === "#33aa11")
    		{
    			graphObject.addClass("green");
    		}else{
    			graphObject.addClass("red");
    		}
    		graphObject.css("background",rectBG);
    		//bugTop = bugTop + parseInt(rectHeight);
    	//}
    	    //return rectSvg;
    }
   function createTriangle(){
    	var triangleOb = "<div class=\"triangle \" onclick=''></div>",
            triangleSvg = $(".capi-main>g").eq(5).children().not("circle"),
            svgTop = $(".top-chart>svg").css("height"),
            offset;
    		svgTop = parseInt(svgTop.substring(0,svgTop.indexOf("px")));
    		//for(var i=0;i<4;i++){
    			var svgTriangle = triangleSvg.eq(2),//svg
                    triangleTraform = util.getTransform(svgTriangle),
                    top = triangleTraform.top,
    			 	left = triangleTraform.left,
    			 	scale =triangleTraform.scale,
    			 	bg = triangleTraform.bg;
    			$("body").before($(triangleOb));
                var graphObject =   $(".triangle").eq(0),
                    borderWidthl = util.pxToInt(graphObject.css("borderLeftWidth")),
                    borderWidthR = util.pxToInt(graphObject.css("borderRightWidth")),
                    borderWidthB = util.pxToInt(graphObject.css("borderBottomWidth"));
//                     top = top - borderWidth*2*0 - borderWidth*0.9 + 1 - svgTop;
	    		graphObject.css("borderLeftWidth",borderWidthl * scale);
                graphObject.css("borderRightWidth",borderWidthR * scale);
                graphObject.css("borderBottomWidth",borderWidthB * scale);
                offset = util.lightingOffset(svgTriangle);
	    		graphObject.css("top",offset.y);
	    		graphObject.css("left",offset.x);
                    if(bg == "#33AA11" || bg == "#33aa11")
                    {
                        graphObject.addClass("green");
                    }else{
                        graphObject.addClass("red");
                    }
    		graphObject.css("border-color","transparent transparent "+bg+" transparent");
    		//}
    		//return triangleSvg;
    }
    function createCircle(){
		var circleOb = "<div class=\"circle\" onclick=''></div>";
		var circleSvg = $(".capi-main>g").eq(5).children().not("path");
    	var svgTop = $(".top-chart>svg").css("height"),
    		left,
            offset;
        $("body").before($(circleOb));
    		svgTop = parseInt(svgTop.substring(0,svgTop.indexOf("px")));
    		//for(var i=0;i<circleSvg.length;i++){
                var svgCircle = circleSvg.eq(0),
                    circleTraform = util.getTransform(svgCircle),
    			 	scale = circleTraform.scale,
                    graphObejct = $(".circle").eq(0);
    			width = util.pxToInt(graphObejct.css("width"))*scale;
        	    		graphObejct.css("width",width);
                        graphObejct.css("height",width);
            offset = util.lightingOffset(svgCircle);
	    		graphObejct.css("top",offset.y - 0.8*scale);
	    		graphObejct.css("left",offset.x - 0.8*scale);
    		    graphObejct.css("border-color","#DD2200");
    		//}
    		//return circleSvg;
    }
    function remove(){
	 	$(".rhombus").remove();
	 	$(".rect").remove();
	 	$(".triangle").remove();
	 	$(".circle").remove();
	 }
	 
	function createGraph(){
        createRhombus();
        createRect();
        createTriangle();
        createCircle();
	}
    
    return{
        'createArrow':createArrow,
        'createGraph':createGraph,
        'remove':remove
    }
})