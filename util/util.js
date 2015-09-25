require.config({
    baseUrl:"../",
    paths:{
        'jquery':'/templates/statics/third/jquery/js/jquery.min'
    }
               });
define(['jquery'],function($){
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
    return{
        "lightingOffset":lightingOffset,
        "getTransform":getTransform,
        "pxToInt":pxToInt,
        "isSvg":isSvg
    }
})
/*require(['jquery'],function($){
    console.log(123);
});*/