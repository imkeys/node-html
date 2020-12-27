(function(){
	setTimeout(function(){
    	$('#ui-$param.model._id .cover .play').bind({
          'click': function(){
              var code = $(this).attr('data-code');
              var poster = $(this).attr('data-poster');
              var autoPlay = $(this).attr('data-autoplay');

              app.showVideoDialog({
                  code: code,
                  poster: poster,
                  autoplay: autoPlay
              })
          }
      })
    }, 200)
})(window, jQuery);