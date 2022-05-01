document.addEventListener('plusready', function(e) {


	autoChange() //初始化实例后，首次设置数据
	autoChange2()
	setInterval( //设置定时器，1s更新一次
		function() {
			autoChange()
		}, 2000
	);

	setInterval(
		function(){
			autoChange2()
		},2000
	);





	// alert("测试")


	let testBtn = document.getElementById('testBtn')
	testBtn.addEventListener('tap', function(e) {




	}, false)




	



}, false)





// 选择location后触发
function selectLocation() {
	autoChange()
}



let myChart

function autoChange() {
	let url = 'http://192.168.1.101:8080'

	let sl = document.getElementById("sl")
	let location = sl.options[sl.selectedIndex].value

	let api = '/showCharts'
	mui.ajax(url + api, {
		data: {
			'location': location
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(commodityCount) {
			console.log(commodityCount)
			// let testShowData = document.getElementById('testShowData')
			// for (let i = 0; i < data.length; i++) {
			// 	testShowData.innerHTML += data[i].floor
			// 	testShowData.innerHTML += ' '
			// 	testShowData.innerHTML += data[i].commodityName

			// }

			// 基于准备好的dom，初始化echarts实例

			if (myChart == null) {
				myChart = echarts.init(document.getElementById('main'))
			}
			// 指定图表的配置项和数据
			var option = {
				title: {
					text: '各楼层余量信息',
					x: 'center',
					y: 'top',
					textStyle: {
						fontFamily: 'Arial',
						fontSize: 15,
						fontStyle: 'normal',
						fontWeight: 'normal',
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				legend: {
					top: '8%',
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '0%',
					top: '20%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: ['一楼', '二楼', '三楼', '四楼', '五楼', '六楼']
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
						name: '10L大桶水',
						type: 'bar',
						data: commodityCount[0],
						emphasis: {
							focus: 'series'
						},
					},
					{
						name: '5L小桶水',
						type: 'bar',
						emphasis: {
							focus: 'series'
						},
						data: commodityCount[1]
					},
					// {
					// 	name: 'xxxxx',
					// 	type: 'bar',
					// 	emphasis: {
					// 		focus: 'series'
					// 	},
					// 	data: commodityCount[1]
					// },
				]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		},
		error: function(xhr, type, errorThrown) {
			console.log('fail')
		}
	});
}


function autoChange2() {
	let url = 'http://192.168.1.101:8080'

	let api = '/showBlocks'
	mui.ajax(url + api, {
		data: {
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(commodityCount) {
			console.log(commodityCount)
			let blocks = document.getElementsByClassName('boxStyle')
			for(let i = 0; i < blocks.length; i++){
				blocks[i].children[0].innerHTML = 'ld-' + (i + 1).toString() + ' '+ commodityCount[i].toString() + '/96'
				 if(commodityCount[i] > 57){
					 blocks[i].style.backgroundColor = "#aaff7f"
				 }else if(commodityCount[i] > 19){
					 blocks[i].style.backgroundColor = "#ffff7f"
				 }else{
					 blocks[i].style.backgroundColor = "#ff557f"
				 }
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log('fail')
		}
	});
}