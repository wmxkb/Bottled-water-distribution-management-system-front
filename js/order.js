document.addEventListener('plusready', function(e) {
	let ws = null;
	ws = plus.webview.currentWebview();
	// offset是刷新动画距离顶部的距离
	ws.setPullToRefresh({
			support: true,
			color: "#00aaff",
			style: 'default',
			height: '50px',
			range: '100px',
			contentdown: {
				caption: '下拉可以刷新'
			},
			contentover: {
				caption: '释放立即刷新'
			},
			contentrefresh: {
				caption: '正在刷新...'

			},
			offset: '10px',
		},
		onRefresh
	);
	ws.beginPullToRefresh();

	// 刷新页面
	function onRefresh() {
		setTimeout(function() {
			console.log('刷新页面');
			loadData()


			// 执行刷新函数
			ws.endPullToRefresh();
		}, 1000);
	}


	window.addEventListener("sendGoods", function test(e) {
		let orderTime = e.detail.orderTime
		let orderGoods = e.detail.orderGoods
		let orderCount = e.detail.orderCount
		let orderPrice = e.detail.orderPrice
		let ul = document.getElementById('ul')
		let child1 = ul.children[0]
	
		let li = document.createElement("li")
		li.className = 'waterType mui-table-view-cell'
	
		let content = ""
	
		for (let i = 0; i < orderGoods.length; i++) {
			content +=
				'<div>' +
				orderGoods[i] +
				' ' +
				selectPrice(orderGoods[i]) +
				' ' +
				orderCount[i] +
				'</div>'
		}
	
		li.innerHTML =
			'<div>' +
			orderTime +
			'</div>' +
			content +
			"实付款：￥" +
			orderPrice
	
		ul.insertBefore(li,child1)
	}, false);

}, false);


function GetDataAjax(ul, mainData, i) {
	if (i < 0) {
		ul.style.display = "block"
		return 0;
	}
	ajax(
		"http://192.168.1.101:8080/getOrderItemByNumber",
		'POST', {
			'orderNumber': mainData[i].orderNumber,
		},
		'default',
		function success(data) {
			// alert(itemMap)
			let itemMap = eval('(' + data + ')')
			// alert(itemMap)
			// alert(data)
			let content = ""
			for (let j = 0; j < itemMap.length; j++) {
				content +=
					'<div>' +
					itemMap[j].orderGoods +
					' ' +
					itemMap[j].commodityPrice +
					' ' +
					itemMap[j].orderCount +
					'</div>'
			}

			let li = document.createElement("li")
			li.className = 'waterType mui-table-view-cell'
			li.innerHTML =
				'<div>' +
				mainData[i].orderTime +
				'</div>' +
				content +
				"实付款：￥" +
				mainData[i].orderPrice
			ul.appendChild(li)

			GetDataAjax(ul, mainData, i - 1)

		},
		function error() {
			alert("无网络连接");
		}
	);
	
	
	

}

function loadData() {
	let userid = plus.storage.getItem('userid')
	let ul = document.getElementById('ul')
	ul.style.display = "none"
	for (let i = ul.children.length - 1; i >= 0; i--) {
		ul.removeChild(ul.children[i]);
	}


	let url = "http://192.168.1.101:8080" + "/getOrderMain"
	ajax(
		url,
		'POST', {
			'userid': userid,
		},
		'default',
		function success(data) {

			let mainData = eval('(' + data + ')')
			GetDataAjax(ul, mainData, mainData.length - 1)
			// for(let i = mainData.length - 1; i >= 0 ; i--){


			// alert(ndata[2].orderTime)
			// alert(ndata[2].orderUserId)
			// alert(ndata[2].orderNumber)
			// alert(ndata[2].orderPrice)
		},
		function error() {
			alert("无网络连接")
		}
	);




}


function selectPrice(orderGood) {
	if (orderGood == "10L大桶水")
		return 10.00
	else if (orderGood == "5L小桶水")
		return 6.80
	else
		return 0
}



// function addLi() {

// 	window.addEventListener("sendGoods", function test(e) {
// 		let orderTime = e.detail.orderTime
// 		let orderGoods = e.detail.orderGoods
// 		let orderCount = e.detail.orderCount
// 		let orderPrice = e.detail.orderPrice
// 		alert(orderTime)
// 		let ul = document.getElementById('ul')
// 		let child1 = ul.children[0]

// 		let li = document.createElement("li")
// 		li.className = 'waterType mui-table-view-cell'

// 		let content = ""

// 		for (let i = 0; i < orderGoods.length; i++) {
// 			content +=
// 				'<div>' +
// 				orderGoods[i] +
// 				' ' +
// 				selectPrice(orderGoods[i]) +
// 				' ' +
// 				orderCount[i] +
// 				'</div>'
// 		}

// 		li.innerHTML =
// 			'<div>' +
// 			mainData[i].orderTime +
// 			'</div>' +
// 			content +
// 			"实付款：￥" +
// 			mainData[i].orderPrice

// 		ul.insertBefore(child1, li)
// 	}, false);



// 	window.removeEventListener("sendGoods", test());

// }
