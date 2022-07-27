// 大屏头部左边和右边疫情数字信息
function world_static_list() {

    //发送ajax请求
    $.ajax({
        url: "/get_world_static_list_data", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值


        },
        error: function (xhr, type, errorThrown) { //如果请求失败则这些error对应的function
            alert('world_static_list ajax error')
        },
        async: true
    })
}
//echart_1词云图
function echarts_word_cloud(){
   var chart = echarts.init(document.getElementById('chart_1'));

        option = {
            title: {
//                text: '词云',//标题
                x: 'center',
                textStyle: {
                    fontSize: 23
                }

            },
            backgroundColor: 'rgba(255, 255, 255, 0)',
            tooltip: {
                show: true
            },
            series: [{
                name: '热点分析',//数据提示窗标题
                type: 'wordCloud',
                sizeRange: [6, 66],//画布范围，如果设置太大会出现少词（溢出屏幕）
                rotationRange: [-45, 90],//数据翻转范围
                //shape: 'circle',
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 6
                },
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                Math.round(200 + Math.random() * 256),
                                Math.round(200 +Math.random() * 256),
                                Math.round(200 +Math.random() * 256)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
				data:data
                // data: [{
                //     name: "数据一",
                //     value: 1000
                // }, {
                //     name: "数据二",
                //     value: 520
                // }]//name和value建议用小写，大写有时会出现兼容问题
            }]
        };
        chart.setOption(option);
                        window.addEventListener("resize", function() {
                            chart.resize();
                        });
}
//echart_1中国城市疫情排行
function echarts_china_rank() {
//	var app = {};
//	var chartDom = document.getElementById('chart_1');
//	var myChart = echarts.init(chartDom);
//	var option;
//	var china_rank_data;
//	$.ajax({
//		url: "/get_china_rank_data",
//		success: function(data) {
//			china_rank_data = data;
//			var posList = [
//				'left', 'right', 'top', 'bottom',
//				'inside',
//				'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
//				'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
//			];
//			app.configParameters = {
//				rotate: {
//					min: -90,
//					max: 90
//				},
//				align: {
//					options: {
//						left: 'left',
//						center: 'center',
//						right: 'right'
//					}
//				},
//				verticalAlign: {
//					options: {
//						top: 'top',
//						middle: 'middle',
//						bottom: 'bottom'
//					}
//				},
//				position: {
//					options: posList.reduce(function(map, pos) {
//						map[pos] = pos;
//						return map;
//					}, {})
//				},
//				distance: {
//					min: 0,
//					max: 100
//				}
//			};
//			app.config = {
//				rotate: 90,
//				align: 'left',
//				verticalAlign: 'middle',
//				position: 'insideBottom',
//				distance: 15,
//				onChange: function() {
//					var labelOption = {
//						normal: {
//							rotate: app.config.rotate,
//							align: app.config.align,
//							verticalAlign: app.config.verticalAlign,
//							position: app.config.position,
//							distance: app.config.distance
//						}
//					};
//					myChart.setOption({
//						series: [{
//							label: labelOption
//						}, {
//							label: labelOption
//						}, {
//							label: labelOption
//						}, {
//							label: labelOption
//						}]
//					});
//				}
//			};
//			var labelOption = {
//				show: false,
//				position: app.config.position,
//				distance: app.config.distance,
//				align: app.config.align,
//				verticalAlign: app.config.verticalAlign,
//				rotate: app.config.rotate,
//				formatter: '{c}  {name|{a}}',
//				fontSize: 8,
//				rich: {
//					name: {}
//				}
//			};
//			option = {
//				tooltip: {
//					trigger: 'axis',
//					axisPointer: {
//						type: 'shadow'
//					}
//				},
//				color:['#ff5722', '#ff9800', '#9e9e9e', '#4caf50'],
//				legend: {
//					textStyle: {
//						color: '#ffffff'
//					},
//					data: ['新增确诊', '总确诊', '死亡', '治愈']
//				},
//				textStyle: {
//					color: '#eeeeee'
//				},
//				xAxis: [{
//					type: 'category',
//					axisTick: {
//						show: true
//					},
//					data: china_rank_data[0]
//				}],
//				yAxis: [{
//					type: 'value',
//					show: true,
//					axisLabel: {
//					   formatter: function (value,index) {
//						   return value/10000 + '万';
//					   }}
//				}],
//				series: [{
//						name: '新增确诊',
//						type: 'bar',
//						barGap: 0,
//						label: labelOption,
//						emphasis: {
//							focus: 'series'
//						},
//						data: china_rank_data[2]
//					},
//					{
//						name: '总确诊',
//						type: 'bar',
//						label: labelOption,
//						emphasis: {
//							focus: 'series'
//						},
//						data: china_rank_data[1]
//					},
//					{
//						name: '死亡',
//						type: 'bar',
//						label: labelOption,
//						emphasis: {
//							focus: 'series'
//						},
//						data: china_rank_data[3]
//					},
//					{
//						name: '治愈',
//						type: 'bar',
//						label: labelOption,
//						emphasis: {
//							focus: 'series'
//						},
//						data: china_rank_data[4]
//					}
//				]
//			};
//			option && myChart.setOption(option);
//		},
//		error: function(xhr, type, errorThrown) {
//			alert('get_china_rank_data ajax error')
//		},
//		async: true
//	});
var chartDom = document.getElementById('chart_1');
var myChart = echarts.init(chartDom);
var option;

option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};

