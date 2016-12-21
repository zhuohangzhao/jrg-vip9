/**
 * Created by dell on 2016/12/7.
 */



var runBall = (function g(){

    var  clock = true,
        widthMin=40,
        heightMin=40;


    return {init : function spotMove(spot,wrap,width,height,top,left){

        wrap.setAttribute('style','position:fixed;width:'+width+'px;'+'height:'+height+'px;top:'+top+'px;left:'+left+'px;');


        spot.addEventListener('mousedown',function(){
            clock = false;
        });

        window.addEventListener('mousemove',function move(e){
            var X = e.clientX;
            var Y = e.clientY;

            if(Y<=0&&!clock&&e.button===0){
                wrap.style.top=0;
                wrap.style.left=(X-widthMin/2)+'px';
            }
            else if(Y>=(window.innerHeight)&&!clock&&e.button===0){
                wrap.style.top=window.innerHeight-widthMin+'px';
                wrap.style.left=(X-widthMin/2)+'px';
            }
            else if(X<=0&&!clock&&e.button===0){
                wrap.style.top=(Y-heightMin/2)+'px';
                wrap.style.left=0;
            }
            else if(X>=(window.innerWidth)&&!clock&&e.button===0){
                wrap.style.top=(Y-heightMin/2)+'px';
                wrap.style.left=window.innerWidth-widthMin+'px';
            }
            else if(!clock&&e.button===0){
                wrap.style.top=(Y-heightMin/2)+'px';
                wrap.style.left=(X-widthMin/2)+'px';
            }
        });
        window.addEventListener('mouseup',function(){
            clock = true;
        });
    }}
})();
