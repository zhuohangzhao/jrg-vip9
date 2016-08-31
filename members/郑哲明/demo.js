function isVisible($node) {
    var offTop = $node.offset().top         //$node当前位置的坐标，以文档为参照
    var $nodeH = $node.height()             //$node高度
    var curTop = $(window).scrollTop()      //window上边缘离页面顶部的距离
    var winH = $(window).height()           //window高度
    if ((curTop + winH) > offTop && curTop <= (offTop + $nodeH)) {
        return true
    } else  return false
}
var $isVisible
$(window).on('scroll',function() {
    if ($isVisible) return
    if (isVisible($node)) {
        console.log(true)
        $isVisible = true
    }
})