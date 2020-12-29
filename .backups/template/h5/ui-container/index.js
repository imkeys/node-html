;(function () {
  var backgroundImage = '$param.model.bgd.backgroundImage';
  var backgroundColor = '$param.model.bgd.backgroundColor' || '#fff';
  var background = backgroundColor;
  if (backgroundImage) {
    background = [
      'url(',
      backgroundImage.split('@')[0],
      ') 0% 0% / 100% 100% ',
      backgroundColor
    ].join('');
  };
  var container = document.querySelector('#ui-$param.model._id');
  container.style.background = background;
  nodeUnitTrans && nodeUnitTrans(container);
})();
