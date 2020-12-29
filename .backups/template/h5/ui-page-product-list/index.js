(function () {
  var sceneId = '';
  if (_prewid != 0) {
    sceneId = '/' + _prewid;
  };

  var l = $('#list-content'), m = $('#content-soap');
  var _page = {
    isNext: true,
    p: 1,
    everySize: $param.model.everySize,
    category: $param.model.categoryId
  };
  $('body').bind('touchmove', function (e) {
    var a = $(window).scrollTop(), b = $(document).height(), c = $(window).height(), d = 200;
    if (a >= b - c - d) {
      if (_page.isNext) {
        m.html('数据加载中...');
        _page.isNext = false;
        $.post(sceneId + '/home/product-data-page', { page: _page.p + 1, everySize: _page.everySize, category: _page.category }, function (res) {
          _page.isNext = res.isNext;
          if (res.code == 0) {
            m.html(res.isNext ? "滑动查询更多" : "已全部显示完");
            var html = '';
            for (var i in res.data) {
              var item = res.data[i];
              $if(param.model.format == 0)
              html += '<li class="item clearfix"><a href="' + (sceneId + item.link) + '" title="' + item.title + '">';
              html += '<div class="imgm"><figure class="img ui-scale-$param.model.scale"><img src="' + item.pic + '?x-bce-process=image/resize,w_600,h_600/quality,q_50" alt="' + item.title + '" title="' + item.title + '" /></figure></div>';
              html += '<h3 class="tit">' + item.title + '</h3>';
              html += '</a>';
              html += '</li>';
              $end

            }
            _page.p += 1;
            l.append(html);
            return;
          };
          m.html('已全部显示完');
        }, 'json');
      };
    };
  });
})(window, jQuery);