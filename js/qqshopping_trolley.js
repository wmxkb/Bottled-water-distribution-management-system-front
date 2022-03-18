
// plusready
document.addEventListener('plusready', function(e){
	// 初始顺序为空
	plus.storage.setItem("q", "");
	// 返回图标 对象
	let returnHomebox = document.getElementById('returnHomebox');
	// function : 返回事件
	addTaplistener(returnHomebox,function(e){
		plus.navigator.setStatusBarBackground("#ffffff");
		plus.webview.currentWebview().hide();
		
	});
	
	// 管理、购物车、结算 对象
	let control = document.getElementById('control');
	let centerTexr = document.getElementById('centerText');
	let calculate = document.getElementById('calculate');
	// 判断是否处于管理状态
	let isControl = false; 
	
	// function : 管理按钮点击事件
	addTaplistener(control, function(e){
		if(!isControl){
			centerTexr.style.left = "calc(50% - 45px)";
			centerTexr.innerHTML = "管理购物车";
			control.innerHTML = "取消";
			calculate.innerHTML = "删除";
			isControl = true;
		}else{
			centerTexr.style.left = "calc(50% - 27px)";
			centerTexr.innerHTML = "购物车";
			control.innerHTML = "管理";
			calculate.innerHTML = "结算";
			isControl = false;
		}
		
	});
	
	// 选中/未选中状态 true / false
	let flag = [false, false, false, false, false, false, false, false, false, false];

	// 商品对象(主要)
	let waterType1 = document.getElementById("waterType1");
	let waterType2 = document.getElementById("waterType2");
	
	let waterType1p0 = document.getElementById("waterType1p0");
	let waterType2p0 = document.getElementById("waterType2p0");
	
	let waterType1p1 = document.getElementById("waterType1p1");
	let waterType2p1 = document.getElementById("waterType2p1");
	
	
	// let ll = document.getElementsByClassName("waterType");
	// addTaplistener(ll, function(){
	// 	alert("233");
	// });
	// function : 选择商品模块
	// 1类商品选择
	// addTaplistener(waterType1p0.children[0], function(e){
	// 	if(window.getComputedStyle(waterType1p0).visibility == 'visible'){
	// 		if(flag[0] == false){
	// 			waterType1p0.children[0].src = "../img/circle_selected.png";
	// 			flag[0] = true;
	// 		}else{
	// 			waterType1p0.children[0].src = "../img/circle.png";
	// 			flag[0] = false;
	// 		}
	// 	}
		
	// });
	// // 2类商品选择
	// addTaplistener(waterType2p0.children[0], function(e){
	// 	if(window.getComputedStyle(waterType2p0).visibility == 'visible'){
	// 		if(flag[1] == false){
	// 			waterType2p0.children[0].src = "../img/circle_selected.png";
	// 			flag[1] = true;
	// 		}else{
	// 			waterType2p0.children[0].src = "../img/circle.png";
	// 			flag[1] = false;
	// 		}
	// 	}
		
	// });

	
	
	
	// function aaa(){
	// 	// alert("2222");
	// 	let ul = document.getElementById("ul");
	// 	let li = document.createElement("li");
	// 	li.innerHTML = '<div id="" class="selectimg">'+'<img class="" src="../img/circle.png" />'+'</div>'+'<div id="" class="waterTypetext" >'+'10L大桶水'+'</div>'+'<div id="" class="waterCountFunc" >'+'<div  class="countAdd">+</div>'+'<div  class="count">1</div>'+'<div  class="countDel">-</div>'+'</div>'
		
	// 	li.className = 'waterType tag';
	// 	ul.appendChild(li);
	// 	// alert("2222");
	// 	tag = document.getElementsByClassName("tag")[0];
	// 	addTaplistener(tag, function(e){
	// 		alert("2222");
	// 	}); 
		
	// }
	
	let btn = document.getElementById('btn');
	addTaplistener(btn, function(e){
		// alert("2222");
		let ul = document.getElementById("ul");
		let li = document.createElement("li");
		li.innerHTML = '<div id="" class="selectimg">'+'<img class="" src="../img/circle.png" />'+'</div>'+'<div id="" class="waterTypetext" >'+'10L大桶水'+'</div>'+'<div id="" class="waterCountFunc" >'+'<div  class="countAdd">+</div>'+'<div  class="count">1</div>'+'<div  class="countDel">-</div>'+'</div>'
		
		li.className = 'waterType tag';
		ul.appendChild(li);
		// alert("2222");
		let tag = document.getElementsByClassName("tag")[0];
		let qq = tag.children[0];
		addTaplistener(qq, function(e){
			// alert("2222");
			let xxx = qq.children[0].src;
			let xxxx = qq.children[0];
			if(xxx.indexOf("circle.png") != -1){
				xxxx.src = "../img/circle_selected.png";
				// alert("111");
			}else{
				xxxx.src = "../img/circle.png";
			}
				
			// alert(xxx);
		}); 
		tag.className = 'waterType';
		// alert(tag.className);
	});
	
	
	
	
	// 全选
	// 是否被全选标志
	let isSeletAll = false;
	let selectAll = document.getElementById("selectAll");
	addTaplistener(selectAll,function(e){
		let drinkBox = document.getElementsByClassName('drinkBox');
		if(!isSeletAll){
			if(window.getComputedStyle(waterType1p0).visibility == 'visible'){
					waterType1p0.children[0].src = "../img/circle_selected.png";
					flag[0] = true;
			}
			if(window.getComputedStyle(waterType2p0).visibility == 'visible'){
					waterType2p0.children[0].src = "../img/circle_selected.png";
					flag[1] = true;
			}
			isSeletAll = true;
		}else{
			if(window.getComputedStyle(waterType1p0).visibility == 'visible'){
					waterType1p0.children[0].src = "../img/circle.png";
					flag[0] = true;
			}
			if(window.getComputedStyle(waterType2p0).visibility == 'visible'){
					waterType2p0.children[0].src = "../img/circle.png";
					flag[1] = true;
			}
			isSeletAll = false;
		}
		
	});
	
	
	
	// function : 结算 or 删除
	addTaplistener(calculate, function(e){
		// 如果管理按钮被点击了，执行
		if(isControl){
			// 删除
			// if(flag[0] == true){
			// 	// 将整个模块隐藏
			// 	waterType1.style.visibility = 'hidden';
			// 	// 更改图标为未选中
			// 	waterType1p0.children[0].src = "../img/circle.png";
			// 	// 更新数量为1
			// 	waterType1p1.children[0].innerHTML = '1';
			// 	// 标记状态为未选中
			// 	flag[0] = false;
			// }
			// if(flag[1] == true){
			// 	// 将整个模块隐藏
			// 	waterType2.style.visibility = 'hidden';
			// 	// 更改图标为未选中
			// 	waterType2p0.children[0].src = "../img/circle.png";
			// 	// 更新数量为1
			// 	waterType2p1.children[0].innerHTML = '1';
			// 	// 标记状态为未选中
			// 	flag[1] = false;
			// }
			// // 更新模块位置
			// // 获取模块出现顺序
			// let q = plus.storage.getItem("q");
			// // 删除后的新顺序
			// let nq = '';
			// // 出现模块数量
			// let len = 0;
			// // 更新
			// for(let i = 0; i < q.length; i++){
			// 	if(q[i] == '1'){
			// 		if(window.getComputedStyle(waterType1).visibility == 'visible'){
			// 			waterType1p0.style.top = ((8 + 12 * len)+"%");
			// 			waterType1p1.children[0].style.top = ((12 + 12 * len)+"%");
			// 			waterType1p1.children[1].style.top = ((12 + 12 * len)+"%");
			// 			waterType1p1.children[2].style.top = ((12 + 12 * len)+"%");
			// 			len++;
			// 			nq += "1";
			// 		}
			// 	}else if(q[i] == '2'){
			// 		if(window.getComputedStyle(waterType2).visibility == 'visible'){
			// 			waterType2p0.style.top = ((8 + 12 * len)+"%");
			// 			waterType2p1.children[0].style.top = ((12 + 12 * len)+"%");
			// 			waterType2p1.children[1].style.top = ((12 + 12 * len)+"%");
			// 			waterType2p1.children[2].style.top = ((12 + 12 * len)+"%");
			// 			len++;
			// 			nq += "2";
			// 		}
			// 	}
			// }
			// // 存储更新的顺序
			// plus.storage.setItem("q", nq);
			
		// 管理功能
		}else{
			alert("暂未开发");
		}
		
	});
	

},false);

