var Music = (function(){
	var Fm = function(ct){
		this.ct = ct;
		console.log(this.ct);
		this.init();
	}
	Fm.prototype = {
		init: function(){
			console.log('init');
			this.bind();
		},
		getSong: function(){
		  // $.get('http://api.jirengu.com/fm/getSong.php',{channel: 'public_aaa_bbb'})
		  //  .done(function(res){
		  //  	var res = JSON.parse(res);
		  //   console.log(res.song)
		  // });
		  $.ajax({
		  	url: 'http://api.jirengu.com/fm/getSong.php',
		  	type: 'get',
		  	dataType: 'json',
		  	data: {
		  		channel: 'public_aaa_bbb'
		  	},
		  	success: function(json){
		  		console.log(json);
		  	}
		  })
		},
		bind: function(){
			var self = this;
			$(self.ct).on('click', function(){
				self.getSong();
			})
		}
	}
	return new Fm($('.fm-body'));
})()


