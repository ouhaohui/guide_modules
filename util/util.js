require.config({
    baseUrl:"../",
    paths:{
       
    }
               });
define(function(){
   function lightingOffset(lightObject){
			var obOffset = $(lightObject).offset();
			var witdh = pxToInt($(lightObject).css("width"));
				return {"x":obOffset.left + witdh,"y":obOffset.top};
		}	
    function getTransform(object,type){
			var obTraform = object.attr("transform").replace(","," "),
				scale = obTraform.substring(obTraform.indexOf("scale(")+6,obTraform.lastIndexOf(")")),
				bg = object.attr("fill");
			var transformAttr = obTraform.substring(obTraform.indexOf("transform(")+11,obTraform.indexOf(")"));
            if(transformAttr.match(" ") || transformAttr.match(" ") ==" "){
				left = obTraform.substring(obTraform.indexOf("(")+1,obTraform.indexOf(" "));
				ttop = obTraform.substring(obTraform.indexOf(" ")+1,obTraform.indexOf(")"));
			}else{
				left = transformAttr;
				ttop = null;
			}
			var result;
			switch (type){
				case "left":
				return parseFloat(left);
				case "top":
				return parseFloat(ttop);
				case "scale":
				return parseFloat(scale);
				case "fill":
				return bg;
				default:
				    result = {"left":parseFloat(left),"top":parseFloat(ttop),"scale":parseFloat(scale),"bg":bg};
					return result;
		}
}

	function pxToInt(px){
		var pxObj = px;
		pxObj = pxObj.substring(0,px.indexOf("px"));
		return parseInt(pxObj);
	}	
	function isSvg(object)
	{
		var matchResult= object.match("svg");
		if(matchResult){
			return true;
		}
		return false;
	}
    
    function preloadimages(arr){ // 预加载图片   
    var newimages=[], loadedimages=0
    var postaction=function(){}  //此处增加了一个postaction函数
    var arr=(typeof arr!="object")? [arr] : arr
    function imageloadpost(){
        loadedimages++
        if (loadedimages==arr.length){
            postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
        }
    }
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image()
        newimages[i].src=arr[i]
        newimages[i].onload=function(){
            imageloadpost()
        }
        newimages[i].onerror=function(){
            imageloadpost()
        }
    }
    return { //此处返回一个空白对象的done方法
        done:function(f){
            postaction=f || postaction
        }
    }
}
    
    return{
        "lightingOffset":lightingOffset,
        "getTransform":getTransform,
        "pxToInt":pxToInt,
        "isSvg":isSvg,
        "preloadimages":preloadimages
    }
})
/*require(['jquery'],function($){
    console.log(123);
});*/