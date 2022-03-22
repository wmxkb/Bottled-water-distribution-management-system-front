document.addEventListener('plusready', function(e) {
	// 隐藏webview 区域滚动
	
	plus.webview.currentWebview().setStyle({scrollIndicator:'none'});
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
				'<li style="position : relative; ">' +
				'<img src = "../img/homeimg/commodityType'+ selectType(orderGoods[i]) +'.png" style = "width: 60px; border:2px solid #f5f5f5; border-radius:10px" />' +
				'<div style="position:absolute;top:5%; left:20%">' +
				orderGoods[i] +
				'</div>'+
				' ' +
				'<div style="color:gray; position:absolute;top:55%; left:20%">' +
				'￥' + selectPrice(orderGoods[i]) +
				'</div>'+
				' ' +
				'<div style="color:gray; position:absolute;top:30%; left:95%">' +
				'x' + orderCount[i] +
				'</div>'+
				'<hr width="100% " style="border: 0.5px solid #d3d3d3;"/>'+
				'</li>'
			
		}
		content += '</ul>'
		
		li.style.border = "8px solid #F5F5F5"
		li.style.borderRadius = "30px"
		li.className = 'waterType mui-table-view-cell bcolor_w'
		li.innerHTML =
			'<div style="color: gray;">' +
			orderTime +
			'</div>' +
			'<hr width="100% " style="border: 0.5px solid #d3d3d3;"/>'+
			content +
			"实付款：￥" +
			orderPrice +
			'<span style="text-align:center; width:50px; border:1px solid #d3d3d3; border-radius:20px; position:absolute;left:80%">'+
			'售后'+
			'</span>'
		
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
			// alert(itemMap[0].commodityType)
			// alert(itemMap)
			// alert(data)
			let content = '<ul class="mui-table-view" style="position:relative">'
			for (let j = 0; j < itemMap.length; j++) {
				content +=
					'<li style="position : relative; ">' +
					'<img src = "../img/homeimg/commodityType'+ itemMap[j].commodityType +'.png" style = "width: 60px; border:2px solid #f5f5f5; border-radius:10px" />' +
					'<div style="position:absolute;top:5%; left:20%">' +
					itemMap[j].orderGoods +
					'</div>'+
					' ' +
					'<div style="color:gray; position:absolute;top:55%; left:20%">' +
					'￥' + itemMap[j].commodityPrice +
					'</div>'+
					' ' +
					'<div style="color:gray; position:absolute;top:30%; left:95%">' +
					'x' + itemMap[j].orderCount +
					'</div>'+
					'<hr width="100% " style="border: 0.5px solid #d3d3d3;"/>'+
					'</li>'
			}
			content += '</ul>'

			let li = document.createElement("li")
			li.style.border = "8px solid #F5F5F5"
			li.style.borderRadius = "30px"
			li.className = 'waterType mui-table-view-cell bcolor_w'
			li.innerHTML =
				'<div style="color: gray;">' +
				mainData[i].orderTime +
				'</div>' +
				'<hr width="100% " style="border: 0.5px solid #d3d3d3;"/>'+
				content +
				"实付款：￥" +
				mainData[i].orderPrice +
				'<span style="text-align:center; width:50px; border:1px solid #d3d3d3; border-radius:20px; position:absolute;left:80%">'+
				'售后'+
				'</span>'
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

function selectType(orderGood){
	if (orderGood == "10L大桶水")
		return 1
	else if (orderGood == "5L小桶水")
		return 2
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
