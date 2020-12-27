(function(){
	setTimeout(function(){
		var _this = $('#ui-$param.model._id');
        _this.find('.type').bind({
            'mouseenter': function(){
                $(this).addClass('active').find('.drop').stop().show();
            },
            'mouseleave': function(){
                $(this).removeClass('active').find('.drop').stop().hide();
            }
        });

        _this.find('.drop li').bind({
            'click': function(){
                var type = $(this).text();
                var tyid = $(this).attr('data-value');

                $(this).addClass('act').siblings().removeClass('act');
                _this.find('.type > span').text(type);
                _this.find('.input input[name="type"]').val(tyid);
				_this.find('.drop').hide();
            }
        });

        _this.find('.submit button').bind({
            'click': function(){
                var tyid = _this.find('input[name="type"]').val();
                var key = $.trim(_this.find('input[name="key"]').val());

                if(key == ''){
                    app.alert({
                      content: _this.find('input[name="key"]').attr('placeholder') || '请输入关键词'
                    });
                }else{
                    createUrl(tyid, key);
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