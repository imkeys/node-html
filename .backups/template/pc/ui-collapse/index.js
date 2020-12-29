;(function () {
  var configs = {
    x: $param.model.x,
    y: $param.model.y,
    approach: '$param.model.approach.jsonText',
    stress: '$param.model.stress.jsonText',
    id: $param.model._id,
    height: $param.model.height,
    width: '$param.model.width',
    bgd: $param.model.bgd,
    isRow: $param.model.isRow,
    item: $param.model.item,
    permutation: $param.model.permutation
  };
  setTimeout(function () {
    renderCollapse(configs, '#ui-$param.model._id', '$param._width');
  }, 5);
})();
