document.addEventListener('plusready', function(e) {
	let url = 'http://192.168.1.101:8080'
	let api = '/getAllOrderMain'
	// let userid = plus.storage.getItem('userid')
	let ul = document.getElementById('ul')
	mui.ajax(url + api, {
		data: {
			// 'userid':userid
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			// console.log(data[0].orderUserId + ' ' + data[0].orderPrice +  ' ' + data[0].orderTime)
			// plus.storage.setItem('orderNumber', data[])
			for (let i = data.length - 1; i >= 0; i--) {
				let li = document.createElement("li")
				// li.style.border = "8px solid #F5F5F5"
				// li.style.borderRadius = "30px"
				li.className = 'mui-table-view-cell orderBlock'
				li.innerHTML =
					'<div style="width:50px; float: left; padding-top: 15px;">' +
					data[i].orderUserId +
					'</div>' +
					'<div style="width:50px; float: left; margin-left: 30px;padding-top: 15px;">' +
					'￥' +
					data[i].orderPrice +
					'</div>' +
					'<div style="float: left; margin-left: 40px;padding-top: 15px;">' +
					data[i].orderTime +
					'</div>'
				ul.appendChild(li)
			}
		},
		error: function(xhr, type, errorThrown) {

		}
	});



	// mui('.mui-content').on('tap','.orderBlock',function(e){
	// 	mui.openWindow({
	// 	    url:'orders_detail.html',
	// 	    id:'orders_detail.html',
	// 	    styles:{
	// 	      top: '0px',//新页面顶部位置
	// 	      bottom:'0px',//新页面底部位置
	// 	      width:'100%',//新页面宽度，默认为100%
	// 	      height:'100%',//新页面高度，默认为100%
	// 	    },
	// 	    extras:{
	// 	      //自定义扩展参数，可以用来处理页面间传值
	// 	    },
	// 	    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	// 	    show:{
	// 	      autoShow:true,//页面loaded事件发生后自动显示，默认为true
	// 	      aniShow:'slide-in-right',//页面显示动画，默认为”slide-in-right“；
	// 	      duration:200//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
	// 	    },
	// 	    waiting:{
	// 	      autoShow:false,//自动显示等待框，默认为true
	// 	      title:'正在加载...',//等待对话框上显示的提示内容
	// 	      options:{
	// 	        // width:waiting-dialog-widht,//等待框背景区域宽度，默认根据内容自动计算合适宽度
	// 	        // height:waiting-dialog-height,//等待框背景区域高度，默认根据内容自动计算合适高度
	// 	        // ......
	// 	      }
	// 	    }
	// 	});

	// })

	setTimeout(function() {
		let q = document.getElementsByClassName('orderBlock')
		// alert(q.length)
		// alert("22")
		for (let i = 0; i < q.length; i++) {
			q[i].addEventListener('tap', function(e) {
				let url = 'http://192.168.1.101:8080'
				let api = '/getAllOrderMain'
				
				mui.ajax(url + api, {
					data: {
						// 'userid':userid
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						// console.log(data[i].orderNumber)
						mui.openWindow({
							url: 'orders_detail.html',
							id: 'orders_detail.html',
							styles: {
								top: '0px', //新页面顶部位置
								bottom: '0px', //新页面底部位置
								width: '100%', //新页面宽度，默认为100%
								height: '100%', //新页面高度，默认为100%
							},
							extras: {
								//自定义扩展参数，可以用来处理页面间传值
								orderNumber:data[q.length - i - 1].orderNumber,
								orderTime:data[q.length - i - 1].orderTime,
								orderPrice:data[q.length - i - 1].orderPrice,
							},
							createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
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
					error: function(xhr, type, errorThrown) {
				
					}
				});
				
			}, false)
		}
	}, 1000);


}, false)
