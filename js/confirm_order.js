

document.addEventListener('plusready', function(){
	let w = plus.webview.currentWebview();
	// alert(233)
	// 点击提交订单按钮
	let submitOrder = document.getElementById('submitOrder');
	submitOrder.addEventListener('tap',function(e){
		// 向后台发送订单信息
		let orderUserId = plus.storage.getItem('userid');
		let url = "http://192.168.1.115:8080" + "/getShopping_Trolley"
		var orderGoods = [],
		orderCount = []
		
		ajax(
			url, 
			'POST',
			 {
				'userid':orderUserId,
			 }, 
			'default',
			success,
			function error(){
				alert("无网络连接");
			}
		);
		
		function success(data){
			let ndata = eval('(' + data + ')')
			for(let i = 0; i < ndata.length; i++){
				orderGoods.push(ndata[i].waterType)
				orderCount.push(ndata[i].count)
			}
			
			let myDate = new Date();
			let orderTime = myDate.toLocaleDateString() + myDate.toLocaleTimeString();
			ajax(
				"http://192.168.1.115:8080/addOrder", 
				'POST',
				 {
					'orderTime':orderTime,
					'orderUserId':orderUserId,
					'orderGoods':orderGoods,
					'orderCount':orderCount,
					'orderPrice':w.money,
					
				 }, 
				'default',
				function success(data){
					// alert(data);
				},
				function error(){
					alert("无网络连接");
				}
			);
		}
		
		ajax(
			"http://192.168.1.115:8080/deleteAll", 
			'POST',
			 {
				'userid':orderUserId,
			 }, 
			'default',
			function success(data){
				let w1 = plus.webview.getWebviewById('shopping_trolley.html');
				w1.evalJS('loadData()');
				// alert(data)
			},
			function error(){
				// alert("无网络连接");
			}
		);
		
		
		
		
		
		
		
		closeWebview();
	},false);
	
	
	let money = document.getElementsByClassName('money')[0];
	money.innerHTML = '￥ ' + w.money;
	
	
	
	
	
	
},false);





// function loadData(){
// 	alert(111)
// 	let userid = plus.storage.getItem('userid');
// 	let url = "http://192.168.1.113:8080" + "/selectAll";
// 	ajax(
// 		url, 
// 		'POST',
// 		 {
// 			'userid':userid,
// 		 }, 
// 		'default',
// 		function success(data){
// 			// alert(1)
// 			let money = document.getElementsByClassName('money')[0];
// 			money.innerHTML = '￥ ' + parseFloat(data).toFixed(2);
// 		},
// 		function error(){
// 			alert("无网络连接");
// 		}
// 	);
// }