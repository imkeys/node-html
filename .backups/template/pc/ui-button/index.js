(function(){
	if ($("#ui-$param.model._id").length) {
        var parent = $("#ui-$param.model._id").parent();
        if(parent.prop("tagName").toLowerCase() == "body"){
            $("#ui-$param.model._id").addClass("is-old");
            $("#ui-$param.model._id").children('.ui-control-ver').addClass('ui-control-layout').removeClass('ui-control-ver');
        };
    };
})(window, jQuery);