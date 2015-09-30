require.config({
    baseUrl:"guide_modules",
    paths:{
        "graphs":"graphs/graphs",
        "util"  : "util/util",
        "event" : "event/event"
    }
    
});
define(['graphs','util','event'],function(graphs,util,event){
util.preloadimages(["../../templates/default/assets/image/wheel1.png","../../templates/default/assets/image/wheel2.png","../../templates/default/assets/image/wheel3.png","../../templates/default/assets/image/wheel4.png"]);
    (function init(){
		 	$(".event-box").addClass("guide-object");
		 	$(".signals").addClass("guide-object");
		 	var ob = $(".capi-transition");
		 	for(var i=0;i<ob.length;i++){
		 		$(".capi-transition").eq(i).addClass("guide-object");
		 	}
		 	$(".top-chart>svg").attr("class","guide-object");
		 })();
    
    var guide = function(optionJson){//option{ "guideObject",{{step1操作对象，step2操作对象，..}，{step1操作对象，step2操作对象，..}}，"eventObject"{触发事件对象}}
	return new guide.prototype.initGuide(optionJson);
}

guide.prototype = {
	initGuide:function(optionJson){
		this.part = 2;
		this.step = 0;
		this.stepNode = 0;
		this.interval;
		this.optionJson = optionJson  || { "guideObject":[[[]]]};
		if(!$("body>div").hasClass("mask")){
	 		$("body").append($("<div id=\"mask\" class=\"mask\"><div class=\"exitIcon\" unselectable=\"on\"><img src=\"../../templates/default/assets/image/exit.png\"/></div></div>"));
	 	}else{
	 		$(".mask").append($("<div class=\"exitIcon\" unselectable=\"on\"><img src=\"../../templates/default/assets/image/exit.png\"/></div>"));
	 	}
        this.initEvent();
        graphs.createGraph();
        return this.begain();
	},
	enter:function(enterObject){
		var enterMask = "<div class=\"dialog-mask\"></div>";
		enterMask = $(enterMask).css("height",$(enterObject).css("height"));
		enterMask = $(enterMask).css("cursor","pointer");
		$(enterObject).append(enterMask);
		$(enterObject).addClass("light-div");
		createArrow(enterObject,9,9);
		$(".dialog-mask").click(function(){
			window.location.href = "http://www.yuncaijing.com/help/guide";
		});
	},
	begain:function(){
		var part = this.part,
			step = this.step;
		this.partObject = this.optionJson.guideObject[part];
		this.guideObject = this.optionJson.guideObject[part][step].step;
        this.delayTime = this.optionJson.guideObject[part][step].delayTime;
		this.partLeght = this.optionJson.guideObject.length;
		this.stepLeght = this.optionJson.guideObject[part].length;
		this.nodeLeght = this.optionJson.guideObject[part][step].step.length;
		this.blink();
	},
	blink:function(){//业务无法抽象成组件，这是核心动画控制器
		var $this = this;
		function animateFun(){
			var	blinkObject = $($this.guideObject[$this.stepNode]);
			$this.point("redraw");
			$(".light-dialog").removeClass("light-dialog");
			if($this.guideObject[$this.stepNode] == "mask"){
				$this.maskEvent();
			return $this.nextStepNode();
			}
			if(util.isSvg($this.guideObject[$this.stepNode])){
				blinkObject.attr("class","guide-object light-div");
				remove();
				return $this.nextStepNode();
			}
			if($this.guideObject[$this.stepNode] == ".exitIcon"){
				return $this.nextStepNode();
			}
			blinkObject.addClass("light-div");
            $this.userEvnet();
			return $this.nextStepNode();
		}
		 this.interval = setInterval(animateFun,this.delayTime);
	},
	point:function(type){//箭头指向控制器
		var pointObject = this.guideObject[this.stepNode];
        var $this = this;
		if(util.isSvg(pointObject) || !pointObject){
			return;
		}
		if(type == "redraw"){
			this.point("remove");
            function fn(){
             $this.nextStep();
            }
			graphs.createArrow(pointObject,this.part,this.step,this.stepNode).done(event.scrollFun(fn));
            //.done(event.scrollFun(this.nextStep))
			return;
		}
		if(type == "remove"){
			$(".guide-arrow-div").remove();
			return;
		}
		if(type == "notice"){
			graphs.createArrow("mask");
			return;
		}
		if(type == "replay")
		{
			$(".guide-arrow-div").removeClass("arrow-animate");
			setTimeout("$('.guide-arrow-div').addClass('arrow-animate')",50);
		}
		
	},
	userEvnet:function(){
        var $this = this;
        $(".light-div").one("click",function(){
            event.graphfn($this.guideObject[0]);//
            $this.nextStep();
        });
        
	},
    maskEvent:function(){
        var $this = this;
        $("body").one("dblclick", ".dbclick-div,.mask", function(e) {
                var partOb = $this.guideObject;
                console.log(partOb[0]);
                function callback() {
                    console.log($(".light-div"));
                    $(".top-chart>svg").trigger("dblclick");
                    $this.nextStep();
                }
                if (partOb) {
                    if (partOb[0] == "mask") {
                        event.lightDialog("mask");
                        setTimeout(callback, 1500);
                    }
                }

            });
    },
    initEvent : function(){
         var $this = this;
         $(".exitIcon").click(function(event) {
                if (event.currentTarget.className == "exitIcon") {
                    return $this.quit();
                }
            });

            $('.mask').bind("selectstart", function() {
                return false;
            });
    },
	nextStep:function(){
		this.step = this.step + 1;
		$(".light-div").removeClass("light-div");
		$(".top-chart>svg").attr("class","guide-object"); 
		this.point("remove");
		if(this.step >= this.stepLeght)
		{
			this.end();
		}
		setTimeout(function(){
            event.lightDialog();///
        },50);// 弹窗动画添加
		this.begain();
	},
	nextStepNode:function(){
		this.stepNode++;
		if(this.stepNode >= this.nodeLeght)
			{
				this.stepNode = 0;
				clearInterval(this.interval);
			}
	},
	end:function(){
		$(".light-div").removeClass("light-div");
		this.step = 0;
		this.part = this.part + 1;
		if(this.part >= this.partLeght){
		}
	},
	quit:function(){
		window.location.href = "http://www.yuncaijing.com";
	}
}
guide.prototype.initGuide.prototype = guide.prototype;
    
    return{
        "guide":guide
    }
})