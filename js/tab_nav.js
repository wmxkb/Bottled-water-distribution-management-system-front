document.addEventListener('plusready', function(e) {
	webviewCreate({
		subpage: [{
				url: "show_data.html",
				id: "show_data.html",
				style: {
					top: '44px',
					bottom: '85px',

				},
			},
			{
				url: "orders.html",
				id: "orders.html",
				style: {
					top: '44px',
					bottom: '85px',

				},
			},
			{
				url: "users_data.html",
				id: "users_data.html",
				style: {
					top: '44px',
					bottom: '85px',

				},
			},
			{
				url: "admin_my.html",
				id: "admin_my.html",
				style: {
					top: '44px',
					bottom: '85px',

				},
			}
		]
	})

	changeView('show_data.html')

	let mui_title = document.getElementsByClassName('mui-title')[0]

	let show_data = document.getElementById('show_data')
	if (show_data != null) {
		show_data.addEventListener('tap', function(e) {
			changeView('show_data.html')
			mui_title.innerHTML = "水量数据"
		}, false)
	}

	let orders = document.getElementById('orders')
	if (orders != null) {
		orders.addEventListener('tap', function(e) {
			changeView('orders.html')
			mui_title.innerHTML = "订单管理"
		}, false)
	}
	
	let users_data = document.getElementById('users_data')
	if (users_data != null) {
		users_data.addEventListener('tap', function(e) {
			changeView('users_data.html')
			mui_title.innerHTML = "用户数据"
		}, false)
	}
	
	let admin_my = document.getElementById('admin_my')
	if (admin_my != null) {
		admin_my.addEventListener('tap', function(e) {
			// plus.storage.setItem("keepLogin") == ""
			// changeView('index.html')
			changeView('admin_my.html')
			mui_title.innerHTML = "我的"
		}, false)
	}

}, false)