// function : 加载新加入的饮品
// function loadAgain(){
// 	let waterType = plus.storage.getItem('waterType');
	
// 	// 已显示Box数量
// 	let showBoxcount = 0;
// 	// 类型1商品p0-1
// 	let waterType1 = document.getElementById("waterType1");
// 	let waterType1p0 = document.getElementById("waterType1p0");
// 	let waterType1p1 = document.getElementById("waterType1p1");
// 	// 类型2闪屏p0-1
// 	let waterType2 = document.getElementById("waterType2");
// 	let waterType2p0 = document.getElementById("waterType2p0");
// 	let waterType2p1 = document.getElementById("waterType2p1");
	
// 	// 累加计算出已显示的Box数量
// 	if(window.getComputedStyle(waterType1).visibility == 'visible')
// 		showBoxcount++;
// 	if(window.getComputedStyle(waterType2).visibility == 'visible')
// 		showBoxcount++;
		
// 	if(waterType == "1"){
// 		// 原先waterBox不显示就设置为显示
// 		let waterType1style = window.getComputedStyle(waterType1);
// 		if(waterType1style.visibility == 'hidden'){
// 			plus.storage.setItem("q", plus.storage.getItem("q") + "1");
// 			// alert(plus.storage.getItem("q"));
// 			waterType1.style.visibility = 'visible';
// 			waterType1p0.style.top = ((8 + 12 * showBoxcount)+"%");
// 			waterType1p1.children[0].style.top = ((12 + 12 * showBoxcount)+"%");
// 			waterType1p1.children[1].style.top = ((12 + 12 * showBoxcount)+"%");
// 			waterType1p1.children[2].style.top = ((12 + 12 * showBoxcount)+"%");
// 			showBoxcount = showBoxcount + 1;
// 		}else{
// 			let t = parseInt(document.getElementsByClassName("countBox waterType1")[0].innerHTML);
// 			document.getElementsByClassName("countBox waterType1")[0].innerHTML = t + 1;
// 		}
	    
// 	}else if(waterType == "2"){
// 		let waterType2style = window.getComputedStyle(waterType2);
// 		if(waterType2style.visibility == 'hidden'){
// 			plus.storage.setItem("q", plus.storage.getItem("q") + "2");
// 			// alert(plus.storage.getItem("q"));
// 			waterType2.style.visibility = 'visible';
// 			waterType2p0.style.top = ((8 + 12 * showBoxcount)+"%");
// 			waterType2p1.children[0].style.top = ((12 + 12 * showBoxcount)+"%");
// 			waterType2p1.children[1].style.top = ((12 + 12 * showBoxcount)+"%");
// 			waterType2p1.children[2].style.top = ((12 + 12 * showBoxcount)+"%");
// 			showBoxcount = showBoxcount + 1;
// 			// alert(showBoxcount);
// 		}else{
// 			let t = parseInt(document.getElementsByClassName("countBox waterType2")[0].innerHTML);
// 			document.getElementsByClassName("countBox waterType2")[0].innerHTML = t + 1;
// 		}
		
// 	}
// }