
document.addEventListener('plusready',function(e){
	let ws=null;
	ws=plus.webview.currentWebview();
	// offset是刷新动画距离顶部的距离
	ws.setPullToRefresh(
		{
			support:true,
			color: "#084fd1",
			style:'default',
			height:'50px',
			range:'100px',
			contentdown:{
				caption:'下拉可以刷新'
			},
			contentover:{
				caption:'释放立即刷新'
			},
			contentrefresh:{
				caption:'正在刷新...'
			
			},
			offset:'10px',
		}, 
		onRefresh
	);
	ws.beginPullToRefresh();
		  
	// 刷新页面
	function onRefresh(){
		setTimeout(function(){
			console.log('刷新页面');
			// 执行刷新函数
			ws.endPullToRefresh();
		},1000);
	}
},false);