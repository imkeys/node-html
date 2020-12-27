(function () {
  var jDom;
  var render = function () {
    var vis = $param.model.columnFormat;
    $if(param.model.format == 3)
      jDom.slide({
        mainCell: ".list",
        effect: "leftMarquee",
        vis: 4,
        interTime: 15,
        autoPlay: true,
        mouseOverStop: false
      });
    $end

    $if(param.model.format == 4)
      if (jDom.find('.item').length < vis) {
        if (vis == 1) {
          vis = 4
        }
        var html = jDom.find('.list').html();
        jDom.find('.list').append(html);
        jDom.find('.list').append(html);
      }
      jDom.find('.list .item').width(jDom.find('.main').width()/vis);
      jDom.find('.main').css({
        'visibility': 'visible'
      });
      jDom.slide({
        mainCell: ".list",
        effect: "leftLoop",
        vis: vis,
        autoPlay: true,
        autoPage: true
      });
    $end

    $if(param.model.format == 9)
      jDom.slide({
        mainCell: ".list ul",
        titCell: ".dots ul",
        titOnClassName: "active",
        effect: "leftLoop",
        vis: 'auto',
        autoPlay: "$param.model.carousel.isAuto" == "True" ? false : true,
        delayTime: "$param.model.carousel.isAuto" == "True" ? 300 : $param.model.carousel.speed * 1000,
        interTime: $param.model.carousel.dur * 1000,
        autoPage: true
      });
    $end

    $if(param.model.format == 10)
      var certifySwiper = new Swiper('#ui-$param.model._id .swiper-container', {
        simulateTouch: false,
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        autoplay: false,
        navigation: {
          nextEl: '#ui-$param.model._id .swiper-button-next',
          prevEl: '#ui-$param.model._id .swiper-button-prev',
        },
        pagination: {
          el: '#ui-$param.model._id .swiper-pagination',
          clickable :true
        },
        on: {
          progress: function(progress) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              var slideProgress = this.slides[i].progress;
              var modify = 1;
              if (Math.abs(slideProgress) > 1) {
                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
              }
              var width = this.width * .25;
              var translate = slideProgress * modify * width + 'px';
              var scale = 1 - Math.abs(slideProgress) / 5;
              var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
              slide.transform('translateX(' + translate + ') scale(' + scale + ')');
              slide.css('zIndex', zIndex);
              slide.css('opacity', 1);
              if (Math.abs(slideProgress) > 3) {
                slide.css('opacity', 0);
              }
            }
          },
          setTransition: function(transition) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              slide.transition(transition);
            }
          }
        }
      })
    $end
  };
  setTimeout(function () {
    jDom = $('#ui-$param.model._id');
    if (jDom.is(':visible')) {
      render();
    } else {
      var parent = jDom.parent();
      if (parent.hasClass('wrap-content')) {
        parent.show();
        render();
        parent.hide();
      } else {
        render();
      }
    }
  }, 200);
})(window, jQuery);
