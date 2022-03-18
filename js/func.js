
// plusready，H5+api需要在plusready后执行
// alert("233");
document.addEventListener('plusready', function(){
	
	let ws=null;
	// var list=null;
	ws=plus.webview.currentWebview();
		// offset是刷新动画距离顶部的距离
		ws.setPullToRefresh({support:true,style:'circle',offset:'10px'}, onRefresh);
		// 第一次打开页面即开始刷新列表
		// setTimeout(function(){
		// 	// console.log('Initializ refresh');
			ws.beginPullToRefresh();
		// },200);
		  
	// 刷新页面
	function onRefresh(){
		setTimeout(function(){
			console.log('Initializ refresh');
			showData();
			// if(list){
			// 	var item=document.createElement('li');
			// 	item.innerHTML='<span>New Item '+(new Date())+'</span>';
			// 	list.insertBefore(item,list.firstChild);
			// }
			ws.endPullToRefresh();
		},1000);
	}
	// showData();
},false);

function showData(){
	let sl = document.getElementById("sl");
	let location = sl.options[sl.selectedIndex].value;
	let url = "http://175.178.111.20:8080" + "/getWater_infos";
	ajax(
		url, 
		'POST',
		 {
			'location':location,
		 }, 
		'default',
		function success(data){
			// alert(data);
			for(let i = 1; i <= 6; i++){
				let r = eval('(' + data + ')');
				let floor = document.getElementById("d" + r[i - 1].floor);
				
				floor.innerHTML = "大桶水:" + r[i - 1].bigWater + "   小桶水:" + r[i - 1].smallWater;
			}
		},
		function error(){
			for(let i = 1; i <= 6; i++){
				let floor = document.getElementById("d" + i);
				
				floor.innerHTML = "error";
			}
			
		}
	);
}



	
// 选择location后触发
function selectLocation(){
	showData();
}