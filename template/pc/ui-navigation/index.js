(function(){
  var timer;
  var navTop = $param.model.y;
  var navHei = $param.model.firstStyle.height;
  var isFixed = "$param.model.isFixed";

  $("#ui-$param.model._id .item").on({
    mouseenter : function(){
      var index = Math.floor($(this).index() * .5);
      clearTimeout(timer);
        $(this).addClass('hover').children('.drop').show();
      $("#ui-d-$param.model._id").show().find('.inner').eq(index).show().siblings().hide();
      },
      mouseleave : function(){
        $(this).removeClass('hover').children('.drop').hide();
      timer = setTimeout(function(){
        $("#ui-d-$param.model._id").hide().find('.inner').hide();
      }, 200)
      }
  });

  $("#ui-d-$param.model._id").css({'top': navTop + navHei}).bind({
    'mouseenter': function(){
      clearTimeout(timer);
    },
    'mouseleave': function(){
      $("#ui-d-$param.model._id").hide().find('.inner').hide();
    }
  });

  $(window).bind({
    'scroll':function(){
      var itop = $(document).scrollTop();
      var mtop = navTop + navHei;
      if(isFixed == 'True'){
        if(itop >= mtop){
          $("#ui-$param.model._id").addClass('is-fixed');
          $("#ui-d-$param.model._id").addClass('is-fixed');
        }else{
          $("#ui-$param.model._id").removeClass('is-fixed');
          $("#ui-d-$param.model._id").removeClass('is-fixed');
        }
      }
    }
  });
})(window, jQuery);