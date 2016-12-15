/**
 * Created by dell on 2016/12/13.
 */



    var $song;
    frame.onload = function(){
        $song = $('#frame').contents().find('#player');
    };
    //随机获取歌曲 === getSong() //添加歌曲信息//后获取歌词
    var sid;
    var channel;
    getSong();
    function getSong(channel){
        if(!channel){
            $.ajax({
                dataType: "json",
                url: 'http://api.jirengu.com/fm/getSong.php?channel=4',
                success: success
            });
        }else{
            $.ajax({
                dataType: "json",
                url: 'http://api.jirengu.com/fm/getSong.php?channel='+channel,
                success: success
            });
        }
        function success(data){
            appendSong(data); //添加歌曲信息
            getWords();       //获取歌词
            getDuration();
            changeTime();
            $song[0].volume =0.75;
        }
    }
    //添加添加歌曲信息 ==== appendSong
    function appendSong(data){
        var url = data.song[0].url;
        sid = data.song[0].sid;
        $('.music-name').text(data.song[0].title);//加入标题
        $('.singer-name').text(data.song[0].artist);//加入歌手
        $('#frame').contents().find('#player').attr('src',url);//加入歌曲链接
    }
    //获取歌词
    var arrWord,objWord;
    function getWords() {
        arrWord = [];
        objWord = {};
        $.ajax({
            dataType:'JSON',
            url:'http://api.jirengu.com/fm/getLyric.php?sid=' + sid,
            success:success
        });
        function success(data){
            var words = data.lyric;
            var arr = words.split('\n');
            for(var i= 0;i<arr.length;i++){
                var rep = /[\[\]]/g;
                var arrNew = arr[i].split(rep);
                if(arrNew.length===3){
                    var a =arrNew[1].substr(0, 5);
                    objWord[a]=arrNew[2];
                }
                else if(arrNew.length===4) {
                    var c =arrNew[1].substr(0, 5);
                    var b =arrNew[2].substr(0, 5);
                    objWord[c]=arrNew[3];
                    objWord[b]=arrNew[3];
                }
            }
        }
    }
    //获取时间
    var duration;
    var overtime;
    var timeNow;
    ///获取时间总长度
    function getDuration() {
        setTimeout(function () {
            var songDuration = $song[0].duration;
            if(isNaN(songDuration)){
                getDuration();
            }else{
                duration = $song[0].duration;
                overTime()
            }
        },0);
    }
    function overTime() {//时间总长度转换加入HTML
        var a = parseInt(duration/60);
        if(a<10){
            a = '0'+a;
        }
        var b = (duration%60).toFixed(2);
        if(b<10){
            b = '0'+b;
        }
        var c = (duration%60).toFixed(0);
        if(c<10){
            c = '0'+c;
        }
        overtime = '['+a+':'+b+']';
        $progress.find('.f-right').text(a+':'+c);
    }

    //时间变化以及进度条
    var $progress= $('#Progress-bar');
    var times;
    function getCurrentTime(){
        setTimeout(function () {
            var songTimes = $song[0].currentTime;
            if(isNaN(songTimes)){
                getCurrentTime();
            }else{
                times = $song[0].currentTime;
            }
        },0);
    }
    function changeTime(){
        setInterval(function(){
            getCurrentTime();
            var a = parseInt(times/60);
            if(a<10){
                a = '0'+a;
            }
            var b = (times%60).toFixed(2);
            if(b<10){
                b = '0'+b;
            }
            var c = (times%60).toFixed(0);
            if(c<10){
                c = '0'+c;
            }
            timeNow =a+':'+c;
            $progress.find('.f-left').text(a+':'+c);//时间变化
            var l = 70*(times/duration);
            $progress.find('.bar-new').attr('style','width:'+l+'%;');

            for(var key in objWord){
                if(key === timeNow){
                    if(arrWord.length===0){
                        arrWord.push(objWord[key]);
                    }
                    else if(arrWord[length-1] !== objWord[key] && objWord[key]!==''){
                        arrWord.push(objWord[key]);
                    }
                }
                $('#music-bg').find('.word').text(arrWord[arrWord.length-1]);
            }

        },500);

    }

    //获取分类列表
    getChannel();
    function getChannel(){
        $.ajax({
            url: 'http://api.jirengu.com/fm/getChannels.php',
            dataType: "json",
            method:'get',
            success:success
        });
        function success(data){
            var arr= data.channels;
            appendList(arr);
        }
        function appendList(arr){
            var html='';
            for(var i=0;i<arr.length;i++){
                html+='<h2 class="'+arr[i].channel_id+'">'+arr[i].name+'</ h2>';
            }
            $('#music-fm').find('.music-list').html(html);
        }
    }





    var $play = $('#play');
    var $iconLeft = $('#music-bg').find ('.icon-right');
    var $iconSengYin = $('#Progress-bar').find ('.icon-shengyin');
    var $musicList = $('.music-list');

    $play.on('click',function(){
        if($song[0].paused){
            $song[0].play();
            $(this).addClass('icon-pause');
            $(this).removeClass('icon-bofang');
        }
        else{
            $song[0].pause();
            $(this).addClass('icon-bofang');
            $(this).removeClass('icon-pause');
        }
    });
    $iconLeft.on('mousedown',function(){
        $(this).css('color','pink');
    });
    $iconLeft.on('mouseup',function(){
        $(this).css('color','#fff');
    });



    $iconLeft.on('click',function(){
        getSong(channel);
    });

    $iconSengYin.on('click',function(){
        $(this).parents('.music-main').find('.volume').toggleClass('active');
        $(this).parents('.music-main').find('.volume-new').toggleClass('active');
    });


    $('#music-fm').find ('.icon-yinle').on('mouseenter',function(){
        $('.music-list').show();
    });
    $musicList.on('mouseleave',function(){
        $(this).hide();
    });

    $musicList.on('mouseenter','h2',function (){
        $(this).addClass('active');
    });
    $musicList.on('mouseleave','h2',function (){
        $(this).removeClass('active');
    });
    $musicList.on('click','h2',function (){
        var myChannel = $(this).attr('class');
        channel= myChannel.split(' ')[0];
        getSong(channel);
    });
    $('#volume').on('click',function(e){
        var mouseH = e.clientY;
        var top = $(this).offset().top;
        var height = $(this).height();
        var voice = (height-(mouseH-top))/height;
        $('.volume-new').height(height-(mouseH-top));
        $song[0].volume = voice;
    });