option && myChart.setOption(option);


}

//echart_2中国疫情地图
function echarts_china_map() {
    console.log('echarts_china_map')
    //发送ajax请求
    $.ajax({
        url: "/get_china_actors", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值
            console.log(data)

            rows = new Array()
            lst = "河北、河南、湖南、湖北、浙江、江西、陕西、山东、山西、黑龙江、青海、辽宁、云南、海南、贵州、吉林、台湾、福建、甘肃、安徽、北京、江苏、上海、重庆、四川、广东、广西、宁夏、西藏、新疆、内蒙古、香港、澳门、天津、台湾".split('、')
            console.log(lst[1])
            for (let i in lst) {
                row = new Object()
                row.name = lst[i]
                row.value = data[lst[i]] == 0 ? 0 : data[lst[i]]
                rows.push(row)
            }
            console.log(rows)

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart_map'));

            var ec_center_option = {
                title: {
                    text: '',
                    subtext: '',
                    x: 'left'
                },
                tooltip: {
                    trigger: 'item'
                },
                //左侧小导航图标
                visualMap: {
                    show: true,
                    x: 'left',
                    y: 'bottom',
                    textStyle: {
                        fontSize: 8,
                        color: "rgba(255, 255, 255, 1.0)",
                    },
                    legend: {
                        bottom: "0%",
                        itemGap: 0,
                        itemHeight: 0
                    },
                    splitList: [{
                        start: 1,
                        end: 9,
                    },
                        {
                            start: 10,
                            end: 99
                        },
                        {
                            start: 100,
                            end: 999
                        },
                        {
                            start: 1000,
                            end: 9999
                        },
                        {
                            start: 10000
                        }
                    ],
                    color: ['#8A3310', '#C64918', '#E55B25', '#F2AD92', '#F9DCD1']
                },

                //配置属性
                series: [{
                    name: '总演员数',
                    type: 'map',
                    mapType: 'china',
                    roam: true,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                color: '#fff'
                            },
                            borderWidth: .5,
                            borderColor: '#009fe8',
                            areaColor: '#ffefd5'
                        },
                        emphasis: {
                            borderWidth: .5,
                            borderColor: '#4b0082',
                            areaColor: '#fff'
                        }
                    },
                    label: {
                        normal: {
                            show: true, //省份名称
                            fontSize: 8
                        },
                        emphasis: {
                            show: true,
                            fontSize: 8
                        }
                    },
                    data: rows

                    // data: [{
                    //         name: "上海",
                    //         value: 1000
                    //     },
                    //     {
                    //         name: "湖北",
                    //         value: 100000
                    //     },
                    //     {
                    //         name: "福建",
                    //         value: 888
                    //     }

                    // ] //数据
                }]
            };

            //使用制定的配置项和数据显示图表
            myChart.setOption(ec_center_option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });

        },
        error: function (xhr, type, errorThrown) { //如果请求失败则这些error对应的function
            alert('get_china_actors ajax error')
        },
        async: true
    })

}

