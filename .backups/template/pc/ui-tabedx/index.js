;(function () {
  var configs = {
    x: $param.model.x,
    y: $param.model.y,
    approach: '$param.model.approach.jsonText',
    stress: '$param.model.stress.jsonText',
    id: $param.model._id,
    bgd: $param.model.bgd,
    height: $param.model.height,
    width: '$param.model.width',
    isSlide: $param.model.isSlide,
    position: $param.model.position,
    n_t: $param.model.n_t,
    n_l: $param.model.n_l,
    item: $param.model.item,
    permutation: $param.model.permutation
  };
  setTimeout(function () {
    renderTabedx(configs, '#ui-$param.model._id', '$param._width');
  }, 5);
})();
