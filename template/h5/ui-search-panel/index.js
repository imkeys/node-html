(function(){
	setTimeout(function(){
    var _this = $('#ui-$param.model._id');
    
    $(document).keydown(function (event) {
      event = event ? event : (window.event ? window.event : null);
      if (event.keyCode == 13) {
        var tyid = _this.find('input[name="type"]').val();
        var key = $.trim(_this.find('input[name="key"]').val());
        var muinput = document.getElementById('searchKey');
		if (tyid == 0) { tyid = 2 };
        
        if (document.activeElement == muinput) {
          if(key == ''){
            app.alert({
              content: _this.find('input[name="key"]').attr('placeholder') || '请输入关键词'
            });
          }else{
            createUrl(tyid, key);
          }
        }
      }
    });

    _this.find('.key a').bind({
      'click': function(){
        var tyid = _this.find('input[name="type"]').val();
        var key = $(this).text();

        createUrl(tyid, key);
      }
    });
  }, 200);

  function createUrl(tyid, key) {
    var type = '';
    var url = '';
    var sceneId = '';

    if(_prewid != 0){
      sceneId = '/' + _prewid;
    };

    if(tyid == 1){
      type = 'article';
    }else if(tyid == 2){
      type = 'product';
    };

    url = sceneId + '/'+ type +'/search/'+ key +'.html';
    window.location.href = url;
  }
})(window, jQuery);