$(document).ready(function(){
	var map = new BMap.Map("ui-map");
	var point = new BMap.Point($param.model.lng,$param.model.lag);
	var marker = new BMap.Marker(point);  
	map.addOverlay(marker);  
	map.centerAndZoom(point, 15);
	var address = '$param.model.address';
	var infoWindow = new BMap.InfoWindow('地址：' + address , {
		enableMessage: true
	}); 
	map.openInfoWindow(infoWindow, point);
	
	$('#my-ly-form-$param.model._id').find('button[name=submit]').click(function(){
		var p = $('#my-ly-form-$param.model._id'), j = $(this);
		var nickName = p.find('input[name=nickname]').val();
		var phone = p.find('input[name=phone]').val();
		var content = p.find('textarea[name=content]').val();
		if(nickName == ''){
			alert('请输入您的姓名.');
			return;
		};
		if(phone == ''){
			alert('请输入您的联系电话.');
			return;
		};
                if(!(/^1[3456789]\d{9}$/.test(phone))){ 
                        alert("请填写有效的手机号");  
                        return; 
                }; 
		if(content == ''){
			alert('请输入您要留下的内容.');
			return;
		};		
		j.html('加载中...').attr('disabled', true);		
		$.post('/home/ly-submit', { nickName: nickName, phone: phone, content: content  }, function(res){
			j.html('提交').attr('disabled', false);
			if(res.code == 0){
				alert('提交成功');
			}else{
				alert('提交失败');
			};
			p.find('input, textarea').val('');
		}, 'json');
	});
});