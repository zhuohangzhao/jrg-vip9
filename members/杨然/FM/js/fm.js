var Music = (function(){
	var Fm = function(ct){
		this.init(ct);
	}
	Fm.prototype = {
		init: function(ct){
			    this.$ct = ct,
				this.$volume = this.$ct.find('.volume'),
				this.$play = this.$ct.find('.play'),
				this.audio = audio = document.getElementById('audio'),
				this.$bgImg = this.$ct.find('.fm-bg'),
				this.$title = this.$ct.find('.fm-title'),
				this.$author = this.$ct.find('.fm-author'),
				this.$next = this.$ct.find('.next'),
				// this.pre = this.ct.find('.pre'),
				this.$loop = this.$ct.find('.loop'),
				this.$lyricBtn = this.$ct.find('.showLyric'),
				this.$menuBtn = this.$ct.find('.fm-menu'),
				this.$fmOrder = this.$ct.find('.style-order'),
				this.$down = this.$ct.find('.down'),
				this.$like = this.$ct.find('.xiai'),
				this.downUrl = '',
				this.channelId =  '',
				this.timer;
			this.randomSong();
			this.bind();
			this.getChannels();
		},
		getSong: function(){
			var self = this;
		 	$.ajax({
			  	url: 'http://api.jirengu.com/fm/getSong.php',
			  	type: 'get',
			  	dataType: 'json',
			  	data: {
			  		channel: this.channelId
			  	},
			  	timeout: 2500,
			  }).done(function(res){
			  		self.$bgImg.css('background-image', 'url(' + res.song[0].picture + ')');
			  		$(audio).attr('src', res.song[0].url);
			  		self.$title.text(res.song[0].title).attr('title', res.song[0].title);
			  		self.$author.text(res.song[0].artist);
			  		self.downUrl = res.song[0].url;
			  		console.log(res)
			  });
		},
		randomSong: function(){
			this.channelId = 'public_aaa_bbb';
			this.getSong();
		},
		getChannels: function(){
			var self = this;
			$.ajax({
				url: 'http://api.jirengu.com/fm/getChannels.php',
				type: 'get',
				dataType: 'json'
			}).done(function(res){
				var html = '';
				for (var i = 0; i < res.channels.length; i++) {
					html += '<li data-channelid=' + res.channels[i].channel_id + '>' + res.channels[i].name + '</li>';
				}
				self.$fmOrder.append(html);
			});
		},
		bind: function(){
			var self = this;
			this.$play.on('click', function(){
				if (self.audio.paused != true) {
					self.audio.pause();
					$(this).removeClass('icon-bofang')
						 	 .addClass('icon-zanting');
				} else {
					self.audio.play();
					$(this).removeClass('icon-zanting')
						 	 .addClass('icon-bofang');
				}
			});
			this.$volume.on('click', function(){
				if (self.audio.muted != true) {
					self.audio.muted = true;
					$(this).removeClass('icon-shengyin')
							   .addClass('icon-jingyin');
				} else {
					self.audio.muted = false;
					$(this).removeClass('icon-jingyin')
							   .addClass('icon-shengyin');
				}
			});
			this.$down.on('click', function(){
				window.location.href = self.downUrl;
			});
			$(this.audio).on('ended', function(){
				self.getSong();
			});
			$(this.audio).on('error', function(){
				console.log('error');
				self.getSong();
			});
			this.$fmOrder.on('click', function(e){
				self.channelId = $(e.target).data('channelid');
				self.getSong();
			});
			this.$fmOrder.on('mouseover', function(){
				clearInterval(self.timer);
			});
			this.$fmOrder.on('mouseleave', function(){
				$(this).animate({ 'left': '-325px'});
			});
			this.$menuBtn.on('click', function(){
				self.$fmOrder.animate({ 'left': '-260px'});
				self.timer = setInterval(function(){
					self.$fmOrder.animate({ 'left': '-325px'});
				}, 3000);
			});
			this.$next.on('click', function(){
				self.getSong();
			});
			this.$loop.on('click', function(){
				var $audio = $(self.audio);
				if (self.$loop.hasClass('icon-suiji')) {
					$audio.attr('loop', 'loop');
					$(this).removeClass('icon-suiji')
							   .addClass('icon-danquxunhuan');
				} else {
					$audio.removeAttr('loop');
					$(this).removeClass('icon-danquxunhuan')
							   .addClass('icon-suiji');
				}
			});
			this.$like.on('click', function(){
				$(this).css('color', 'red');
				console.log($(this));
			})
		}
	}
	return new Fm($('.fm-body'));
})()


