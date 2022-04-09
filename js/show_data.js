document.addEventListener('plusready', function(e) {
	
	
	
	
	
	
	
	let url = 'http://192.168.1.101:8080'
	// alert("测试")

	
	let testBtn = document.getElementById('testBtn')
	testBtn.addEventListener('tap', function(e) {
		let api = '/showCharts'
		mui.ajax(url + api, {
			data: {
				'location': 'ld-12'
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				console.log(data)
				// let testShowData = document.getElementById('testShowData')
				// for (let i = 0; i < data.length; i++) {
				// 	testShowData.innerHTML += data[i].floor
				// 	testShowData.innerHTML += ' '
				// 	testShowData.innerHTML += data[i].commodityName

				// }
				
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('main'));
				
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
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
							name: '5L小桶水',
							type: 'bar',
							emphasis: {
								focus: 'series'
							},
							data: [4, 3, 1, 3, 3, 2, 5]
						},
						{
							name: '10L大桶水',
							type: 'bar',
							data: [6, 2, 7, 1, 5, 3, 4],
							emphasis: {
								focus: 'series'
							},
						},
					]
				};
				
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},
			error: function(xhr, type, errorThrown) {
				console.log('fail')
			}
		});



	}, false)




	




}, false)



