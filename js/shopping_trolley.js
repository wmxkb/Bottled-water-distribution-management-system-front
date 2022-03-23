// 创建事件，用于跨页面strorage响应
let myEvent = new CustomEvent('STORAGE', {
	detail: {
		result: '200',
		data: {},
		msg: '成功'
	}
});

// plusready
document.addEventListener('plusready', function(e) {
	
	// mui(".mui-slider-handle").on('tap','.selectimg',function(){
	// 	alert(2334445)
	// });
	
	
	// 隐藏webview 区域滚动滚动条
	
	plus.webview.currentWebview().setStyle({
		scrollIndicator: 'none'
	});
	// 全选
	let selectAll = document.getElementById("selectAll").children[0];
	let isSelect = false;
	addTaplistener(selectAll, function(e) {
		let selectimg = document.getElementsByClassName("selectimg");
		if (!isSelect) {
			selectAll.className = "selectImg iconfont icon-xianshi_xuanze";
			for (let i = 0; i < selectimg.length; i++) {
				selectimg[i].children[0].src = "../img/circle_selected.png";
				selectimg[i].className = "selectimg selected";
			}
			isSelect = true;

			let userid = plus.storage.getItem('userid');
			let url = "http://192.168.1.101:8080" + "/selectAll";
			ajax(
				url,
				'POST', {
					'userid': userid,
				},
				'default',
				function success(data) {
					let money = document.getElementsByClassName('money')[0];
					money.innerHTML = '￥ ' + parseFloat(data).toFixed(2);
				},
				function error() {
					alert("无网络连接");
				}
			);



		} else {
			selectAll.className = "selectImg iconfont icon-xuanze";
			for (let i = 0; i < selectimg.length; i++) {
				selectimg[i].children[0].src = "../img/circle.png";
				selectimg[i].className = "selectimg";
			}
			isSelect = false;

			let money = document.getElementsByClassName('money')[0];
			money.innerHTML = '￥ ' + (0).toFixed(2);
		}
	});

	// 添加商品进入购物车并赋予监听
	// window.addEventListener('STORAGE', function (e) {

	// 	let addWaterType = plus.storage.getItem('addWaterType');
	// 	let ul = document.getElementById("ul");

	// 	// 创建li
	// 	let li = document.createElement("li");

	// 	// 判断该类商品是否已经被添加，被添加则增加计数器，否则添加商品至购物车
	// 	if(!isExist(addWaterType)){

	// 		li.innerHTML = '<div class="mui-slider-right mui-disabled">' + 
	// 		'<a class="mui-btn mui-btn-red">删除</a></div>' + 
	// 		'<div class="mui-slider-handle fullBox">'+
	// 		'<div id="" class="selectimg">'+
	// 		'<img class="imgflag" src="../img/circle.png" /></div>'+
	// 		'<div id="" class="waterTypetext" >'+
	// 		addWaterType+
	// 		'</div>'+
	// 		'<div id="" class="waterCountFunc" >'+
	// 		'<div  class="countAdd">+</div>'+
	// 		'<div  class="count">1</div>'+
	// 		'<div  class="countDel">-</div>'+
	// 		'</div></div>'

	// 		li.className = 'waterType mui-table-view-cell';
	// 		ul.appendChild(li);

	// 		// 选择框对象
	// 		// 监听点击选择事件
	// 		let imgflag = document.getElementsByClassName("imgflag")[0];
	// 		addTaplistener(imgflag, function(e){
	// 			if(imgflag.src.indexOf("circle.png") != -1){
	// 				imgflag.parentNode.className += " selected";
	// 				imgflag.src = "../img/circle_selected.png";
	// 			}else{
	// 				imgflag.parentNode.className = "selectimg";
	// 				imgflag.src = "../img/circle.png";
	// 			}
	// 		}); 

	// 		let imgp = imgflag.parentNode.parentNode;
	// 		let lreduce = imgp.children[2].children[2];
	// 		let radd = imgp.children[2].children[0];
	// 		let mcount = imgp.children[2].children[1];

	// 		// 减少数量按钮
	// 		addTaplistener(lreduce, function(e){
	// 			if(parseInt(mcount.innerHTML) == 1){
	// 				ul.removeChild(imgp.parentNode);
	// 			}
	// 			mcount.innerHTML = parseInt(mcount.innerHTML) - 1;

	// 		});
	// 		// 增加数量按钮
	// 		addTaplistener(radd, function(e){
	// 			if(parseInt(mcount.innerHTML) < 20){
	// 				mcount.innerHTML = parseInt(mcount.innerHTML) + 1;
	// 			}else{
	// 				confirm("一次最多订购同类水20桶");
	// 			}


	// 		});
	// 		// 清空img的className
	// 		imgflag.className = ' ';
	// 	}else{
	// 		let waterType = document.getElementsByClassName("waterType");
	// 		for(let i = 0; i < waterType.length; i++){
	// 			if(waterType[i].children[1].children[1].innerHTML == addWaterType){
	// 				waterType[i].children[1].children[2].children[1].innerHTML = parseInt(waterType[i].children[1].children[2].children[1].innerHTML) + 1;
	// 			}
	// 		}

	// 	}

	// },false);



	// 结算
	let calculate = document.getElementById('calculate');
	calculate.addEventListener('tap', function(e) {
		var allPrice = parseFloat(0);
		let userid = plus.storage.getItem('userid');
		let url = "http://192.168.1.101:8080" + "/getShopping_Trolley";
		ajax(
			url,
			'POST', {
				'userid': userid,
			},
			'default',
			function success(data) {
				let ndata = eval('(' + data + ')')
				let select_order = []
				// select传递
				let si = document.getElementsByClassName("selectimg");
				for(let i = 0; i < si.length; i++){
					if(si[i].className.indexOf("selected") != -1){
						select_order.push(1)
						allPrice += parseFloat(ndata[i].price)
					}
					else{
						select_order.push(0)
					}
				}
				
				// alert()
				
				// alert(data)
				allPrice = allPrice.toFixed(2);
				mui.openWindow({
					url: 'confirm_order.html',
					id: 'confirm_order.html',
					styles: {
						top: '0px', //新页面顶部位置
						bottom: '0px', //新页面底部位置
						width: '100%', //新页面宽度，默认为100%
						height: '100%', //新页面高度，默认为100%
					},
					extras: {
						money: allPrice,
						select_order:select_order,
					},
					createNew: true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					show: {
						autoShow: true, //页面loaded事件发生后自动显示，默认为true
						aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
						duration: 200 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
					},
					waiting: {
						autoShow: false, //自动显示等待框，默认为true
						title: '正在加载...', //等待对话框上显示的提示内容
						options: {
							// width:waiting-dialog-widht,//等待框背景区域宽度，默认根据内容自动计算合适宽度
							// height:waiting-dialog-height,//等待框背景区域高度，默认根据内容自动计算合适高度
							// ......
						}
					}
				});
			},
			function error() {
				alert("无网络连接");
			}
		);



		// let w = plus.webview.getWebviewById('confirm_order.html');
		// w.evalJS('loadData();');
		// w.show()

	}, false);






}, false);