//echart_map世界疫情地图
function echarts_world_map() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart_map'));
	var mydata;
		$.ajax({
			url: "/get_world_map_data",
			success: function(data) {
				mydata = data;
				option = {
					title: {
						left: 'center',
						top: 'top'
					},
					tooltip: {
						trigger: 'item',
						formatter: function(params) {
							var value = (params.value + '').split('.');
							value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
							return params.seriesName + '<br/>' + params.name + ' : ' + value;
						}
					},
					visualMap: {
						min: 0,
						max: 1000000,
						textStyle: {　　　　
							color: '#fff'　　
						},
						text: ['High', 'Low'],
						realtime: false,
						calculable: true,
						color: ['orangered', 'yellow', 'lightskyblue']
					},

					series: [{
						name: 'World Coc-2021 (confirm)',
						type: 'map',
						mapType: 'world',
						roam: true,
						itemStyle: {
							normal: { //静态的时候显示的默认样式
								　　
								show: true, //默认是否显示
								　　textStyle: {　　　　
									color: 'red'　　
								}
							},
							emphasis: {
								label: {
									show: true,
									textStyle: {
										color: '#fff'
									}
								}
							}
						},
						data: mydata  // [{name: 'Zimbabwe',value: 13076.978}, ...]
					}]
				};

				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				window.addEventListener("resize", function() {
					myChart.resize();
				});
			},
			error: function(xhr, type, errorThrown) {
				alert('echarts_world_map ajax error')
			},
			async: true
		});
}

//新增确诊国家排行
function echarts_world_rank() {
	var chartDom = document.getElementById('chart_4');
	var myChart = echarts.init(chartDom);
	var mydata;
	$.ajax({
		url: "/get_world_rank_data",
		success: function(data) {
			mydata = data;
			var option;
			option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: { // Use axis to trigger tooltip
						type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
					}
				},
				color:['#ff9800', '#ee633a', '#fc0101', '#9e9e9e'],
				legend: {
					textStyle: {
						color: '#eeeeee'
					},
					top: '9%',
					data: ['新增确诊', '总确诊', '新增死亡', '总死亡']
				},
				textStyle: {
					color: '#eeeeee'
				},
				grid: {
					left: '3%',
					right: '7%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'value'
				},
				yAxis: {
					type: 'category',
					data: mydata[0]
				},
				series: [{
						name: '新增确诊',
						type: 'bar',
						stack: 'total',
						label: {
							show: false
						},
						emphasis: {
							focus: 'series'
						},
						barWidth: '40%',
						data: mydata[1]
					},
					{
						name: '总确诊',
						type: 'bar',
						stack: 'total',
						label: {
							show: false
						},
						emphasis: {
							focus: 'series'
						},
						data: mydata[2]
					},
					{
						name: '新增死亡',
						type: 'bar',
						stack: 'total',
						label: {
							show: false
						},
						emphasis: {
							focus: 'series'
						},
						data: mydata[3]
					},
					{
						name: '总死亡',
						type: 'bar',
						stack: 'total',
						label: {
							show: false
						},
						emphasis: {
							focus: 'series'
						},
						data: mydata[4]
					}
				]
			};

			option && myChart.setOption(option);
		},
		error: function(xhr, type, errorThrown) {
			alert('echarts_world_rank ajax error')
		},
		async: true
	});
}

