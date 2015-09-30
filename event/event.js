requirejs.config({
    baseUrl:"guide_modules",
    paths:{
        'util':"util/util"
    }
});
define(['util'],function(util){
function scrollFun(fn){
		var dom = document.getElementsByTagName("body")[0],
			num = 0,
            fn = fn || function(){},
            isIE=navigator.userAgent.match(/MSIE (\d)/i);
		isIE=isIE?isIE[1]:undefined;
		var isFF=/FireFox/i.test(navigator.userAgent);
		if(isIE<9){
			 dom.attachEvent("onmousewheel",function(){
		  	  if(num < 1){
                  console.log(fn);
					 fn();
					 num++;
				}
		   	 return false;
		  });
		}
		else if(!isFF){
			dom.addEventListener("mousewheel",function(e){
		   	if(num < 1){
                console.log(fn);
					 fn();
					 num++;
				}
		    e.preventDefault();
		  },false);
		}
		else{
			dom.addEventListener("DOMMouseScroll",function(e){
				if(num < 1){
                    console.log(fn);
					 fn();
					 num++;
				}
		    e.preventDefault();
		  },false);
		}
		  
	}

function lightDialog(ob){
		var dialog = $("body>div:last"),
			dialogMask = "<div class=\"dialog-mask\"></div>"; 
			function maskEvent(eob){
				$(eob).dblclick(function(e){
				//console.log(e.target);
				e.stopPropagation();
		});
			}
		if(ob == "mask")
		{
			return $(".capi-notice,.capi-timeChart,.capi-trade,.capi-evInfo").addClass("light-dialog");
		}
		if(dialog.hasClass("capi-notice")||dialog.hasClass("capi-timeChart")||dialog.hasClass("capi-trade")||dialog.hasClass("capi-evInfo")){
			dialogMask = $(dialogMask).css("height",dialog.css("height"));
			dialog.append(dialogMask);
			maskEvent(dialogMask);
			dialog.addClass("light-dialog");
		}
	}

	function graphfn(stepNodeObject){ // 事件要不再依赖 guideO
			var eventObject = stepNodeObject || "";
				
			if(eventObject.match("rhombus")){
				$(".capi-main>g").eq(6).children().eq(1).trigger("click");
			}
			if(eventObject.match("triangle")){
				$(".capi-main>g").eq(5).children().not("circle").eq(2).trigger("click");
			}
			if(eventObject.match("rect")){
				$(".capi-main>g").eq(3).children().eq(20).find("rect").eq(2).trigger("click");
			}
			if(eventObject.match("circle")){
				$(".capi-main>g").eq(5).children().not("path").eq(0).trigger("click");
			}
		};
    
    return{
        'scrollFun':scrollFun,
        'lightDialog':lightDialog,
        'graphfn':graphfn
    }
})
