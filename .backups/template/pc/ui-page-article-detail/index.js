(function(){
	var len = $('#ui-$param.model._id .ui-fields').find('li').length;
	if (len == 0) {
		$('#ui-$param.model._id .ui-fields').remove();
	};
	app.refreshHits({
		model: 2,
		id: $param.model.article.id
	});
})(window, jQuery);