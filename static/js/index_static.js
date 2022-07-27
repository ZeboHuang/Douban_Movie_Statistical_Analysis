// 测试函数
function echarts_test(){

    

    option = {
        title: {
            text: ''
        },
        textStyle:{
            color: '#ffffff'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            textStyle:{
                color: '#ffffff'
            },
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    option && myChart.setOption(option);

}
// 全球疫情数据展板
function world_static_list() {

    $("#deadAdd").text(15801);
    $("#dead").text(15802);
    $("#totalConfirm").text(15803);
    $("#heal").text(15804);
    $("#healAdd").text(15805);
    $("#totalVaccinations").text(15806);
}
//echart_1中国城市疫情排行
function echarts_china_rank() {
	var app = {};
	var chartDom = document.getElementById('chart_1');
	var myChart = echarts.init(chartDom);

	var option;

	var posList = [
		'left', 'right', 'top', 'bottom',
		'inside',
		'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
		'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
	];
	app.configParameters = {
		rotate: {
			min: -90,
			max: 90
		},
		align: {
			options: {
				left: 'left',
				center: 'center',
				right: 'right'
			}
		},
		verticalAlign: {
			options: {
				top: 'top',
				middle: 'middle',
				bottom: 'bottom'
			}
		},
		position: {
			options: posList.reduce(function(map, pos) {
				map[pos] = pos;
				return map;
			}, {})
		},
		distance: {
			min: 0,
			max: 100
		}
	};

	app.config = {
		rotate: 90,
		align: 'left',
		verticalAlign: 'middle',
		position: 'insideBottom',
		distance: 15,
		onChange: function() {
			var labelOption = {
				normal: {
					rotate: app.config.rotate,
					align: app.config.align,
					verticalAlign: app.config.verticalAlign,
					position: app.config.position,
					distance: app.config.distance
				}
			};
			myChart.setOption({
				series: [{
					label: labelOption
				}, {
					label: labelOption
				}, {
					label: labelOption
				}, {
					label: labelOption
				}]
			});
		}
	};

	var labelOption = {
		show: false,
		position: app.config.position,
		distance: app.config.distance,
		align: app.config.align,
		verticalAlign: app.config.verticalAlign,
		rotate: app.config.rotate,
		formatter: '{c}  {name|{a}}',
		fontSize: 8,
		rich: {
			name: {}
		}
	};

	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			textStyle: {
				color: '#ffffff'
			},
			data: ['Forest', 'Steppe', 'Desert', 'Wetland']
		},
		textStyle: {
			color: '#eeeeee'
		},
		toolbox: {
			show: true,
			orient: 'vertical',
			left: 'right',
			top: 'center',
			feature: {
				mark: {
					show: true
				},
				//	            dataView: {show: true, readOnly: false},
				magicType: {
					show: true,
					type: ['line', 'bar', 'stack', 'tiled']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		xAxis: [{
			type: 'category',
			axisTick: {
				show: true
			},
			data: ['2012', '2013', '2014', '2015', '2016']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
				name: '总确诊',
				type: 'bar',
				barGap: 0,
				label: labelOption,
				emphasis: {
					focus: 'series'
				},
				data: [320, 332, 301, 334, 390]
			},
			{
				name: '新增确诊',
				type: 'bar',
				label: labelOption,
				emphasis: {
					focus: 'series'
				},
				data: [220, 182, 191, 234, 290]
			},
			{
				name: '死亡',
				type: 'bar',
				label: labelOption,
				emphasis: {
					focus: 'series'
				},
				data: [150, 232, 201, 154, 190]
			},
			{
				name: '治愈',
				type: 'bar',
				label: labelOption,
				emphasis: {
					focus: 'series'
				},
				data: [98, 77, 101, 99, 40]
			}
		]
	};

	option && myChart.setOption(option);

}
//echart_2中国疫情地图
function echarts_china_map() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart_2'));
	var mydata;

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
					start: 1000
				}
			],
			color: ['#8A3310', '#C64918', '#E55B25', '#F2AD92', '#F9DCD1']
		},

		//配置属性
		series: [{
			name: '累积确诊人数',
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
					show: true,
					fontSize: 8
				},
				emphasis: {
					show: true,
					fontSize: 8
				}
			},
			data: [{
					name: "上海",
					value: 1000
				},
				{
					name: "北京",
					value: 100
				},
				{
					name: "天津",
					value: 1000
				},
				{
					name: "重庆",
					value: 1000
				},
				{
					name: "河北",
					value: 10
				},
				{
					name: "河南",
					value: 10
				},
				{
					name: "云南",
					value: 100
				},
				{
					name: "辽宁",
					value: 1000
				},
				{
					name: "黑龙江",
					value: 100
				},
				{
					name: "湖南",
					value: 100
				},
				{
					name: "安徽",
					value: 100
				},
				{
					name: "山东",
					value: 100
				},
				{
					name: "新疆",
					value: 100
				},
				{
					name: "江苏",
					value: 100
				},
				{
					name: "浙江",
					value: 100
				},
				{
					name: "江西",
					value: 100
				},
				{
					name: "湖北",
					value: 100
				},
				{
					name: "广西",
					value: 100
				},
				{
					name: "甘肃",
					value: 100
				},
				{
					name: "山西",
					value: 100
				},
				{
					name: "内蒙古",
					value: 1000
				},
				{
					name: "陕西",
					value: 100
				},
				{
					name: "吉林",
					value: 100
				},
				{
					name: "福建",
					value: 100
				},
				{
					name: "贵州",
					value: 100
				},
				{
					name: "广东",
					value: 100
				},
				{
					name: "青海",
					value: 100
				},
				{
					name: "西藏",
					value: 100
				},
				{
					name: "四川",
					value: 100
				},
				{
					name: "宁夏",
					value: 100
				},
				{
					name: "海南",
					value: 100
				},
				{
					name: "台湾",
					value: 100
				},
				{
					name: "香港",
					value: 100
				},
				{
					name: "澳门",
					value: 100
				}
			] //数据
		}]
	};

	//使用制定的配置项和数据显示图表
	myChart.setOption(ec_center_option);
	window.addEventListener("resize", function() {
		myChart.resize();
	});

}
//echart_map世界疫情地图
function echarts_world_map() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart_map'));
	var mydata;
	//	$.ajax({
	//		url: "/get_worldmap",
	//		success: function(data) {
	//			mydata = data;
	//		},
	//		error: function(xhr, type, errorThrown) {
	//			alert('echart_2 ajax error')
	//		},
	//		async: false // 同步请求
	//	});

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
			name: 'World Covid19 Confirm',
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
			data: [{
					name: 'Afghanistan',
					value: 28397.812
				},
				{
					name: 'Angola',
					value: 19549.124
				},
				{
					name: 'Albania',
					value: 3150.143
				},
				{
					name: 'United Arab Emirates',
					value: 8441.537
				},
				{
					name: 'Argentina',
					value: 40374.224
				},
				{
					name: 'Armenia',
					value: 2963.496
				},
				{
					name: 'French Southern and Antarctic Lands',
					value: 268.065
				},
				{
					name: 'Australia',
					value: 22404.488
				},
				{
					name: 'Austria',
					value: 8401.924
				},
				{
					name: 'Azerbaijan',
					value: 9094.718
				},
				{
					name: 'Burundi',
					value: 9232.753
				},
				{
					name: 'Belgium',
					value: 10941.288
				},
				{
					name: 'Benin',
					value: 9509.798
				},
				{
					name: 'Burkina Faso',
					value: 15540.284
				},
				{
					name: 'Bangladesh',
					value: 151125.475
				},
				{
					name: 'Bulgaria',
					value: 7389.175
				},
				{
					name: 'The Bahamas',
					value: 66402.316
				},
				{
					name: 'Bosnia and Herzegovina',
					value: 3845.929
				},
				{
					name: 'Belarus',
					value: 9491.07
				},
				{
					name: 'Belize',
					value: 308.595
				},
				{
					name: 'Bermuda',
					value: 64.951
				},
				{
					name: 'Bolivia',
					value: 716.939
				},
				{
					name: 'Brazil',
					value: 195210.154
				},
				{
					name: 'Brunei',
					value: 27.223
				},
				{
					name: 'Bhutan',
					value: 716.939
				},
				{
					name: 'Botswana',
					value: 1969.341
				},
				{
					name: 'Central African Republic',
					value: 4349.921
				},
				{
					name: 'Canada',
					value: 34126.24
				},
				{
					name: 'Switzerland',
					value: 7830.534
				},
				{
					name: 'Chile',
					value: 17150.76
				},
				{
					name: 'China',
					value: 1359821.465
				},
				{
					name: 'Ivory Coast',
					value: 60508.978
				},
				{
					name: 'Cameroon',
					value: 20624.343
				},
				{
					name: 'Democratic Republic of the Congo',
					value: 62191.161
				},
				{
					name: 'Republic of the Congo',
					value: 3573.024
				},
				{
					name: 'Colombia',
					value: 46444.798
				},
				{
					name: 'Costa Rica',
					value: 4669.685
				},
				{
					name: 'Cuba',
					value: 11281.768
				},
				{
					name: 'Northern Cyprus',
					value: 1.468
				},
				{
					name: 'Cyprus',
					value: 1103.685
				},
				{
					name: 'Czech Republic',
					value: 10553.701
				},
				{
					name: 'Germany',
					value: 83017.404
				},
				{
					name: 'Djibouti',
					value: 834.036
				},
				{
					name: 'Denmark',
					value: 5550.959
				},
				{
					name: 'Dominican Republic',
					value: 10016.797
				},
				{
					name: 'Algeria',
					value: 37062.82
				},
				{
					name: 'Ecuador',
					value: 15001.072
				},
				{
					name: 'Egypt',
					value: 78075.705
				},
				{
					name: 'Eritrea',
					value: 5741.159
				},
				{
					name: 'Spain',
					value: 46182.038
				},
				{
					name: 'Estonia',
					value: 1298.533
				},
				{
					name: 'Ethiopia',
					value: 87095.281
				},
				{
					name: 'Finland',
					value: 5367.693
				},
				{
					name: 'Fiji',
					value: 860.559
				},
				{
					name: 'Falkland Islands',
					value: 49.581
				},
				{
					name: 'France',
					value: 63230.866
				},
				{
					name: 'Gabon',
					value: 1556.222
				},
				{
					name: 'United Kingdom',
					value: 62066.35
				},
				{
					name: 'Georgia',
					value: 4388.674
				},
				{
					name: 'Ghana',
					value: 24262.901
				},
				{
					name: 'Guinea',
					value: 10876.033
				},
				{
					name: 'Gambia',
					value: 1680.64
				},
				{
					name: 'Guinea Bissau',
					value: 10876.033
				},
				{
					name: 'Equatorial Guinea',
					value: 696.167
				},
				{
					name: 'Greece',
					value: 11109.999
				},
				{
					name: 'Greenland',
					value: 56.546
				},
				{
					name: 'Guatemala',
					value: 14341.576
				},
				{
					name: 'French Guiana',
					value: 231.169
				},
				{
					name: 'Guyana',
					value: 786.126
				},
				{
					name: 'Honduras',
					value: 7621.204
				},
				{
					name: 'Croatia',
					value: 4338.027
				},
				{
					name: 'Haiti',
					value: 9896.4
				},
				{
					name: 'Hungary',
					value: 10014.633
				},
				{
					name: 'Indonesia',
					value: 240676.485
				},
				{
					name: 'India',
					value: 1205624.648
				},
				{
					name: 'Ireland',
					value: 4467.561
				},
				{
					name: 'Iran',
					value: 240676.485
				},
				{
					name: 'Iraq',
					value: 30962.38
				},
				{
					name: 'Iceland',
					value: 318.042
				},
				{
					name: 'Israel',
					value: 7420.368
				},
				{
					name: 'Italy',
					value: 60508.978
				},
				{
					name: 'Jamaica',
					value: 2741.485
				},
				{
					name: 'Jordan',
					value: 6454.554
				},
				{
					name: 'Japan',
					value: 127352.833
				},
				{
					name: 'Kazakhstan',
					value: 15921.127
				},
				{
					name: 'Kenya',
					value: 40909.194
				},
				{
					name: 'Kyrgyzstan',
					value: 5334.223
				},
				{
					name: 'Cambodia',
					value: 14364.931
				},
				{
					name: 'South Korea',
					value: 51452.352
				},
				{
					name: 'Kosovo',
					value: 97.743
				},
				{
					name: 'Kuwait',
					value: 2991.58
				},
				{
					name: 'Laos',
					value: 6395.713
				},
				{
					name: 'Lebanon',
					value: 4341.092
				},
				{
					name: 'Liberia',
					value: 3957.99
				},
				{
					name: 'Libya',
					value: 6040.612
				},
				{
					name: 'Sri Lanka',
					value: 20758.779
				},
				{
					name: 'Lesotho',
					value: 2008.921
				},
				{
					name: 'Lithuania',
					value: 3068.457
				},
				{
					name: 'Luxembourg',
					value: 507.885
				},
				{
					name: 'Latvia',
					value: 2090.519
				},
				{
					name: 'Morocco',
					value: 31642.36
				},
				{
					name: 'Moldova',
					value: 103.619
				},
				{
					name: 'Madagascar',
					value: 21079.532
				},
				{
					name: 'Mexico',
					value: 117886.404
				},
				{
					name: 'Macedonia',
					value: 507.885
				},
				{
					name: 'Mali',
					value: 13985.961
				},
				{
					name: 'Myanmar',
					value: 51931.231
				},
				{
					name: 'Montenegro',
					value: 620.078
				},
				{
					name: 'Mongolia',
					value: 2712.738
				},
				{
					name: 'Mozambique',
					value: 23967.265
				},
				{
					name: 'Mauritania',
					value: 3609.42
				},
				{
					name: 'Malawi',
					value: 15013.694
				},
				{
					name: 'Malaysia',
					value: 28275.835
				},
				{
					name: 'Namibia',
					value: 2178.967
				},
				{
					name: 'New Caledonia',
					value: 246.379
				},
				{
					name: 'Niger',
					value: 15893.746
				},
				{
					name: 'Nigeria',
					value: 159707.78
				},
				{
					name: 'Nicaragua',
					value: 5822.209
				},
				{
					name: 'Netherlands',
					value: 16615.243
				},
				{
					name: 'Norway',
					value: 4891.251
				},
				{
					name: 'Nepal',
					value: 26846.016
				},
				{
					name: 'New Zealand',
					value: 4368.136
				},
				{
					name: 'Oman',
					value: 2802.768
				},
				{
					name: 'Pakistan',
					value: 173149.306
				},
				{
					name: 'Panama',
					value: 3678.128
				},
				{
					name: 'Peru',
					value: 29262.83
				},
				{
					name: 'Philippines',
					value: 93444.322
				},
				{
					name: 'Papua New Guinea',
					value: 6858.945
				},
				{
					name: 'Poland',
					value: 38198.754
				},
				{
					name: 'Puerto Rico',
					value: 3709.671
				},
				{
					name: 'North Korea',
					value: 1.468
				},
				{
					name: 'Portugal',
					value: 10589.792
				},
				{
					name: 'Paraguay',
					value: 6459.721
				},
				{
					name: 'Qatar',
					value: 1749.713
				},
				{
					name: 'Romania',
					value: 21861.476
				},
				{
					name: 'Russia',
					value: 21861.476
				},
				{
					name: 'Rwanda',
					value: 10836.732
				},
				{
					name: 'Western Sahara',
					value: 514.648
				},
				{
					name: 'Saudi Arabia',
					value: 27258.387
				},
				{
					name: 'Sudan',
					value: 35652.002
				},
				{
					name: 'South Sudan',
					value: 9940.929
				},
				{
					name: 'Senegal',
					value: 12950.564
				},
				{
					name: 'Solomon Islands',
					value: 526.447
				},
				{
					name: 'Sierra Leone',
					value: 5751.976
				},
				{
					name: 'El Salvador',
					value: 6218.195
				},
				{
					name: 'Somaliland',
					value: 9636.173
				},
				{
					name: 'Somalia',
					value: 9636.173
				},
				{
					name: 'Republic of Serbia',
					value: 3573.024
				},
				{
					name: 'Suriname',
					value: 524.96
				},
				{
					name: 'Slovakia',
					value: 5433.437
				},
				{
					name: 'Slovenia',
					value: 2054.232
				},
				{
					name: 'Sweden',
					value: 9382.297
				},
				{
					name: 'Swaziland',
					value: 1193.148
				},
				{
					name: 'Syria',
					value: 7830.534
				},
				{
					name: 'Chad',
					value: 11720.781
				},
				{
					name: 'Togo',
					value: 6306.014
				},
				{
					name: 'Thailand',
					value: 66402.316
				},
				{
					name: 'Tajikistan',
					value: 7627.326
				},
				{
					name: 'Turkmenistan',
					value: 5041.995
				},
				{
					name: 'East Timor',
					value: 10016.797
				},
				{
					name: 'Trinidad and Tobago',
					value: 1328.095
				},
				{
					name: 'Tunisia',
					value: 10631.83
				},
				{
					name: 'Turkey',
					value: 72137.546
				},
				{
					name: 'United Republic of Tanzania',
					value: 44973.33
				},
				{
					name: 'Uganda',
					value: 33987.213
				},
				{
					name: 'Ukraine',
					value: 46050.22
				},
				{
					name: 'Uruguay',
					value: 3371.982
				},
				{
					name: 'United States of America',
					value: 312247.116
				},
				{
					name: 'Uzbekistan',
					value: 27769.27
				},
				{
					name: 'Venezuela',
					value: 236.299
				},
				{
					name: 'Vietnam',
					value: 89047.397
				},
				{
					name: 'Vanuatu',
					value: 236.299
				},
				{
					name: 'West Bank',
					value: 13.565
				},
				{
					name: 'Yemen',
					value: 22763.008
				},
				{
					name: 'South Africa',
					value: 51452.352
				},
				{
					name: 'Zambia',
					value: 13216.985
				},
				{
					name: 'Zimbabwe',
					value: 13076.978
				}
			]

		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	window.addEventListener("resize", function() {
		myChart.resize();
	});

}
//世界新增确诊国家排行
function echarts_world_rank() {
	var chartDom = document.getElementById('chart_4');
	var myChart = echarts.init(chartDom);
	var option;

	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { // Use axis to trigger tooltip
				type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
			}
		},
		legend: {
			textStyle: {
				color: '#eeeeee'
			},
			top: '9%',
			data: ['总确诊', '新增确诊', '新增死亡', '总死亡']
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
			data: ['美国', '印度', '法国', '英国', '德国']
		},
		series: [{
				name: '总确诊',
				type: 'bar',
				stack: 'total',
				label: {
					show: true
				},
				emphasis: {
					focus: 'series'
				},
				barWidth: '40%',
				data: [120, 132, 101, 134, 90]
			},
			{
				name: '新增确诊',
				type: 'bar',
				stack: 'total',
				label: {
					show: true
				},
				emphasis: {
					focus: 'series'
				},
				data: [220, 182, 191, 234, 290]
			},
			{
				name: '新增死亡',
				type: 'bar',
				stack: 'total',
				label: {
					show: true
				},
				emphasis: {
					focus: 'series'
				},
				data: [150, 212, 201, 154, 190]
			},
			{
				name: '总死亡',
				type: 'bar',
				stack: 'total',
				label: {
					show: true
				},
				emphasis: {
					focus: 'series'
				},
				data: [820, 832, 901, 934, 1290]
			}
		]
	};

	option && myChart.setOption(option);
}
//全球每日新增确诊数
function echarts_world_daily_confirm() {
	var chartDom = document.getElementById('chart_5');
	var myChart = echarts.init(chartDom);
	var option;

	var base = +new Date(1968, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var date = [];

	var data = [Math.random() * 300];

	for(var i = 1; i < 20000; i++) {
		var now = new Date(base += oneDay);
		date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
		data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
	}

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
			data: date  //日期[年/月/日,...]
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%']
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
			data: data //每日确诊数[11,22,...]//日期[年/月/日,...]
		}]
	};

	option && myChart.setOption(option);
}
//世界和中国的疫苗接种数及接种率
function echarts_world_china_vaccinations() {
	var chartDom = document.getElementById('chart_6');
	var myChart = echarts.init(chartDom);
	var option;

	var colors = ['#5470C6', '#91CC75', '#5470C6', '#91CC75'];

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
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] //日期
		}],
		yAxis: [{
				type: 'value',
				name: '接种数',
				min: 0,
				max: 250,
				position: 'right',
				axisLine: {
					show: true,
					lineStyle: {
						color: colors[0]
					}
				},
				axisLabel: {
					formatter: '{value} 剂'
				}
			},
			{
				type: 'value',
				name: '',
				min: 0,
				max: 250,
				position: 'right',
				offset: 0,
				axisLine: {
					show: false,
					lineStyle: {
						color: colors[0]
					}
				},
				axisLabel: {
					formatter: '{value} 剂'
				}
			},
			{
				type: 'value',
				name: '接种率',
				min: 0,
				max: 100,
				position: 'left',
				axisLine: {
					show: true,
					lineStyle: {
						color: colors[2]
					}
				},
				axisLabel: {
					formatter: '{value} %'
				}
			},
			{
				type: 'value',
				name: '',
				min: 0,
				max: 100,
				position: 'left',
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
				data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]  //世界接种数
			},
			{
				name: '中国',
				type: 'bar',
				yAxisIndex: 1,
				data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]  //中国接种数
			},
			{
				name: '世界接种率',
				type: 'line',
				yAxisIndex: 2,
				data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]  //世界接种率
			},
			{
				name: '中国接种率',
				type: 'line',
				yAxisIndex: 3,
				data: [5.0, 5.2, 5.3, 7.5, 8.3, 13.2, 25.3, 33.4, 33.0, 26.5, 22.0, 9.2] //中国接种率
			}
		]
	};

	option && myChart.setOption(option);

}
//全球新增死亡数趋势图
function echarts_world_daily_dead() {
	var chartDom = document.getElementById('chart_7');
	var myChart = echarts.init(chartDom);
	var option;

	var base = +new Date(1968, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var date = [];

	var data = [Math.random() * 300];

	for(var i = 1; i < 20000; i++) {
		var now = new Date(base += oneDay);
		date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
		data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
	}

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
			data: date  //日期[年/月/日,...]
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%']
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
			data: data  //每日确诊数[11,22,...]
		}]
	};

	option && myChart.setOption(option);
}
//各大洲疫情占比饼图
function echarts_continent_pie() {
	var mychart = echarts.init(document.getElementById("chart_3"));
	var data_oracn;
	option = {
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b}: {c} ({d}%)'
		},
		legend: {
			left: 'center',
			data: ['亚洲', '南美洲', '北美洲', '非洲', '欧洲', '大洋洲'],
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
			data: [{
					value: 1000,
					name: '亚洲'
				},
				{
					value: 2000,
					name: '南美洲'
				},
				{
					value: 10000,
					name: '北美洲'
				},
				{
					value: 2000,
					name: '非洲'
				},
				{
					value: 5000,
					name: '欧洲'
				},
				{
					value: 500,
					name: '大洋洲'
				},
			]
		}]
	};

	mychart.setOption(option);
}

function flashAll() {
	world_static_list();
	echarts_china_rank();
	echarts_china_map();
	echarts_world_rank();
	echarts_world_map();
	echarts_continent_pie();
	echarts_world_china_vaccinations();
	echarts_world_daily_confirm();
	echarts_world_daily_dead();
}
$(function() {
	setInterval(flashAll, 1000 * 60 * 30)
	flashAll()
});