
     function GoTop($ct){
        this.$ct = $ct;
        this.target = $('<div class="go-top">回到顶部</div>');
    }
    GoTop.prototype.createNode = function(){
        this.$ct.append(this.target);
    }
    GoTop.prototype.bindEvent = function(){
        $(window).on('scroll',function(){
            if($(window).scrollTop()>100){
                $('.go-top').css('display','block');
            }else{
                $('.go-top').css('display','none');
            }
        })

        this.target.on('click',function(){
            $(window).scrollTop(0);
        });
    }
    var goTop = new GoTop($('body'));
        goTop.createNode();
        goTop.bindEvent();