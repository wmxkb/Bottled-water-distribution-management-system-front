
// tap事件监听
const addTaplistener = (element, callback) => {
	// element:事件源dom，callback:执行的方法
	let move = false,
	startTime = null;
	element.addEventListener('touchstart', function () {
		startTime = Date.now();
	}, false);
	element.addEventListener('touchmove', function () {
		move = true;
	}, false);
	element.addEventListener('touchend', function (e) {
		// 不移动且停留时间小于200ms，触发tap
		if (!move && Date.now() - startTime < 200) {
			// 通过apply将this指向dom而不是window，并传递事件对象
			// 不太清楚，先用着
			callback.apply(this, [e]);
		}
		// 重置参数
		startTime = null;
		move = false;
	}, false)

}
// 监听指定区域内tap事件
const addTaplistenerbypoint = (xt, r, callback) => {
	// callback:执行的方法
	let move = false,
	startTime = null;
	
	let x, y;
	let s = false;
	let ee;
	document.addEventListener('touchstart', function (e) {
		e = e || window.event;
		ee = e;
		y = e.touches[0].clientY;
		x = e.touches[0].clientX;
		
		// alert("1");
		if((x - xt) * (x - xt)  < r * r){
			s = true;
			// alert("1");
		}
		startTime = Date.now();
	}, false);
	document.addEventListener('touchmove', function () {
		move = true;
	}, false);
	document.addEventListener('touchend', function (e) {
		// 修复bug
		x = ee.touches[0].clientX;
		if((x - xt) * (x - xt)  > r * r){
			s = false;
		}
		
		// 不移动且停留时间小于200ms，触发tap
		if (s && !move && Date.now() - startTime < 200) {
			// 通过apply将this指向dom而不是window，并传递事件对象
			// 不太清楚，先用着
			callback.apply(this, [y]);
		}
		// 重置参数
		startTime = null;
		move = false;
		s = false;
		x = 0;
		y = 0;
	}, false)

}
// ajax封装
const ajax = (url, type, data, datatype, success, error) =>{
	// 获取对象属性名
	let dataname = Object.getOwnPropertyNames(data);
	let ndata = '';
	if(datatype == "default"){
		for(let i  = 0; i < dataname.length; i++){
			
			if(i != 0)
				ndata = ndata + '&';
			if(typeof(data[dataname[i]]) == 'object'){
				
				for(let j = 0; j < data[dataname[i]].length; j++){
					if(j != 0)
						ndata = ndata + '&';
					ndata = ndata + dataname[i] + "[]=" + data[dataname[i]][j];
				}
			}else
				ndata = ndata + dataname[i] + "=" + data[dataname[i]];
		}
	}
	data = ndata;
	// alert(data);
	// 创建 XMLHttpRequest 对象
	// 因为要跨域，所以用plus.net.XMLHttpRequest
	let xmlhttp = new plus.net.XMLHttpRequest();
	// 当 readyState 改变时，就会触发 onreadystatechange 事件
	xmlhttp.onreadystatechange=function(){
		// 4:请求完成并响应就绪
		if (xmlhttp.readyState == 4 ){
			// success 正常返回200，用XMLHttpRequest没有解决跨域的话返回0
			if ((xmlhttp.status == 200 && xmlhttp.status < 300) || xmlhttp.status == 304){
				success.apply(this, [xmlhttp.responseText]);
			// false
			}else{
				error.apply(this);
			}
		} 
	}
	// 规定请求的类型、URL 以及是否异步处理请求。""
	xmlhttp.open(type, url, false);
	// 添加 HTTP 头
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	// 将请求发送到服务器。
	xmlhttp.send(data);
}

// 加载页面
// function webviewCreate(page){
// 	for(let i = 0; i < page.subpage.length; i++){
		
// 		plus.webview.create(
// 			// 本地url或者网络url
// 			page.subpage[i].url,
// 			page.subpage[i].id,
// 			page.subpage[i].style,
// 		);
// 	}
	
// }

// 加载页面
function webviewCreate(page){
	let cw = plus.webview.currentWebview();
	for(let i = 0; i < page.subpage.length; i++){
		if(plus.webview.getWebviewById(page.subpage[i].id) == null){
			cw.append(plus.webview.create(
				// 本地url或者网络url
				page.subpage[i].url,
				page.subpage[i].id,
				page.subpage[i].style,
			));
		}
		
	}
	
}

// 加载页面
function webviewCreate2(page){
	// let cw = plus.webview.currentWebview();
	for(let i = 0; i < page.subpage.length; i++){
		if(plus.webview.getWebviewById(page.subpage[i].id) == null){
			plus.webview.create(
				// 本地url或者网络url
				page.subpage[i].url,
				page.subpage[i].id,
				page.subpage[i].style,
			);
		}
		
	}
	
}

// 显示，2s后消失并跳转
function alertText(id, url){
	let showtext = document.getElementById(id);
	showtext.style.display="";
	setTimeout(function () {
		showtext.style.display="none";
	}, 2000);
	window.location.href=url;
	
}

// 修改内容并延迟跳转
function changeText(id, url, fixtext){
	
	let refix = document.getElementById(id);
	let old = refix.innerText;
	refix.innerHTML=fixtext;
	setTimeout(function () {
		plus.webview.getWebviewById(url).show();
		refix.innerHTML=old;
	}, 1000);
	
	
}

// 更换当期显示view
function changeView(id){
	var view = plus.webview.getWebviewById(id);
	view.show()
	
}


// 关闭Webview窗口
function closeWebview(){
	var ws=plus.webview.currentWebview();
	plus.webview.close(ws);
}

