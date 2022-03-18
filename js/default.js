// plusready，H5+api需要在plusready后执行
// alert("233");


document.addEventListener('plusready', function(){
	plus.navigator.setStatusBarBackground("#ffffff");
	webviewCreate({
		subpage:[
		{
			url:"home.html",
			id:"home.html",
			style:{
				top:'44px',
				bottom:'85px',
			
			},
		},
		{
			url:"shopping_trolley.html",
			id:"shopping_trolley.html",
			style:{
				top:'44px',
				bottom:'85px',
			
			},
		},
		{
			url:"order.html",
			id:"order.html",
			style:{
				top: '44px',
				bottom:'85px',
			
			},
		},
		{
			url:"my.html",
			id:"my.html",
			style:{
				top:'44px',
				bottom:'85px',
			
			},
		},
		],
	},
	// plus.webview.currentWebview()
	);
	
	// 默认显示home页
	changeView('home.html');
	
	let home = document.getElementById('home');
	// home.style.color = "#007aff";
	let shopping_trolley = document.getElementById('shopping_trolley');
	let order = document.getElementById('order')
	let my = document.getElementById('my');
	let headerTxt = document.getElementById('headerTxt');
	// 监听导航栏tap事件， 显示子页面以及改变color值
	addTaplistener(home, function(e){
		changeView('home.html');
		headerTxt.children[0].innerHTML = "首页";
		home.style.color = "#007aff";
		my.style.color = "#929292";
		func.style.color="#929292";
		order.style.color="#929292";
		
	});
	addTaplistener(func, function(e){
		// changeView('shopping_trolley.html');
		let w = plus.webview.getWebviewById('shopping_trolley.html');
		w.show("pop-in",200,function(){
			w.evalJS('loadData()');
			// w.evalJS
			
		});
		headerTxt.children[0].innerHTML = "购物车";
		home.style.color = "#929292";
		my.style.color = "#929292";
		func.style.color="#007aff";
		order.style.color="#929292";
		
		let disTab = document.getElementById('disTap');
		
		disTap.style.zIndex = "99"
		setTimeout(function() {
			disTap.style.zIndex = "0"
		}, 200);
		
	});
	addTaplistener(order, function(e){
		changeView('order.html');
		headerTxt.children[0].innerHTML = "我的订单";
		home.style.color = "#929292";
		my.style.color = "#929292";
		func.style.color="#929292";
		order.style.color="#007aff";
		
	});
	addTaplistener(my, function(e){
		changeView('my.html');
		headerTxt.children[0].innerHTML = "我的";
		home.style.color = "#929292";
		my.style.color = "#007aff";
		func.style.color="#929292";
		order.style.color="#929292";
		
	});
	
	
	
},false);