//世界每日新增确诊数
function echarts_world_daily_confirm() {
	var chartDom = document.getElementById('chart_5');
	var myChart = echarts.init(chartDom);
	var option;
	var mydata;
	$.ajax({
		url: "/get_world_daily_confirm_data",
		success: function(data) {
			mydata = data;
			option = {
				tooltip: {
					trigger: 'axis',
					position: function(pt) {
						return [pt[0], '10%'];
					}
				},
				textStyle: {
					color: '#eeeeee'
				},
				xAxis: {
					type: 'category',
					boundaryGap: [0, '100%'],
					data: mydata[0]  //日期[年/月/日,...]
				},
				yAxis: {
					type: 'value',
					boundaryGap: [0, '100%'],
					axisLabel: {
					   formatter: function (value,index) {
						   return value/10000;
					   }}
				},
				dataZoom: [{
					type: 'inside',
					start: 0,
					end: 10
				}, {
					start: 0,
					end: 10
				}, {
					textStyle: {
						color: '#eeeeee'
					},
				}],
				series: [{
					name: '全球新增确诊数',
					type: 'line',
					symbol: 'none',
					sampling: 'lttb',
					itemStyle: {
						color: 'rgb(255, 70, 131)'
					},
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(255, 158, 68)'
						}, {
							offset: 1,
							color: 'rgb(255, 70, 131)'
						}])
					},
					data: mydata[1] //每日确诊数[11,22,...]
				}]
			};
			option && myChart.setOption(option);
		},
		error: function(xhr, type, errorThrown) {
			alert('get_world_daily_confirm_data ajax error')
		},
		async: true
	});



}
//世界和中国的疫苗接种数及接种率
function echarts_world_china_vaccinations() {
	var chartDom = document.getElementById('chart_6');
	var myChart = echarts.init(chartDom);
	var option;
	var colors = ['#5470c6', '#14df36', '#5470C6', '#14df36'];
	$.ajax({
		url: "/get_world_china_vaccinations",
		success: function(data) {
			var mydata = data;
			option = {
				color: colors,
				textStyle: {
					color: '#eeeeee'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				grid: {
					right: '10%',
					borderColor: '#ccc'
				},
				legend: {
					textStyle: {
						color: '#eeeeee' // 图例文字颜色
					},
					data: ['世界', '中国', '世界接种率', '中国接种率']
				},
				xAxis: [{
					type: 'category',
					color: '#eeeeee',
					axisTick: {
						alignWithLabel: true
					},
					data: mydata.data[0] //日期
				}],
				yAxis: [{
						type: 'value',
						name: '接种数',
						min: 0,
						max: (mydata.max) * 1.25,
						position: 'right',
						splitLine:{
							show:false
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: colors[0]
							}
						},
						axisLabel: {
							formatter: ''
						}
					},
					{
						type: 'value',
						name: '',
						min: 0,
						max: (mydata.max) * 1.25,
						position: 'right',
						splitLine:{
							show:false
						},
						offset: 0,
						axisLine: {
							show: true,
							lineStyle: {
								color: colors[1]
							}
						},
						axisLabel: {
							formatter: function (value,index) {
								       return Math.ceil(value/100000000) + '亿';
							}
						}
					},
					{
						type: 'value',
						name: '接种率',
						min: 0,
						max: (mydata.maxPer) * 1.25,
						position: 'left',
						splitLine:{
							show:false
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: colors[2]
							}
						},
						axisLabel: {
							formatter: ''
						}
					},
					{
						type: 'value',
						name: '',
						min: 0,
						max: 200,
						position: 'left',
						splitLine:{
							show:false
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: colors[3]
							}
						},
						axisLabel: {
							formatter: '{value} %'
						}
					}
				],
				series: [{
						name: '世界',
						type: 'bar',
						data: mydata.data[1]  //世界接种数
					},
					{
						name: '中国',
						type: 'bar',
						yAxisIndex: 1,
						data: mydata.data[2]  //中国接种数
					},
					{
						name: '世界接种率',
						type: 'line',
						yAxisIndex: 2,
						data: mydata.data[3]  //世界接种率
					},
					{
						name: '中国接种率',
						type: 'line',
						yAxisIndex: 3,
						data: mydata.data[4]  //中国接种率
					}
				]
			};

			option && myChart.setOption(option);
		},
		error: function(xhr, type, errorThrown) {
			alert('get_world_china_vaccinations_data ajax error')
		},
		async: true
	});
}
//世界每日新增死亡数
function echarts_world_daily_dead() {
	var chartDom = document.getElementById('chart_7');
	var myChart = echarts.init(chartDom);
	var option;

	$.ajax({
		url: "/get_world_daily_dead_data",
		success: function(data) {
			mydata = data;
			option = {
				tooltip: {
					trigger: 'axis',
//					position: function(pt) {
//						return [pt[0], '10%'];
//					}
				},
				textStyle: {
					color: '#eeeeee'
				},
				xAxis: {
					type: 'category',
					boundaryGap: [0, '100%'],
					data: mydata[0]
				},
				yAxis: {
					type: 'value',
					boundaryGap: [0, '100%'],
					axisLabel: {
					   formatter: function (value,index) {
						   return value/10000 + '万';
					   }}
				},
				dataZoom: [{
					type: 'inside',
					start: 0,
					end: 10
				}, {
					start: 0,
					end: 10
				}, {
					textStyle: {
						color: '#eeeeee'
					},
				}],
				series: [{
					name: '全球新增死亡数',
					type: 'line',
					symbol: 'none',
					sampling: 'lttb',
					itemStyle: {
						color: '#ffffff'
					},
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#eeeeee'
						}, {
							offset: 1,
							color: '#eeeeee'
						}])
					},
					data: mydata[1]
				}]
			};

			option && myChart.setOption(option);
		},
		error: function(xhr, type, errorThrown) {
			alert('get_china_rank_data ajax error')
		},
		async: true
	});


}

