// plusready，H5+api需要在plusready后执行
document.addEventListener('plusready', function(e){
	
	webviewCreate({
		subpage:[
		{
			url:"../index.html",
			id:"index.html",
			style:{
				top:'0px',
				bottom:'0px',
			
			},
		},
		
		
		
		],
	},
	// plus.webview.currentWebview()
	);
	
	let logout = document.getElementById("logout");
	let confirm = document.getElementById("confirm");
	let cancle = document.getElementById("cancle");
	let popdiv = document.getElementById("popdiv");
	let mask = document.getElementById("mask");
	
	//监听登录logout的tap事件 
	addTaplistener_logout2(logout, function(e){
		// 打开屏蔽罩
		mask.style.visibility = "visible";
		// 底部弹窗
		popdiv.className = "message_alert pop";
		// changeView('index.html');
	});
	// 监听确认退出登录tap时间
	addTaplistener_logout1(confirm, function(e){
		// 关闭屏蔽罩
		popdiv.className = "message_alert";
		// 重置当前导航栏初始状态
		// 2022.3.23 还未重写
		// changeView('home.html');
		// var home = plus.webview.getWebviewById('default.html').evalJS(
		// 	'home.style.color = "#007aff";setting.style.color = "#929292";func.style.color="#929292";'
		// );
		plus.storage.setItem("keepLogin", "notLogin");
		plus.storage.setItem("userid", "none");
		// 退回登录页面
		changeView('index.html');
		// 减少一点突兀感
		setTimeout(function() {mask.style.background = "rgba(0,0,0,0.3)";}, 50);
		setTimeout(function() {mask.style.background = "rgba(0,0,0,0.2)";}, 50);
		setTimeout(function() {mask.style.background = "rgba(0,0,0,0.1)";}, 50);
		setTimeout(function() {mask.style.visibility = "hidden";}, 50);
	});
	// 监听确认取消tap时间
	addTaplistener_logout1(cancle, function(e){
		// 关闭屏蔽罩
		popdiv.className = "message_alert";
		// 减少一点突兀感
		setTimeout(function() {mask.style.background = "rgba(0,0,0,0.3)";}, 50);
		setTimeout(function() {mask.style.background = "rgba(0,0,0,0.2)";}, 50);
		setTimeout(function() {mask.style.background = "rgba(0,0,0,0.1)";}, 50);
		setTimeout(function() {mask.style.visibility = "hidden";}, 50);
	});
	
	// alert("111");
	let address = document.getElementById('address');
	addTaplistener(address,function(e){
		mui.openWindow({
			url:'address.html',
			id:'address.html',
			styles:{
			  top: '0px',//新页面顶部位置
			  bottom:'0px',//新页面底部位置
			  width:'100%',//新页面宽度，默认为100%
			  height:'100%',//新页面高度，默认为100%
			},
			extras:{
			  //自定义扩展参数，可以用来处理页面间传值
			},
			createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			show:{
			  autoShow:true,//页面loaded事件发生后自动显示，默认为true
			  aniShow:'slide-in-right',//页面显示动画，默认为”slide-in-right“；
			  duration:200//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			},
			waiting:{
			  autoShow:false,//自动显示等待框，默认为true
			  title:'正在加载...',//等待对话框上显示的提示内容
			  options:{
				// width:waiting-dialog-widht,//等待框背景区域宽度，默认根据内容自动计算合适宽度
				// height:waiting-dialog-height,//等待框背景区域高度，默认根据内容自动计算合适高度
				// ......
			  }
			}
		});
	});
	
	// 监听设置li的tap
	let setting = document.getElementById('setting');
	addTaplistener(setting,function(e){
		// alert("2333");
		mui.openWindow({
		    url:'setting.html',
		    id:'setting.html',
		    styles:{
		      top: '0px',//新页面顶部位置
		      bottom:'0px',//新页面底部位置
		      width:'100%',//新页面宽度，默认为100%
		      height:'100%',//新页面高度，默认为100%
		    },
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    show:{
		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
		      aniShow:'slide-in-right',//页面显示动画，默认为”slide-in-right“；
		      duration:200//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		    },
		    waiting:{
		      autoShow:false,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		      options:{
		        // width:waiting-dialog-widht,//等待框背景区域宽度，默认根据内容自动计算合适宽度
		        // height:waiting-dialog-height,//等待框背景区域高度，默认根据内容自动计算合适高度
		        // ......
		      }
		    }
		});
	});
	
	
	
},false);





// logout_tap事件监听
const addTaplistener_logout1 = (element, callback) => {
	// element:事件源dom，callback:执行的方法
	let move = false,
	startTime = null;
	element.addEventListener('touchstart', function () {
		element.style.background = "#e5e5e5";
		startTime = Date.now();
	}, false);
	element.addEventListener('touchmove', function () {
		// move = true;
	}, false);
	element.addEventListener('touchend', function (e) {
		element.style.background = "#FFFFFF";
		// 不移动且停留时间小于200ms，触发tap
		if (!move && Date.now() - startTime < 1000) {
			// 通过apply将this指向dom而不是window，并传递事件对象
			// 不太清楚，先用着
			callback.apply(this, [e]);
		}
		// 重置参数
		startTime = null;
		move = false;
	}, false)

}

// logout_tap事件监听
const addTaplistener_logout2 = (element, callback) => {
	// element:事件源dom，callback:执行的方法
	let move = false,
	startTime = null;
	element.addEventListener('touchstart', function () {
		element.style.background = "#cccccc";
		startTime = Date.now();
	}, false);
	element.addEventListener('touchmove', function () {
		move = true;
	}, false);
	element.addEventListener('touchend', function (e) {
		element.style.background = "#dddddd";
		// 不移动且停留时间小于200ms，触发tap
		if (!move && Date.now() - startTime < 1000) {
			// 通过apply将this指向dom而不是window，并传递事件对象
			// 不太清楚，先用着
			callback.apply(this, [e]);
		}
		// 重置参数
		startTime = null;
		move = false;
	}, false)

}