var _prewid = $('input[name="_prewid"]').val();

(function () {
  var isDomainReg = /^\/\d+\/?$/;
  var isOpen = $param.footer.bf.isOpen;
  var isHome = $param.footer.bf.isHome;
  if (!isOpen || (isHome && !isDomainReg.test(location.pathname))) {
    $('.ui-float').remove();
  } else {
	$('.ui-float').removeClass('hide')
  }
  $('#ui-header .nav .item').on({
    mouseover: function () {
      $(this).addClass('hover');
    },
    mouseout: function () {
      $(this).removeClass('hover');
    }
  });

  if (window.AOS) {
    AOS.init({
      easing: 'ease-out-back',
      duration: 1000,
      offset: 50
    });
  };

  var menuerLength = $('#ui-menuer .list li').length;
  if (menuerLength == 0) {
  	$('#ui-menuer .list').remove();
  }

  var domain = window.location.host;
  if (document.querySelectorAll('#mps_cms_script').length < 1) {
    var mps = document.createElement('script');
    mps.src = 'http://mps.jwyun.net/mps_collection/v1/visit/cms?d=' + domain;
    mps.id = 'mps_cms_script';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(mps, s);
  }
  var bp = document.createElement('script');
  var curProtocol = window.location.protocol.split(':')[0];
  if (curProtocol === 'https'){
  	bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  }
  else{
  	bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
})(window, jQuery);
