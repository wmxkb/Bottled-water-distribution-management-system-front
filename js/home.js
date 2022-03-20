
// plusready
document.addEventListener('plusready', function(e){
	
	// alert("233");
	webviewCreate2({
		subpage:[
		{
			url:"home.html",
			id:"home.html",
			style:{
				top:'0px',
				bottom:'85px',
			
			},
		},
		{
			url:"shopping_trolley.html",
			id:"shopping_trolley.html",
			style:{
				top:'0px',
				bottom:'0px',
			
			},
		},
		
		],
	});
	// plus.webview.currentWebview().
	// alert("233");
	// alert(plus.webview.getWebviewById("home.html"));
	
	changeView("home.html");
	
	// alert("233");
	let w = plus.webview.getWebviewById("shopping_trolley.html");
	let shopping_trolley = document.getElementById("shopping_trolley");
	
	// addTaplistener(shopping_trolley, function(e){
	// 	plus.navigator.setStatusBarBackground("#F5F5F5");
	// 	changeView("shopping_trolley.html");
		
		
	// });
	
	// alert(233);
	// 添加商品到购物车
	
	
	mui('.floorGoods').on('tap','.dmg',function(){
		let itemInfos = [];
		
		let id = this.children[0].getAttribute('id');
		let l = this.parentNode.children[3].innerHTML.length;
		let price = parseFloat(this.parentNode.children[3].innerHTML.substr(1, l - 1));
		// alert(price);
		if(id == 'type1'){
			plus.storage.setItem('addWaterType', '10L大桶水');
			itemInfos.push('10L大桶水');
		}else{
			plus.storage.setItem('addWaterType', '5L小桶水');
			itemInfos.push('5L小桶水');
		}
		
		
		w.evalJS("test();");
		
		
		itemInfos.push(price);
		itemInfos.push(1);
		itemInfos.push(plus.storage.getItem('userid'))
		// username.value = "233";
		// 目标url
		let url = "http://192.168.1.101:8080" + "/add";
		ajax(
			url, 
			'POST',
			 {
				'itemInfos':itemInfos,
			 }, 
			'default',
			function success(data){
				// alert(data);
			},
			function error(){
				alert("无网络连接");
			}
		);
		
	});
	
	// // 购物车插入测试
	// let add1 = document.getElementById("add1");
	// addTaplistener(add1,function(e){
	// 	plus.storage.setItem('addWaterType', '10L大桶水');
	// 	// plus.storage.setItem('addWaterId', '1');
	// 	w.evalJS("test();");
	// });
	
	
	// // 购物车插入测试2
	// let add2 = document.getElementById("add2");
	// addTaplistener(add2,function(e){
	// 	plus.storage.setItem('addWaterType', '5L小桶水');
	// 	// plus.storage.setItem('addWaterId', '2');
	// 	w.evalJS("test();");
		
	// });
	
	
	
	
},false);