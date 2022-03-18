
// plusready，H5+api需要在plusready后执行
document.addEventListener('plusready', function(e){

	// 获取登录按钮所在div
	let back = document.getElementById("back");
	//监听登录botton的tap事件 
	addTaplistener(back, function(e){
		if(back.classList.contains('back-action')){
			// changeView('index.html');
			// closeWebview();
			plus.webview.currentWebview().hide();
		}
	})
	// 获取注册按钮
	let register = document.getElementById("register");
	addTaplistener(register, function(){
		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;
		let userid = document.getElementById("userid").value;
		
		// 目标url
		let url = "http://192.168.1.115:8080" + "/register";
		// 175.178.111.20
		ajax(
			url,
			'POST',
			{
				'username':username,
				'password':password,
				'userid':userid,
			 }, 
			'default',
			function success(data){
				if(data == 0)
					changeText('register', 'index.html', "注册成功");
					
					// plus.webview.currentWebview().hide();
				else
					alert("输入不符合规范");
			},
			function error(){
				alert("无网络连接");
			}
		);
	})

	
},false);