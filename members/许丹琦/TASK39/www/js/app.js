requirejs.config({
	baseUrl:'js/lib',
	paths:{
		app:'../app',
		jquery:'jquery'
	}
});

requirejs(['jquery','app/carousel','app/Exposure','app/LoadMore'],
	function($,carousel,Exposure,LoadMore){
		new carousel($('.carousel'));
		new LoadMore($('.wrap'))
		$('.about-description li').each(function(idx,node){
	new Exposure($(node),function($node){
		$node.animate({'opacity':1},1000)
		})
	})
})