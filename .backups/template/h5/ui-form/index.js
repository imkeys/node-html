(function () {
  console.log($param.model);

  var sceneId = '';
  if (_prewid != 0) {
    sceneId = '/' + _prewid;
  };

  app.validate({
    container: 'ui-form-$param.model._id',
    success: function(res){
      var fieldValues = {};
      var formid = $('#ui-form-$param.model._id').attr('data-formid');
      var values = $('#ui-form-$param.model._id').serialize();
      var checkCode = '';
      $.map(values.split('&'), function(item, index, array){
        var key = item.split('=')[0];
        var value = decodeURIComponent(item.split('=')[1]);
        if (value.indexOf(',') > -1) {
          value = String(value.split(','));
        };
        if (key === 'checkCode') {
          checkCode = value
        } else {
          if (fieldValues[key]) {
            fieldValues[key] = fieldValues[key] + ',' + value;
          } else {
            fieldValues[key] = value;
          }
        }
      });
      var model = {
        formId: formid,
        fields: fieldValues,
        checkCode: checkCode
      };
      $('#ui-form-$param.model._id').find('[type="submit"]').attr({'disabled': 'true'});
      $.ajax({
        url: sceneId + $('#ui-form-$param.model._id').attr('action'),
        data: model,
        type: 'POST',
        dataType: 'JSON',
        success: function(res){
          if(res.code == 0){
            if ("$param.model.isOffer" == "True") {
              $.createOfferModal($param.model);
            } else {
              $.createModal('$param.model.flt');
              setTimeout(function(){
                window.history.go(0);
              }, 2000);
            }
          } else {
            app.showToast({
              title: res.error
            });
          }
        },
        complete:function(){
          /*$("#ui-form-$param.model._id").find('input[type=text]').val("");
          $("#ui-form-$param.model._id").find('input[type=phone]').val("");
          $("#ui-form-$param.model._id").find('textarea').val("");*/
          $('#ui-form-$param.model._id').find('[type="submit"]').removeAttr('disabled');
        },
        error: function(){
          console.log('ERROR: 提交留言失败');
        }
      });
    }
  })
})(window, jQuery);