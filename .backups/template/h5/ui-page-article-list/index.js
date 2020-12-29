(function () {
  var sceneId = '';
  if (_prewid != 0) {
    sceneId = '/' + _prewid;
  };
  (function () {
    $('.filter-tab').on('click', '.tab-item', function () {
      var self = $(this);
      if (!self.hasClass('active')) {
        $('.tab-item.active').removeClass('active');
        $('.filter-list .wrap.active').removeClass('active');
      }
      self.toggleClass('active');
      $('.filter-list .wrap').eq(self.index()).toggleClass('active');
    });
    $('.scroll-arrow').click(function () {
      $('.filter-tab')[0].scrollTo({
        left: 200,
        behavior: 'smooth'
      });
      $(this).off().remove();
    });
  })();
  var l = $('#list-content');
  var m = $('#content-soap');
  var _page = {
    isNext: true,
    p: 1,
    everySize: $param.model.everySize,
    category: $param.model.categoryId
  };
  $('body').bind('touchmove', function (e) {
    var a = $(window).scrollTop(); var b = $(document).height(); var c = $(window).height(); var d = 200;
    if (a >= b - c - d) {
      if (_page.isNext) {
        m.html('数据加载中...');
        _page.isNext = false;
        $.post(sceneId + '/home/article-data-page', { page: _page.p + 1, everySize: _page.everySize, category: _page.category }, function (res) {
          _page.isNext = res.isNext;
          if (res.code == 0) {
            m.html(res.isNext ? '滑动查询更多' : '已全部显示完');
            var html = '';
            for (var i in res.data) {
              var item = res.data[i];
              $if(param.model.format == 0);
              html += '<li class="item clearfix"><a href="' + (sceneId + item.link) + '" title="' + item.title + '">';
              html += '<div class="imgm"><figure class="img ui-scale-$param.model.scale"><img src="' + item.pic + '?x-bce-process=image/resize,w_600,h_600/quality,q_50" alt="' + item.title + '" title="' + item.title + '" /></figure></div>';
              html += '<div class="exp"><h3 class="tit">' + item.title + '</h3><p>' + item.caption + '</p><div class="time"><span>日期：' + item.createDate.substr(0, 10) + '</span><span>浏览量：' + item.scan + '</span></div>';
              html += '</a>';
              html += '</li>';
              $end;
              $if(param.model.format == 1);
              html += '<li class="item clearfix"><a href="' + (sceneId + item.link) + '" title="' + item.title + '">';
              html += '<div class="imgm"><figure class="img ui-scale-$param.model.scale"><img src="' + item.pic + '?x-bce-process=image/resize,w_600,h_600/quality,q_50" alt="' + item.title + '" title="' + item.title + '" /></figure></div>';
              html += '<div class="txt"><h3 class="tit">' + item.title + '</h3></div>';
              html += '</a>';
              html += '</li>';
              $end;
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
