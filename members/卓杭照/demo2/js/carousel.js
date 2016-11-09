
 
			var $imgCt = $('.img-ct')
			var	$imgLi = $imgCt.children()
	 		var	$bullet = $('.bullet')
	 		var $firstImg = $imgCt.find('li').first()
	 		var $lastImg = $imgCt.find('li').last()
	 		var $imgWidth = $firstImg.width()
	 		var curPageIndex = 0					// 默认第一张图片，下标初始值为 0 （范围0-3）
	 		var imgLength = $imgCt.children().length					// imgLength = 4
	 		var isAnimate = false										// 状态锁，重复点击无效

	 		$imgCt.append($firstImg.clone())
	 		$imgCt.prepend($lastImg.clone())

	 		var imgRealLength = $imgCt.width($firstImg.width() * $imgCt.children().length) 		 // imgRealLength = 6
	 		$imgCt.find("li").css({ width: $imgWidth});
		    $imgLi.find("img").css({ width: $imgWidth});
			$imgCt.css({left:0-$imgWidth,width:imgRealLength}) // left 默认第一张图片，初始值为 -300



	 		$bullet.find('li').on('click',function(){	
	 			var idx = $(this).index()	// 点击bullet时候，获取 下标
	 			if(idx>curPageIndex){
	 				playNext(idx-curPageIndex)
	 			}else{
	 				playPre(curPageIndex-idx)
	 		}

	 	})
	 		 setBg(1)
	 		 autoPlay()

	 		 function setBg(num){
	 		 	var num = num|| 0
	 		 	var $li = $imgCt.children().eq(num)
	 		 	var $cover = $li.find('.cover')
	 		 	var imgUrl = $cover.attr('data-bg-img')
	 		 	if($li.data("isBgSet")) return
	 		 	$cover.css('background-image','url('+imgUrl+')' )
	 		 	$li.data('isBgSet',true)
	 		 }

	 		function playNext(num){
	 			var num = num || 1		//	参数num是点击 bullet小图标格数，默认 1格
	 			if(isAnimate)return
	 			isAnimate = true
	 			
	 			setBg(curPageIndex+2)
	 			$imgCt.animate({
	 				left:"-="+$imgWidth*num
	 			},function(){
	 				curPageIndex=(curPageIndex+num)%imgLength   // imgLength 初始值 
	 				if(curPageIndex === 0){
	 					$imgCt.css({left:0-$imgWidth})
	 				 	curPageIndex = 0
	 				}
	 				isAnimate = false
	 				setBullet()
	 			})	
	 		}

	 		function playPre(num){
	 			if(isAnimate)return
	 			isAnimate = true
	 			var num = num || 1
	 			setBg(curPageIndex)
	 			$imgCt.animate({
	 				"left":'+='+$imgWidth*num
	 			},function(){
	 				curPageIndex = (curPageIndex-num+imgLength)%imgLength
	 				if(curPageIndex ===	imgLength-1){    //  图片下标是3时候
	 					$imgCt.css({left:0-(imgLength*$imgWidth*num)})
	 				}
	 				isAnimate = false
	 				setBullet()
	 			})					
	 		}

	 		function setBullet(){
	 			$bullet.children().removeClass('active').eq(curPageIndex).addClass('active')
	 		}


	 		function autoPlay(){
	 			clock = setInterval(function(){
	 				playNext();
	 			},4000)
	 		}
	 		function stopAuto(){
				clearInterval(clock);
			}
