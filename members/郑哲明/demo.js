// 要求：html 里有多个carousel，当调用时启动全部的 carousel

//方式1
//通过插件的方式启动所有轮播
$('.carousel').carousel();

//方式2
//通过创建对象的方式启动所有轮播
$('.carousel').each(function(){
    new Carousel($(this));
});