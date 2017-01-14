$(function(){
	//当文档加载完成才会执行ready()

	$(window).on('resize', resize).trigger('resize');//trigger让window对象立即出发resize事件

	function resize(){
		var windowWidth = $(window).width();//获取屏幕宽度

		var isSmallScreen = windowWidth < 768;

		$('#main-ad > .carousel-inner > .item').each(function(index, node){
			var $node = $(node);
			var url = $node.data(isSmallScreen ? 'image-xs' : 'image-lg');

			$node.css('backgroundImage', 'url("' + url + '")');
			// 大屏使用背景图(高度不缩放)，小屏使用img(可以宽高等比缩放)
			
			if(isSmallScreen) {
				$node.html('<img src="' + url + '" alt="" />');
			} else {
				$node.empty();
			}
		});
	}

})