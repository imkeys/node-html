;(function (window, document) {
  $set(model = param.model);
  if (!window.BMap) return;
  window.addEventListener('load', function () {
    const map = new window.BMap.Map('ui-${model._id}');
    const addressDetailList = [];
    $foreach(item in model.data);
    addressDetailList.push({
      caption: '${item.caption}',
      address: '${item.address}',
      contact:' ${item.contact}',
      lng:${item.lng},
      lat:${item.lat},
      et:[
        $foreach(info in item.et)
        {caption: '${info.caption}', v: '${info.v}'},    
        $end
      ]
    });
    $end;
    renderOverLays(map, addressDetailList);
  }, false);
})(window, document);
