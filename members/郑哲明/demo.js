function waterFallPlace($nodes){
	var	nodeWidth = $('.item').outerWidth(true),
		colNum = parseInt($('#pic-ct').width()/nodeWidth),
		marginLeft = ($(window).width()-(nodeWidth*colNum))/2;
		
		// console.log(nodeWidth,marginLeft,nodeWidth*colNum)
if(colSumHeight.length===0){
	for(var i=0; i<colNum; i++){
		colSumHeight.push(0)
	}
}
	$nodes.each(function(){
		var $cur = $(this);

		$cur.find('img').on('load',function(){
			var idx = 0,
				  minSumHeight = colSumHeight[0];

			for(var i=0;i<colSumHeight.length; i++){
				if(colSumHeight[i] < minSumHeight){
					idx = i;
					minSumHeight = colSumHeight[i];
				}
			}

			$cur.css({
				left: nodeWidth*idx+marginLeft,
				top: minSumHeight,
				opacity: 1
			});

			colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];
			$('#pic-ct').height(Math.max.apply(null,colSumHeight));
			})
		
	});

}