(function(){
  $('#ui-$param.model._id .click-True').bind({
    'click': function(){
      var imgurl = $(this).find('img').attr('src');

      $('#ui-picture-fullscreen .img').attr({'style': 'background-image: url('+ imgurl +')'});
      $('#ui-picture-fullscreen').show();
    }
  });
})(window, jQuery);