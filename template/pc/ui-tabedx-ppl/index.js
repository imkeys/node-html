;(function () {
  var configs = {
    pplWidth: $param.model.pplWidth,
    id: $param.model._id,
    bgd: $param.model.bgd,
    height: $param.model.height,
    isSlide: $param.model.isSlide,
    position: $param.model.position,
    n_t: $param.model.n_t,
    n_l: $param.model.n_l,
    item: $param.model.item,
    permutation: $param.model.permutation
  };
  renderTabedxPpl(configs, '#ui-$param.model._id', '$param._width');
})();