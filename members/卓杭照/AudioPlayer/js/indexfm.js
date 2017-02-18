/**
 * Created by Administrator on 2017/2/16.
 */

function Music() {
    this.songInfo = {
        channel: ''
    };
    this.$audio = $audio = $('audio').get(0);
    this.$volume = $volume = $('.music-control .volume-line');
    this.$channel = $channel = $('.channel');
    this.$btnPlay = $btnPlay = $('.btn-play');
    this.$btnPre = $btnPre = $('.btn-pre');
    this.$btnNext = $btnNext = $('.btn-next');
    this.$timeWidth = $timeWidth = $('.time-outline').width();
    this.init();
}

Music.prototype = {
    init: function () {
        this.bind();
        this.getMusic();
        this.getChannel();
        this.chooseChannel();
        this.setTime();
        this.drag();
        this.renderLike();          // 刷新加载一次localStorage数据
    },

    bind: function () {

        var _this = this;


        // 单曲循环
        $('.m-xunhuan').on('click', function () {

            if (!_this.$audio.getAttribute('loop')) {

                _this.$audio.setAttribute('loop', 'loop');
                $(this).removeClass('m-xunhuan').addClass('m-danquxunhuan')

            } else {

                _this.$audio.removeAttribute('loop', 'no-loop');
                $(this).removeClass('m-danquxunhuan').addClass('m-xunhuan')

            }
        });

        // 调节音量
        $('.music-control .m-volume').on('click', function () {
            _this.$volume.toggle();
        });

        _this.$volume.on('mouseleave', function () {
            $(this).hide();
        });

        $('.music-control .volume-outline').on('click', function (e) {

            volumeLength = (e.pageX - $(this).offset().left);
            $audio.volume = volumeLength / 100;
            // if (volumeLength === 0) {
            //     $audio.volume === 0.0;
            // }
            // if (volumeLength === 1) {
            //     $audio.volume === 1.0;
            // }
            $('.music-control .volume-light').css('width', volumeLength);
        });


        //歌词开关按钮
        $('.lyric-btn').on('click', function () {

            var $lyricBtnToggle = $('.music-background .music-lyric');

            $(this).toggleClass('lyriced');

            if ($(this).hasClass('lyriced')) {

                $lyricBtnToggle.css({'display': 'block'});
                $(this).removeClass('n-lyric').addClass('m-lyric')

            } else {

                $lyricBtnToggle.css({'display': 'none'});
                $(this).removeClass('m-lyric').addClass('n-lyric')
            }
        });

        // side 控制

        $('.channel-btn').on('click', function () {

            _this.$channel.animate({'left': '0px'}, 600);
        });

        _this.$channel.on('click', 'li', function () {
            $('.channel .m-channel').removeClass('m-channel m-icon');
            $(this).addClass('m-channel m-icon');
            _this.$channel.animate({'left': '-137px'}, 600);
        });

        _this.$channel.on('mouseleave', function () {
            _this.$channel.animate({'left': '-137px'}, 600);
        });


        // 收藏列表
        $('.like-list-btn').on('click', function () {
            $('.my-like').animate({'right':'0px'},600)
        });

        $('.my-like').on('mouseleave', function () {
            $(this).animate({'right': '-150px'}, 600);
        });

        $('.like-list-head img').on('click', function () {
            _this.ClearLocalStorage();
        });

        // 播放/暂停控制
        _this.$btnPlay.on('click', function () {
            if (_this.$audio.paused) {
                _this.play();
            } else {
                _this.pause();
            }
        });

        // 播放上一首
        _this.$btnPre.on('click', function () {
            _this.getMusic();
        });
        // 播放下一曲音乐
        _this.$btnNext.on('click', function () {
            _this.getMusic();
        });

        //进度条控制
        $(".time-outline").on('click', function (e) {

            _this.currentTime = ((e.pageX - $(this).offset().left) / _this.$timeWidth) * _this.$audio.duration;
            _this.$audio.currentTime = _this.currentTime;
            console.log(_this.$audio.duration)
            var timeNumber = _this.dealTime(_this.currentTime);

            $('.time-outline .cur-time').text(timeNumber);

            $('.time-outline .time').css('width', e.pageX - $(this).offset().left);
        });

        //收藏歌曲
        $('.m-heart').on('click', function () {
            if ($(this).hasClass('loved')) {
                _this.removeLocalStorage(_this.songInfo.title);
                $(this).removeClass('loved');
                var removeItem = "[title=" + _this.songInfo.title + "]";
                $('.like-list li').remove(removeItem);

            } else {
                $(this).addClass('loved');
                _this.setLocalStorage();
                $('.like-list').append("<li  title='" + _this.songInfo.title + "'>" + _this.songInfo.title + '</li>')
            }
        });
        $('.like-list').on('click', 'li', function (e) {
            _this.songInfo = _this.fetchLocalStorage(e.target.title);
            $(".lyric ul").empty();
            _this.getLyric();
            _this.loadSong();
        });

    },

    play: function () {
        this.$audio.play();
        this.$btnPlay.removeClass('m-play').addClass('m-pause');
    },

    pause: function () {
        this.$audio.pause();
        this.$btnPlay.removeClass('m-pause').addClass('m-play');
    },

    getMusic: function () {
        var _this = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getSong.php',
            type: 'get',
            dataType: 'jsonp',
            data: {
                channel: _this.songInfo.channel
            },
            jsonp: 'callback'
        }).done(function (res) {
            var ret = res.song[0];
            _this.songInfo.sid = ret.sid;
            _this.songInfo.title = ret.title;
            _this.songInfo.picture = ret.picture;
            _this.songInfo.artist = ret.artist;
            _this.songInfo.url = ret.url;
            _this.songInfo.lrc = ret.lrc;
            $(".music-lyric .lyric").empty();       // 下一首播放之前清空上一首歌词
            $('.m-heart').removeClass('loved');     // 去掉红心
            console.log(_this.songInfo);
            _this.loadSong();
            _this.getLyric();

        }).fail(function (ret) {
            console.log('获取歌曲失败' + ret)
        });
    },

    loadSong: function () {
        this.$audio.setAttribute('src', this.songInfo.url);
        this.$audio.setAttribute('sid', this.songInfo.sid);
        $('.music-name').text(this.songInfo.title);
        $('.music-name').attr('title', this.songInfo.title);
        $('.music-author').text(this.songInfo.artist);
        $('.music-author').attr('title', this.songInfo.artist);
        $(".music-background").css({
            'background': 'url(' + this.songInfo.picture + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'background-size': 'cover'
        });
    },

    getChannel: function () {
        var _this = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getChannels.php',
            dataType: 'json',
            Method: 'get'
        }).done(function (res) {
            var ret = res.channels;
            _this.appendChannel(ret);
        })
    },

    appendChannel: function (ret) {
        var _this = this;
        var html = '';
        for (i = 0; i < ret.length; i++) {
            html += '<li' + ' channel_id=' + ret[i].channel_id + '>' + ret[i].name + '</li>';
        }
        _this.$channel.append(html);
    },

    chooseChannel: function () {
        var _this = this;
        this.$channel.on('click', 'li', function (e) {
            if (e.target.tagName.toLowerCase() !== 'li' || !e.target.hasAttributes("channel_id")) return;
            _this.songInfo.channel = e.target.getAttribute('channel_id');
            _this.getMusic();
        })
    },

    getLyric: function () {
        var _this = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getLyric.php',
            dataType: 'json',
            type: 'get',
            data: {
                sid: _this.songInfo.sid
            }
        }).done(function (res) {
            // console.log('music-lyric', res);
            _this.renderLyric(res)
        }).fail(function () {
            $('.music-lyric .lyric').html("<li>本歌曲展示没有歌词</li>");
        })
    },

    parseLyric: function (lyr) {
        if (!lyr) return {};
        $('.music-lyric .lyric').empty();	//清空上一首歌词信息
        var lyric = lyr.lyric;
        var lines = lyric.split('\n'),	//歌词为以排数为界的数组
            timeReg = /\[\d{2}:\d{2}.\d{2}\]/g,	//时间的正则
            result = [];

        lines.forEach(function (line, index, lines) {
            if (!timeReg.test(line)) {
                lines.splice(index, 1);
                return;
            }
            var lineTime = line.match(timeReg)[0];          // 时间部分 '[00:00.01]'
            // console.log(lineTime);
            var lineLyric = line.replace(timeReg, '');       // 歌词部分 'xxxx'
            // console.log(lineLyric);
            var lt = lineTime.slice(1, 9).split(':');        // lt = ["00", "00.01"]
            var seconds = parseInt(lt[0]) * 60 + parseFloat(lt[1]);
            result.push([seconds, lineLyric]);               // result = [['0.01','xxx'],['0.25','xxx']...]
            // console.log(result)
        });

        return result;
    },

    renderLyric: function (e) {
        var _this = this;
        var lyr = this.parseLyric(e);
        // console.log(lyr);
        var lyrLi = "";
        lyr.forEach(function (ele, i) {
            lyrLi += "<li data-time='" + ele[0] + "'>" + ele[1] + "</li>";
        });

        $('.music-lyric .lyric').append(lyrLi);

        _this.$audio.addEventListener("timeupdate", function () {
            var liH = $(".lyric li").eq(1).outerHeight()-5;  //每行高度
            for (var i = 0; i < lyr.length; i++) {      //遍历歌词下所有的li
                var curT = $(".lyric li").eq(i).attr("data-time");
                var curTime = _this.$audio.currentTime;
                if(curTime >= curT) {
                    $(".lyric li").removeClass("active");
                    $(".lyric li").eq(i).addClass("active");
                    $('.music-lyric ul').css({
                        'top': -liH*(i-2),
                        "transition": "1s"
                    });

                }
            }
        })
    },

    renderLike: function () {

        for( var key in localStorage ){
            $(".like-list").append("<li title='" + key+ "'>" + key + "</li>");
        }
    },

    dealTime: function (second) {

        var second = parseInt(second);
        var min = Math.floor(second / 60);
        var sec = second - min * 60;
        if (min < 10) {
            min = 0 + String(min);
        } else min = String(min);
        if (sec < 10) {
            sec = 0 + String(sec);
        } else sec = String(sec);
        return (min + ":" + sec);
    },

    setTime: function () {
        var _this = this;

        setInterval(function () {
            var time = _this.$audio.currentTime / _this.$audio.duration;
            var timeNumber = _this.dealTime(_this.$audio.currentTime);

            var totalTime = _this.dealTime(_this.$audio.duration);
            $('.time-outline .total-time').text(totalTime);

            $('.time-outline .cur-time').text(timeNumber);
            if (time >= 1) {
                $('.time-outline .time').css('width', '0');
                _this.getMusic();
            } else {
                $('.time-outline .time').css('width', _this.$timeWidth * time);
            }
        }, 1000);
    },

    setLocalStorage: function () {
        window.localStorage.setItem(this.songInfo.title, JSON.stringify(this.songInfo));    // key:value 形式存储每一组
    },

    removeLocalStorage: function (name) {
        window.localStorage.removeItem(name);
    },

    fetchLocalStorage: function (key) {
        return JSON.parse(window.localStorage.getItem(key));
    },

    ClearLocalStorage: function () {
        window.localStorage.clear();        // 清除本地localStorage方法
        $('.like-list').empty();
    },

    drag: function () {
        $(function () {
            $('#fm').each(function () {
                $(this).dragging({
                    move: 'both',           //拖动方向，x y both
                    randomPosition: true //初始位置是否随机
                });
            });
        })
    }


};

var music = new Music();

