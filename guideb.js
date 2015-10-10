require(['guide'],function(guide){
   var guideO = guide.guide({
	"guideObject": [
		[
            {"step":[".animate:eq(0)"],"delayTime":100},
            {"step":[".capi-transition:eq(0)"],"delayTime":1500},
			{"step":["mask"],"delayTime":1500}
		],
		[
            {"step":[".rhombus"],"delayTime":1000},
            {"step":[".rect"],"delayTime":1900},
            {"step":[".triangle"],"delayTime":1900},
            {"step":[".circle"],"delayTime":1900},
            {"step":["mask"],"delayTime":1900},
		],
		[
            {"step":["end"],"delayTime":800},
            {"step":[".exitIcon"],"delayTime":1100},
		]
	]
});
})