//各大洲数据饼图分析
function echarts_continent_pie() {
	var mychart = echarts.init(document.getElementById("chart_3"));
	var mydata;
	$.ajax({
		url: "/get_continent_pie_data",
		success: function(data) {
			mydata = data;
			option = {
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				legend: {
					left: 'center',
					data: ['亚洲', '南美洲', '北美洲', '非洲', '欧洲', '大洋洲', '其他'],
					textStyle: {
						color: "rgba(255, 255, 255, 1.0)"
					}
				},
				series: [{
					name: '各大洲分析',
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 20,
						borderColor: '#fff',
						borderWidth: 1
					},
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '20',
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: mydata
				}]
			};
			mychart.setOption(option);
		},
		error: function(xhr, type, errorThrown) {
			alert('echarts_continent_pie ajax error')
		},
		async: true
	});
}

function echarts_echarts_test(){

$.ajax({
		url: "/get_test_data",  //请求的资源路径
		success: function (data) {  //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值
        var chartDom = document.getElementById('chart_2');
var myChart = echarts.init(chartDom);
var option;
var data = data.bbb;
option = {
title: {
//        text: '流行的电影类型',
        subtext: '数量'
    },
  legend: {
    // data: ['苹果', '梨'], //图例的数据数组
    // selectedMode: 'single' //展示单项
  },
  xAxis: {
    type: 'category',
    data: [
      '2010年',
      '2011年',
      '2012年',
      '2013年',
      '2014年',
      '2015年',
      '2016年',
      '2017年',
      '2018年',
      '2019年'
    ]
  },
  yAxis: {
    type: 'value'
  },
  series:
    data
};

option && myChart.setOption(option);

		},error: function(xhr, type, errorThrown) {   //如果请求失败则这些error对应的function
			alert('world_static_list ajax error')
		},
		async: true
	})
}


