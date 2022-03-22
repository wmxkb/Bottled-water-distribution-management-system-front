
// plusready
document.addEventListener('plusready', function(e){
	
	// alert("233");
	webviewCreate2({
		subpage:[
		{
			url:"home.html",
			id:"home.html",
			style:{
				top:'0px',
				bottom:'85px',
			
			},
		},
		{
			url:"shopping_trolley.html",
			id:"shopping_trolley.html",
			style:{
				top:'0px',
				bottom:'0px',
			
			},
		},
		
		],
	});
	// plus.webview.currentWebview().
	// alert("233");
	// alert(plus.webview.getWebviewById("home.html"));
	
	changeView("home.html");
	
	// alert("233");
	let w = plus.webview.getWebviewById("shopping_trolley.html");
	let shopping_trolley = document.getElementById("shopping_trolley");
	
	// addTaplistener(shopping_trolley, function(e){
	// 	plus.navigator.setStatusBarBackground("#F5F5F5");
	// 	changeView("shopping_trolley.html");
		
		
	// });
	
	// alert(233);
	// 添加商品到购物车
	
	
	mui('.floorGoods').on('tap','.dmg',function(){
		let itemInfos = [];
		
		let id = this.children[0].getAttribute('id');
		let l = this.parentNode.children[3].innerHTML.length;
		let price = parseFloat(this.parentNode.children[3].innerHTML.substr(1, l - 1));
		
		let floor = fixChToNum((this.parentNode).parentNode.children[0].innerHTML)
		let location = sl.options[sl.selectedIndex].value;
		// alert(price);
		if(id == 'type1'){
			plus.storage.setItem('addWaterType', '10L大桶水');
			itemInfos.push('10L大桶水');
		}else{
			plus.storage.setItem('addWaterType', '5L小桶水');
			itemInfos.push('5L小桶水');
		}
		
		
		w.evalJS("test();");
		
		
		itemInfos.push(price);
		itemInfos.push(1);
		itemInfos.push(plus.storage.getItem('userid'))
		itemInfos.push(location)
		itemInfos.push(floor)
		// username.value = "233";
		// 目标url
		let url = "http://192.168.1.101:8080" + "/add";
		ajax(
			url, 
			'POST',
			 {
				'itemInfos':itemInfos,
			 }, 
			'default',
			function success(data){
				// alert(data);
			},
			function error(){
				alert("无网络连接");
			}
		);
		// 修改首页商品数量
		let Count = this.parentNode.children[2]
		// alert(Count.innerHTML.substr(1, Count.innerHTML.length - 2))
		
		Count.innerHTML ='余' + (parseInt(Count.innerHTML.substr(1, parseInt(Count.innerHTML.length) - 2)) - 1) + '份'
		
		// 同步数据库 - 减少
		url = "http://192.168.1.101:8080" + "/reduceCommodityCount";
		ajax(
			url, 
			'POST',
			 {
				'location':location,
				'floor':floor,
				'commodityType':id.substr(4,1)
			 }, 
			'default',
			function success(data){
				// alert(data);
			},
			function error(){
				alert("无网络连接");
			}
		);
	});
	
	// // 购物车插入测试
	// let add1 = document.getElementById("add1");
	// addTaplistener(add1,function(e){
	// 	plus.storage.setItem('addWaterType', '10L大桶水');
	// 	// plus.storage.setItem('addWaterId', '1');
	// 	w.evalJS("test();");
	// });
	
	
	// // 购物车插入测试2
	// let add2 = document.getElementById("add2");
	// addTaplistener(add2,function(e){
	// 	plus.storage.setItem('addWaterType', '5L小桶水');
	// 	// plus.storage.setItem('addWaterId', '2');
	// 	w.evalJS("test();");
		
	// });
	
	
	
	
	
	
},false);



function fixChToNum(Ch){
	let res;
	switch (Ch){
		case "一楼":
			res = 1;
			break;
		case "二楼":
			res = 2;
			break;
		case "三楼":
			res = 3;
			break;
		case "四楼":
			res = 4;
			break;
		case "五楼":
			res = 5;
			break;
		case "六楼":
			res = 6;
			break;
		default:
			break;
	}
	return res;
}


function showData(){
	let sl = document.getElementById("sl");
	let location = sl.options[sl.selectedIndex].value;
	let url = "http://192.168.1.101:8080" + "/getCommodity_infos";
	ajax(
		url, 
		'POST',
		 {
			'location':location,
		 }, 
		'default',
		function success(data){
			let ndata = eval('(' + data + ')');
			// alert(data);
			for(let i = 0; i < ndata.length; i++){
				// alert(ndata[i].floor)
				// 从6楼开始...不知道为啥
				
				let commodityName = document.getElementsByClassName("type" + ndata[i].commodityType)[ndata[i].floor]
				if(commodityName != null){
					commodityName.parentNode.children[2].innerHTML = "余" + ndata[i].commodityCount + "份"
					commodityName.parentNode.children[3].innerHTML = "￥" + ndata[i].commodityPrice
				}
				if(ndata[i].floor == 1){
					let commodityName = document.getElementsByClassName("type" + ndata[i].commodityType)[7]
					if(commodityName != null){
						commodityName.parentNode.children[2].innerHTML = "余" + ndata[i].commodityCount + "份"
						commodityName.parentNode.children[3].innerHTML = "￥" + ndata[i].commodityPrice
					}
				}
				
				if(ndata[i].floor == 6){
					let commodityName = document.getElementsByClassName("type" + ndata[i].commodityType)[0]
					if(commodityName != null){
						commodityName.parentNode.children[2].innerHTML = "余" + ndata[i].commodityCount + "份"
						commodityName.parentNode.children[3].innerHTML = "￥" + ndata[i].commodityPrice
					}
				}
				
				
				
				// let floor = document.getElementById("d" + r[i - 1].floor);
				
				// floor.innerHTML = "大桶水:" + r[i - 1].bigWater + "   小桶水:" + r[i - 1].smallWater;
			}
		},
		function error(){
			for(let i = 1; i <= 6; i++){
				let commodityName = document.getElementsByClassName("type1")[i]
				if(commodityName != null){
					commodityName.parentNode.children[2].innerHTML = "余" + "??" + "份"
					commodityName.parentNode.children[3].innerHTML = "￥" + "??"
				}
			}
			
		}
	);
}



	
// 选择location后触发
function selectLocation(){
	showData();
}


// 购物车删除商品后恢复首页数量
function restoreCount(location, floor, waterType, count){
	// alert("2333")
	let sl = document.getElementById("sl");
	let nowLocation = sl.options[sl.selectedIndex].value;
	
	let goodName = document.getElementsByClassName("type1")[floor];
	
	let Count = goodName.parentNode.children[2];
	// alert(Count.innerHTML)
	if(nowLocation == location){
		Count.innerHTML ='余' + (parseInt(Count.innerHTML.substr(1, parseInt(Count.innerHTML.length) - 2)) + count) + '份'
	}
	
	
}

function reduceCount(location, floor, waterType, count){
	// alert("2333")
	let sl = document.getElementById("sl");
	let nowLocation = sl.options[sl.selectedIndex].value;
	
	let goodName = document.getElementsByClassName("type1")[floor];
	
	let Count = goodName.parentNode.children[2];
	// alert(Count.innerHTML)
	if(nowLocation == location){
		Count.innerHTML ='余' + (parseInt(Count.innerHTML.substr(1, parseInt(Count.innerHTML.length) - 2)) - count) + '份'
	}
	
	
}
