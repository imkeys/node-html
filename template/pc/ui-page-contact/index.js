app.bdmap({
  container: 'ui-map-$param.model._id',
  longitude: $param.model.lng,
  latitude: $param.model.lag,
  zoom: 18,
  title: '$param.model.companyName',
  content: '$param.model.address'
});