function echarts_echarts_test1(){

$.ajax({
		url: "/get_test1_data",  //请求的资源路径
		success: function (data) {  //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值


var chartDom = document.getElementById('chart_1');
var myChart = echarts.init(chartDom);
var option;
var key = data.key;
var values = data.values;

option = {
title: {
        text: '导演均分排名',
        subtext: '均分'
    },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: key,
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'score:',
      type: 'bar',
      barWidth: '60%',
      data: values
    }
  ]
};

option && myChart.setOption(option);

		},error: function(xhr, type, errorThrown) {   //如果请求失败则这些error对应的function
			alert('world_static_list ajax error')
		},
		async: true
	})


}


function echarts_echarts_test2(){
$.ajax({
		url: "/get_test2_data",  //请求的资源路径
		success: function (data) {  //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值


var chartDom = document.getElementById('chart_3');
var myChart = echarts.init(chartDom);
var option;
var key = data.key;
var values = data.values;

option = {
    title: {
        text: '演员均分排名',
        subtext: '均分'
    },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: key,
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'score:',
      type: 'bar',
      barWidth: '60%',
      data: values
    }
  ]
};

option && myChart.setOption(option);


		},error: function(xhr, type, errorThrown) {   //如果请求失败则这些error对应的function
			alert('world_static_list ajax error')
		},
		async: true
	})


}


function echarts_echarts_test3(){

$.ajax({
		url: "/get_test3_data",  //请求的资源路径
		success: function (data) {  //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值

var chartDom = document.getElementById('chart_map');
var myChart = echarts.init(chartDom);
var option;
var key = data.key;
var values = data.values;


option = {
  title: {
    text: '电影评分和时长的关系',
    subtext: '均分'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    name: '时长',
    type: 'category',
    boundaryGap: false,
    // prettier-ignore
    data: key
//    ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
  },
  yAxis: {
    type: 'value',
    axisLabel: {},
    axisPointer: {
      snap: true
    }
  },
  visualMap: {
    show: false,
    dimension: 0
  },
  series: [
    {
      name: 'score',
      type: 'line',
      smooth: true,
      // prettier-ignore
      data: values
//      [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
    }
  ]
};

option && myChart.setOption(option);


		},error: function(xhr, type, errorThrown) {   //如果请求失败则这些error对应的function
			alert('world_static_list ajax error')
		},
		async: true
	})


}

function echarts_echarts_test4(){

$.ajax({
		url: "/get_test4_data",  //请求的资源路径
		success: function (data) {  //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值


var chartDom = document.getElementById('chart_4');
var myChart = echarts.init(chartDom);
var option;
var key = data.key;
var values = data.values;


option = {
  title: {
    text: '每个时间段的评论人数',
    subtext: '数量'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    name: '时间',
    type: 'category',
    boundaryGap: false,
    // prettier-ignore
    data: key
//    ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
  },
  yAxis: {
    type: 'value',
    axisLabel: {},
    axisPointer: {
      snap: true
    }
  },
  visualMap: {
    show: false,
    dimension: 0
  },
  series: [
    {
      name: 'count',
      type: 'line',
      smooth: true,
      // prettier-ignore
      data: values
//      [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
    }
  ]
};

option && myChart.setOption(option);


		},error: function(xhr, type, errorThrown) {   //如果请求失败则这些error对应的function
			alert('world_static_list ajax error')
		},
		async: true
	})


}


