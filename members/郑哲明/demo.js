$(function(){
					var $slide = $("ul.slide"),
			            $lis = $slide.children(),
			            $pre = $("a.pre"),
					    $next = $("a.next"),
					    $nav = $("ul.carousel-nav"),
			            imgWidth = $lis.width(),
					    imgCount = $lis.length;     //3
					      

					$slide.prepend( $lis.last().clone() );     //前后分别clone最后一张和第一张，保证无限循环
					$slide.append( $lis.first().clone() );
					imgRealCount = $slide.children().length;   //5
					$slide.css({
						width: imgRealCount*imgWidth,         //设置ul宽度，让图片一行排列
						left: 0 - imgWidth                    //默认排列，第一张从下标0（其实是clone来的最后一张）开始显示，所以ul整体向左移动一张图片的宽度距离（从真正的第一张开始）
					});

					var curIdx = 0,                           //设置图片序号，初始值为0（范围0-3）
						isAnimate = false;                    //给动画加锁，如果在动画时，反复点击无效

					$pre.on('click',function(){
						playPre();
					});

					$next.on('click',function(){
						playNext();
					});

					$nav.find("li").on('click',function(){     //给图片底部小横线添加事件
						var idx = $(this).index();             //获取点击小横线时的坐标
						if(idx > curIdx){
							playNext(idx - curIdx);            //坐标范围0-3，curIdx图片序号也是0-3，比大小决定ul移动方向和移动几格
						}else if(idx < curIdx){
							playPre(curIdx - idx);
						}
					});

					$cancel.on('click',function(){
						stopAuto();
					});


					autoPlay();
					function autoPlay(){                     //自动轮播
						clock = setInterval(function(){      //这里的clcok是全局变量
							playNext();
						},3000);
					}

					function stopAuto(){
						clearInterval(clock);
					}

					function playPre(num){                  
						var num = num || 1;                 //参数num为ul移动几格，传参数则移动num格，否则默认1格

						if(isAnimate) return;               //如果在动画则点击无效
						isAnimate = true;
						
						$slide.animate({left: '+=' + (imgWidth*num)},500,function(){     //ul向右移动，所以left值变大
								curIdx = (imgCount + curIdx - num) % imgCount;           //当前展示的图片序号
								if(curIdx == imgCount-1){                                //当pre到边缘（列表第一张图片，clone的序号3）
									$slide.css({left: 0 - imgWidth * imgCount});         //修改ul样式，立即归位至真正的序号3（直接修改css样式没有动画效果）
								}
								isAnimate = false;                                       //结束动画
								setNav();                                                //设置对应小横线样式
						});	
					}

					function playNext(num){
						var num = num || 1;

						if(isAnimate)  return;
						isAnimate = true;
							
						
						$slide.animate({left: '-=' + (imgWidth*num)},function(){        //ul向左移动
								curIdx = (curIdx + num) % imgCount;
								if(curIdx == 0){                                        //当next到最后（clone的序号0）
									$slide.css({left: 0-imgWidth});                     //ul立即归位至初始状态
									curIdx = 0;
								}
								isAnimate = false;
								setNav();
						});
					}

					function setNav(){
						$nav.find("li")
							.removeClass('active')
							.eq(curIdx).addClass('active');
					}
		});
		