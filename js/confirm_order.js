document.addEventListener('plusready', function() {
	let w = plus.webview.currentWebview();


	let ul = document.getElementById('ul');
	for (let i = ul.children.length - 1; i >= 0; i--) {
		ul.removeChild(ul.children[i]);
	}

	let userid = plus.storage.getItem('userid');
	let url = "http://192.168.1.101:8080" + "/getShopping_Trolley";
	ajax(
		url,
		'POST', {
			'userid': userid,
		},
		'default',
		function success(data) {
			let ndata = eval('(' + data + ')');
			// alert(ndata[0].waterType);

			for (let i = 0; i < ndata.length; i++) {
				if (w.select_order[i] == 1) {
					// 创建li
					let li = document.createElement("li");



					li.innerHTML =
						'<div class="mui-slider-handle fullBox">' +
						'<div style="position:absolute; left:2%">' +
						ndata[i].waterType + '（' + changeLocationToText(ndata[i].location) + ' ' + ndata[i]
						.floor + '层）' +
						'</div>' +
						'<div style="color:gray; position:absolute; left:2% ; top:60%">' +
						'￥' + ndata[i].price +
						'</div>' +
						'</div>' +
						'<div id="" class="waterCountFunc" >' +
						'<div  class="count">' +
						ndata[i].count +
						'</div>' +
						'<div  class="">x</div>' +
						'</div></div>'

					li.className = 'waterType mui-table-view-cell';
					ul.appendChild(li);
				}

			}
		},
		function error() {
			alert(233)
		}
	);










	// alert(233)
	// 点击提交订单按钮
	let submitOrder = document.getElementById('submitOrder');
	submitOrder.addEventListener('tap', function(e) {
		// 向后台发送订单信息
		let orderUserId = plus.storage.getItem('userid');
		let url = "http://192.168.1.101:8080" + "/getShopping_Trolley"
		var orderGoods = [],
			orderCount = [],
			orderLocation = [],
			orderFloor = []

		ajax(
			url,
			'POST', {
				'userid': orderUserId,
			},
			'default',
			success,
			function error() {
				alert("无网络连接");
			}
		);

		function success(data) {
			let ndata = eval('(' + data + ')')
			for (let i = 0; i < ndata.length; i++) {
				if(w.select_order[i] == 1){
					orderGoods.push(ndata[i].waterType)
					orderCount.push(ndata[i].count)
					orderLocation.push(ndata[i].location)
					orderFloor.push(ndata[i].floor)
				}
				
				// alert(ndata[i].floor)
			}

			let myDate = new Date();
			let orderTime = CurrentDate() + " " + CurrentTime();

			let w_new = plus.webview.getWebviewById('order.html');
			// w.evalJS('addLi()')
			// 前端先添加显示
			mui.fire(w_new, 'sendGoods', {
				orderTime: orderTime,
				orderGoods: orderGoods,
				orderCount: orderCount,
				orderPrice: w.money
			});
			ajax(
				"http://192.168.1.101:8080/addOrder",
				'POST', {
					'orderTime': orderTime,
					'orderUserId': orderUserId,
					'orderGoods': orderGoods,
					'orderCount': orderCount,
					'orderPrice': w.money,
					'orderLocation': orderLocation,
					'orderFloor': orderFloor,

				},
				'default',
				function success(data) {
					// alert(data);
				},
				function error() {
					alert("无网络连接");
				}
			);
			
			ajax(
				"http://192.168.1.101:8080/reduceSelectItem",
				'POST', {
					'orderUserId': orderUserId,
					'orderGoods': orderGoods,
					'orderLocation': orderLocation,
					'orderFloor': orderFloor,
				},
				'default',
				function success(data) {
					let w1 = plus.webview.getWebviewById('shopping_trolley.html');
					w1.evalJS('loadData()');
					// alert(data)
				},
				function error() {
					// alert("无网络连接");
				}
			);
		}

		







		closeWebview();
	}, false);


	let money = document.getElementsByClassName('money')[0];
	money.innerHTML = '￥ ' + w.money;






}, false);





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


function CurrentDate() {
	var now = new Date();

	var year = now.getFullYear(); //年
	var month = now.getMonth() + 1; //月
	var day = now.getDate(); //日


	var date = year + "-";

	if (month < 10)
		date += "0";

	date += month + "-";

	if (day < 10)
		date += "0";

	date += day;
	return (date);
}

function CurrentTime() {
	var now = new Date();

	var hh = now.getHours(); //时
	var mm = now.getMinutes(); //分
	var ss = now.getSeconds(); //秒

	var clock = "";


	if (hh < 10)
		clock += "0";
	clock += hh + ":";

	if (mm < 10)
		clock += '0';
	clock += mm + ":";

	if (ss < 10)
		clock += '0';
	clock += ss;

	return (clock);
}


function changeLocationToText(location) {
	switch (location) {
		case 'ld-1':
			return '令德一'
			break;
		case 'ld-2':
			return '令德二'
			break;
		case 'ld-3':
			return '令德三'
			break;
		case 'ld-4':
			return '令德四'
			break;
		case 'ld-5':
			return '令德五'
			break;
		case 'ld-6':
			return '令德六'
			break;
		case 'ld-7':
			return '令德七'
			break;
		case 'ld-8':
			return '令德八'
			break;
		case 'ld-9':
			return '令德九'
			break;
		case 'ld-10':
			return '令德十'
			break;
		case 'ld-11':
			return '令德十一'
			break;
		case 'ld-12':
			return '令德十二'
			break;
		default:
			break;
	}
}