// 发送自定义 STORAGE事件
function test() {
	window.dispatchEvent(myEvent);
}


// 判断购物车里是否存在该商品
function isExist(waterTypeName) {
	// alert(waterTypeName);
	let waterType = document.getElementsByClassName("waterType");
	for (let i = 0; i < waterType.length; i++) {
		// alert(waterType[i].children[1].innerHTML);
		if (waterType[i].children[1].children[1].innerHTML == waterTypeName)

			return true;
	}
	return false;
}

function loadData() {



	let money = document.getElementsByClassName('money')[0];
	money.innerHTML = '￥ ' + (0).toFixed(2);

	let selectAll = document.getElementById('selectAll');
	selectAll.children[0].className = 'selectImg iconfont icon-xuanze'


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
				// 创建li
				let li = document.createElement("li");



				li.innerHTML = '<div class="mui-slider-right mui-disabled">' +
					'<a class="mui-btn mui-btn-red">删除</a></div>' +
					'<div class="mui-slider-handle fullBox">' +
					'<div id="" class="selectimg" style="background:red">' +
					'<img class="imgflag" src="../img/circle.png"/></div>' +
					'<div id="" class="waterTypetext" >' +
					'<div style="position:absolute; left:15%">' +
					ndata[i].waterType + '（' + changeLocationToText(ndata[i].location) + ' ' + ndata[i].floor + '楼）' +
					'</div>' +
					'<div style="color:gray; position:absolute; left:15% ; top:60%">' +
					'￥' + ndata[i].price +
					'</div>' +
					'</div>' +
					'<div id="" class="waterCountFunc" >' +
					'<div  class="countAdd">+</div>' +
					'<div  class="count">' +
					ndata[i].count +
					'</div>' +
					'<div  class="countDel">-</div>' +
					'</div></div>'

				li.className = 'waterType mui-table-view-cell';
				ul.appendChild(li);

				// 删除一条购物车商品
				addTaplistener(li.children[0].children[0], function(e) {
					ul.removeChild(li);
					let itemInfos = [];
					itemInfos.push(ndata[i].waterType);
					itemInfos.push(ndata[i].count);
					itemInfos.push(ndata[i].price);
					itemInfos.push(ndata[i].userid);
					itemInfos.push(ndata[i].location);
					itemInfos.push(ndata[i].floor);

					if (li.children[1].children[0].className.indexOf('selected') != -1) {
						let money = document.getElementsByClassName('money')[0];
						money.innerHTML = '￥ ' + (parseFloat(money.innerHTML.substr(2, money.innerHTML
							.length - 2)) - ndata[i].price * parseInt(li.children[1].children[2]
							.children[1].innerHTML)).toFixed(2);
					}


					let url = "http://192.168.1.101:8080" + "/reduceItem";
					ajax(
						url,
						'POST', {
							'itemInfos': itemInfos,
						},
						'default',
						function success(data) {
							// alert(data);
						},
						function error() {
							alert("无网络连接");
						}
					);

					// 首页商品加回数量
					let w = plus.webview.getWebviewById("home.html")
					w.evalJS('restoreCount("' + ndata[i].location + '",' + ndata[i].floor + ',"' +
						getWaterType(ndata[i].waterType) + '",' + ndata[i].count + ')')
					// alert("2333")

					// 同步数据库 添加
					url = "http://192.168.1.101:8080" + "/addCommodityCount";
					ajax(
						url,
						'POST', {
							'location': ndata[i].location,
							'floor': ndata[i].floor,
							'commodityType': getWaterType(ndata[i].waterType),
							'Count': ndata[i].count,
						},
						'default',
						function success(data) {
							// alert(data);
						},
						function error() {
							alert("无网络连接");
						}
					);
				});


				// 选择框对象
				// 监听点击选择事件
				let imgflag = document.getElementsByClassName("imgflag")[0];
				imgflag.addEventListener('tap', function(e) {
					let userid = plus.storage.getItem('userid');
					let url = "http://192.168.1.101:8080" + "/getShopping_Trolley";
					ajax(
						url,
						'POST', {
							'userid': userid,
						},
						'default',
						function success(data) {
							let d1 = eval('(' + data + ')');
							if (imgflag.src.indexOf("circle.png") != -1) {
								imgflag.parentNode.className += " selected";
								imgflag.src = "../img/circle_selected.png";
								let money = document.getElementsByClassName('money')[0];
								money.innerHTML = '￥ ' + (parseFloat(money.innerHTML.substr(2, money
									.innerHTML.length - 2)) + d1[i].price * d1[i].count).toFixed(2);

							} else {
								imgflag.parentNode.className = "selectimg";
								imgflag.src = "../img/circle.png";
								let money = document.getElementsByClassName('money')[0];
								money.innerHTML = '￥ ' + (parseFloat(money.innerHTML.substr(2, money
									.innerHTML.length - 2)) - d1[i].price * d1[i].count).toFixed(2);
							}
						},
						function error() {
							alert("无网络连接");
						}
					);


				}, false);


				let imgp = imgflag.parentNode.parentNode;
				let lreduce = imgp.children[2].children[2];
				let radd = imgp.children[2].children[0];
				let mcount = imgp.children[2].children[1];

				// 减少数量按钮
				addTaplistener(lreduce, function(e) {
					if (parseInt(mcount.innerHTML) == 1) {
						ul.removeChild(imgp.parentNode);

					}

					if (li.children[1].children[0].className.indexOf('selected') != -1) {
						let money = document.getElementsByClassName('money')[0];
						money.innerHTML = '￥ ' + (parseFloat(money.innerHTML.substr(2, money.innerHTML
							.length - 2)) - ndata[i].price).toFixed(2);
					}



					let itemInfos = [];
					itemInfos.push(ndata[i].waterType);
					itemInfos.push(parseInt(mcount.innerHTML));
					itemInfos.push(ndata[i].price);
					itemInfos.push(ndata[i].userid);
					itemInfos.push(ndata[i].location);
					itemInfos.push(ndata[i].floor);

					let url = "http://192.168.1.101:8080" + "/reduce";
					ajax(
						url,
						'POST', {
							'itemInfos': itemInfos,
						},
						'default',
						function success(data) {
							// alert(data);
						},
						function error() {
							alert("无网络连接");
						}
					);

					mcount.innerHTML = parseInt(mcount.innerHTML) - 1;

					// 首页商品加回数量
					let w = plus.webview.getWebviewById("home.html")
					w.evalJS('restoreCount("' + ndata[i].location + '",' + ndata[i].floor + ',"' +
						getWaterType(ndata[i].waterType) + '",' + 1 + ')')
					// alert("2333")

					// 同步数据库 添加
					url = "http://192.168.1.101:8080" + "/addCommodityCount";
					ajax(
						url,
						'POST', {
							'location': ndata[i].location,
							'floor': ndata[i].floor,
							'commodityType': getWaterType(ndata[i].waterType),
							'Count': 1,
						},
						'default',
						function success(data) {
							// alert(data);
						},
						function error() {
							alert("无网络连接");
						}
					);

				});
				// 增加数量按钮
				addTaplistener(radd, function(e) {
					if (parseInt(mcount.innerHTML) < 20) {


						
						
						// alert("2333")

						// 同步数据库 减少
						url = "http://192.168.1.101:8080" + "/reduceCommodityCount";
						ajax(
							url,
							'POST', {
								'location': ndata[i].location,
								'floor': ndata[i].floor,
								'commodityType': getWaterType(ndata[i].waterType),
							},
							'default',
							function success(data) {
								if(data == 1){
									alert("这层没水了")
								}else{
									
									if (li.children[1].children[0].className.indexOf('selected') != -1) {
										let money = document.getElementsByClassName('money')[0];
										money.innerHTML = '￥ ' + (parseFloat(money.innerHTML.substr(2, money.innerHTML
											.length - 2)) + ndata[i].price).toFixed(2);
									}
									
									
									let itemInfos = [];
									itemInfos.push(ndata[i].waterType);
									itemInfos.push(parseInt(mcount.innerHTML));
									itemInfos.push(ndata[i].price);
									itemInfos.push(ndata[i].userid);
									itemInfos.push(ndata[i].location);
									itemInfos.push(ndata[i].floor);
									
									let url = "http://192.168.1.101:8080" + "/add";
									ajax(
										url,
										'POST', {
											'itemInfos': itemInfos,
										},
										'default',
										function success(data) {
											// alert(data);
										},
										function error() {
											alert("无网络连接");
										}
									);
									
									mcount.innerHTML = parseInt(mcount.innerHTML) + 1;
									
									
									// 首页商品减少数量
									let w = plus.webview.getWebviewById("home.html")
									w.evalJS('reduceCount("' + ndata[i].location + '",' + ndata[i].floor + ',"' +
										getWaterType(ndata[i].waterType) + '",' + 1 + ')')
								}
								
							},
							function error() {
								alert("无网络连接");
							}
						);

					} else {
						confirm("一次最多订购同类水20桶");
					}


				});
				// 清空img的className
				imgflag.className = ' ';
			}



		},
		function error() {
			alert("无网络连接");
		}
	);

}


function getWaterType(waterType) {
	if (waterType == "10L大桶水")
		return 1
	else
		return 2
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