function echarts_echarts_test5(){
$.ajax({
		url: "/get_test5_data",  //请求的资源路径
		success: function (data) {  //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值



var chartDom = document.getElementById('chart_5');
var myChart = echarts.init(chartDom);
var option;

var dict_language_movie = data.aaa;
var rows=new Array();

for (var key in dict_language_movie) {
   row = new Object()
　　row.name=key
   row.value=dict_language_movie[key]
   rows.push(row)
}


option = {
  title: {
    text: '电影语言占比',
    subtext: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data:rows,
//        [
////        { value: 1048, name: 'Search Engine' },
////        { value: 735, name: 'Direct' },
////        { value: 580, name: 'Email' },
////        { value: 484, name: 'Union Ads' },
////        { value: 300, name: 'Video Ads' }
//        rows
//      ],

      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

option && myChart.setOption(option);

		},error: function(xhr, type, errorThrown) {   //如果请求失败则这些error对应的function
			alert('world_static_list ajax error')
		},
		async: true
	})


}


function echarts_echarts_test6(){

$.ajax({
		url: "/get_test6_data",  //请求的资源路径
		success: function (data) {  //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值



var chartDom = document.getElementById('chart_6');
var myChart = echarts.init(chartDom);
var option;
var key = data.key;
var values = data.values;

option = {
title: {
        text: '近十年上映的电影数量',
        subtext: '数量'
    },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [
      '2010年',
      '2011年',
      '2012年',
      '2013年',
      '2014年',
      '2015年',
      '2016年',
      '2017年',
      '2018年',
      '2019年'
    ],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '数量',
      type: 'bar',
      barWidth: '60%',
      data: values
    }
  ]
};

option && myChart.setOption(option);

		},error: function(xhr, type, errorThrown) {   //如果请求失败则这些error对应的function
			alert('world_static_list ajax error')
		},
		async: true
	})


}



function echarts_predict_score_line() {
    //发送ajax请求
    $.ajax({
        url: "/get_predict_score", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值

            console.log(data)
            var chartDom = document.getElementById('chart_6');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: data.pred,
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        color: '#ea7ccc',
                        width: 3,
                        type: 'dashed'
                    },
                    itemStyle: {
                        borderWidth: 3,
                        borderColor: '#bf444c',
                        color: 'yellow'
                    }
                },
                    {
                        data: data.real,
                        type: 'line',
                        symbol: 'roundRect',
                        symbolSize: 10,
                        lineStyle: {
                            color: '#73c0de',
                            width: 3,
                            type: 'dashed'
                        },
                        itemStyle: {
                            borderWidth: 3,
                            borderColor: '#d88273',
                            color: 'yellow'
                        }
                    }
                ]
            };

            option && myChart.setOption(option);


        },
        error: function (xhr, type, errorThrown) { //如果请求失败则这些error对应的function
            alert('get_predict_score ajax error')
        },
        async: true
    })

}

function wordcloud_img() {
    //发送ajax请求

    $.ajax({
        url: "/get_word_cloud", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值
            var chartDom = document.getElementById('chart_1');
            console.log(data)
            var img = document.createElement('img')
            img.src = data.path
            img.setAttribute("height", "100%")
            console.log(img.src)

            chartDom.append(img)


        },
        error: function (xhr, type, errorThrown) { //如果请求失败则这些error对应的function
            alert('get_word_cloud ajax error')
        },
        async: true
    })
}




function flashAll() {
//    echarts_word_cloud()
    echarts_echarts_test()
    echarts_echarts_test1()
    echarts_echarts_test2()
    echarts_echarts_test3()
    echarts_echarts_test4()
    echarts_echarts_test5()
    echarts_echarts_test6()


//    echarts_predict_score_line()
//    wordcloud_img()
//    // china_map()
//    echarts_china_map()


    // echarts_world_rank()
    // echarts_word_cloud()
    // 调用上述所有函数
	// world_static_list();
	// echarts_china_rank();
	// echarts_china_map();
	// echarts_world_rank();
	// echarts_world_map();
	// echarts_continent_pie();
	// echarts_world_china_vaccinations();
	// echarts_world_daily_confirm();
	// echarts_world_daily_dead();
}

// 执行
$(function() {
	setInterval(flashAll, 1000 * 60 * 30)  //每隔30分钟调用flashAll函数，刷新页面数据
	flashAll()  // 调用flashAll函数
});