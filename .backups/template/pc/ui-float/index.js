;(function () {
  $set(model = param.model);
  var j = jQuery;
  var container = j('#ui-$param.model._id');
  var openWrap = container.find('.is-open');
  var closeWrap = container.find('.is-closed');
  var closeIcon = container.find('.icon-close');
  function classToggle () {
    var closeTimeout = j(this).hasClass('icon-close') ? 500 : 0;
    if (openWrap.hasClass('is-hidden')) {
      closeIcon.removeClass('light-off');
    } else {
      closeIcon.addClass('light-off')
    }
    setTimeout(function () {
      openWrap.toggleClass('is-hidden');
      closeWrap.toggleClass('is-hidden');
    }, closeTimeout);
  };
  container.on('click', '.icon-close', classToggle);
  container.on('click', '.is-closed', classToggle);
})();
