(function(){
  $if(param.model.format == 0 || param.model.format == 1 || param.model.format == 2)
    $("#ui-$param.model._id").slide({
        mainCell: ".list ul",
        titCell: ".dots ul",
        titOnClassName: "active",
        effect: "left",
        autoPlay: true,
        autoPage: true
    });
  $end

  $if(param.model.format == 3 || param.model.format == 4)
    $("#ui-$param.model._id").slide({
      mainCell: ".list ul",
      titCell: ".dots ul",
      titOnClassName: "active",
      effect: "leftLoop",
      vis: 'auto',
      autoPlay: "$param.model.isManualCarousel" == "True" ? false : true,
      delayTime: "$param.model.isManualCarousel" == "True" ? 300 : $param.model.automaticCarouselSpeed * 1000,
      interTime: $param.model.automaticCarouselDuration * 1000,
      autoPage: true
    });
  $end

  $if(param.model.format == 5)
    app.scrollThumbs({
      id: 'ui-$param.model._id',
      autoplay: "$param.model.isManualCarousel" == "True" ? false : true,
      speed: "$param.model.isManualCarousel" == "True" ? 300 : $param.model.automaticCarouselSpeed * 1000,
      duration: $param.model.automaticCarouselDuration * 1000
    });
  $end

  $if(param.model.format == 6)
    app.scroll3D({
      id: 'ui-$param.model._id',
      autoplay: "$param.model.isManualCarousel" == "True" ? false : true,
      speed: "$param.model.isManualCarousel" == "True" ? 300 : $param.model.automaticCarouselSpeed * 1000,
      duration: $param.model.automaticCarouselDuration * 1000
    });
  $end
})(window, jQuery);