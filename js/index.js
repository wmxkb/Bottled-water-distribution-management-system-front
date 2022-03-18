
// plusready，H5+api需要在plusready后执行
document.addEventListener('plusready', function(e){
	
	// 载入注册页面
	webviewCreate({
		subpage:[
		{
			url:"index.html",
			id:"index.html",
			style:{
				top:'0px',
				bottom:'0px',
			
			},
		},
		{
			url:"./html-u/register.html",
			id:"register.html",
			style:{
				top:'0px',
				bottom:'0px',
			
			},
		},
		{
			url:"./html-u/default.html",
			id:"default.html",
			style:{
				top:'0px',
				bottom:'0px',
			
			},
		},
		
		],
	},
	// plus.webview.currentWebview()
	);
	
	
	
	changeView('index.html');
	
	if(plus.storage.getItem("keepLogin") == "aleadyLogin"){
		changeView("default.html");
	}
	// 获取登录按钮所在div
	let loginbox = document.getElementById("loginbox");
	//监听登录botton的tap事件 
	
	addTaplistener(loginbox, function(e){
		// 用户键入的账号密码信息
		let username = document.getElementById("username");
		let password = document.getElementById("password");
		let data = "userinfos[]=" + username + "&userinfos[]=" + password;
		// push入useinfos列表
		let userinfos = [];
		userinfos.push(username.value);
		userinfos.push(password.value);
		// username.value = "233";
		// 目标url
		let url = "http://192.168.1.115:8080" + "/login";
		// alert("333");
		// 175.178.111.20:8080
		
		
		let role;
		let roleChecked = document.getElementsByClassName('input_checked');
		// alert(roleChecked[0].checked);
		if(roleChecked[0].checked){
			role = 0;
		}else{
			role = 1;
		}
		
		
		
		ajax(
			url, 
			'POST',
			 {
				'userinfos':userinfos,
				'role':role,
			 }, 
			'default',
			function success(data){
				if(data == 0){
					// changeText('login', 'default.html', "登录成功");
					plus.storage.setItem("keepLogin", "aleadyLogin");
					plus.storage.setItem("userid", username.value);
					let login = document.getElementById('login');
					let old = login.innerText;
					login.innerHTML="登录成功";
					setTimeout(function () {
						// alert(role);
						if(role == 0)
							plus.webview.getWebviewById('default.html').show();
						else{
							// alert(role);
							plus.webview.open('html-a/tab_nav.html');						
						}
						login.innerHTML=old;
						username.value = "";
						password.value = "";
					}, 500);
					
				}
				else
					alert("账号或密码错误");
			},
			function error(){
				alert("无网络连接");
			}
		);
	})
	
	// 获取register a标签对象
	register = document.getElementById("register");
	// 监听register a标签tap事件
	addTaplistener(register, function(e){
		changeView('register.html');
		// closeWebview();
	});
	
},false);