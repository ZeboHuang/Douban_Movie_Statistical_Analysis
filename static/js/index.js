// ajax模板
function ajax_template() {

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


//中国演员分布地图
function china_map() {
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
            var myChart = echarts.init(document.getElementById('chart_2'));

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

//echart_map世界地图
function world_map() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart_map'));
    var mydata;
    $.ajax({
        url: "/get_world_map_data",
        success: function (data) {
            mydata = data;
            option = {
                title: {
                    left: 'center',
                    top: 'top'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
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
                    data: mydata // [{name: 'Zimbabwe',value: 13076.978}, ...]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        error: function (xhr, type, errorThrown) {
            alert('echarts_world_map ajax error')
        },
        async: true
    });
}

//近十年类型电影量变化
function movie_genres_change() {

    $.ajax({
        url: "/get_movie_genres_change", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值


            var chartDom = document.getElementById('chart_11');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                title: {
                    textStyle: {
                        color: 'red',
                        fontSize: 20
                    },
                    text: '近十年电影类型的变化'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: data.legend
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
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 14
                        },
                        rotate: -30,
                        clickable: true
                    },
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    name: '年份',
                    type: 'category',
                    boundaryGap: false,
                    data: data.xAxis
                },
                yAxis: {
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 14
                        },
                        rotate: 0,
                        clickable: true
                    },
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    name: '数量',
                    type: 'value'
                },
                series: data.series
            };

            option && myChart.setOption(option);


        },
        error: function (xhr, type, errorThrown) { //如果请求失败则这些error对应的function
            alert('world_static_list ajax error')
        },
        async: true
    })


}

//导演作品平均评分排行榜
function directors_sort() {

    $.ajax({
        url: "/get_directors_sort", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值


            var chartDom = document.getElementById('chart_6');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                title: {
                    textStyle: {
                        color: 'red',
                        fontSize: 20
                    },
                    text: '导演均分排名',
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
                xAxis: [{
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 14
                        },
                        rotate: -30,
                        clickable: true
                    },
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    name: '导演',
                    type: 'category',
                    data: data.names,
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 14
                        },
                        rotate: 0,
                        clickable: true
                    },
                    name: '均分',
                    type: 'value'
                }],
                series: [{
                    name: 'score:',
                    type: 'bar',
                    barWidth: '60%',
                    data: data.values
                }]
            };

            option && myChart.setOption(option);

        },
        error: function (xhr, type, errorThrown) { //如果请求失败则这些error对应的function
            alert('get_directors_sort ajax error')
        },
        async: true
    })


}

//演员均分排行
function person_sort() {
    $.ajax({
        url: "/get_person_sort", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值


            var chartDom = document.getElementById('chart_7');
            var myChart = echarts.init(chartDom);
            var option;
            var key = data.key;
            var values = data.values;

            option = {
                title: {
                    textStyle: {
                        color: 'red',
                        fontSize: 20
                    },
                    text: '演员均分排名',
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
                xAxis: [{
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 14
                        },
                        rotate: -30,
                        clickable: true
                    },
                    name: '演员',
                    type: 'category',
                    data: data.names,
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 14
                        },
                        rotate: 0,
                        clickable: true
                    },
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    name: '均分',
                    type: 'value'
                }],
                series: [{
                    name: 'score:',
                    type: 'bar',
                    barWidth: '60%',
                    data: data.values
                }]
            };

            option && myChart.setOption(option);


        },
        error: function (xhr, type, errorThrown) { //如果请求失败则这些error对应的function
            alert('world_static_list ajax error')
        },
        async: true
    })


}

//电影评分和时长的关系
function movie_duration_score() {

    $.ajax({
        url: "/get_movie_duration_score", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值

            var chartDom = document.getElementById('chart_8');
            var myChart = echarts.init(chartDom);
            var option;


            option = {
                title: {
                    textStyle: {
                        color: 'red',
                        fontSize: 20
                    },
                    text: '电影评分和时长的关系',
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
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 14
                        },
                        rotate: -30,
                        clickable: true
                    },
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    name: '时长',
                    type: 'category',
                    boundaryGap: false,
                    // prettier-ignore
                    data: data.mins
                    //    ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
                },
                yAxis: {
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 14
                        },
                        rotate: 0,
                        clickable: true
                    },
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    name: '均分',
                    type: 'value',
                    axisPointer: {
                        snap: true
                    }
                },
                visualMap: {
                    show: false,
                    dimension: 0
                },
                series: [{
                    name: 'score',
                    type: 'line',
                    smooth: true,
                    // prettier-ignore
                    data: data.scores
                    //      [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
                }]
            };

            option && myChart.setOption(option);


        },
        error: function (xhr, type, errorThrown) { //如果请求失败则这些error对应的function
            alert('world_static_list ajax error')
        },
        async: true
    })


}

//各时间段用户的活跃程度-评论数量
function duration_comment_num() {

    $.ajax({
        url: "/get_duration_comment_num", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值


            var chartDom = document.getElementById('chart_9');
            var myChart = echarts.init(chartDom);
            var option;


            option = {
                title: {
                    textStyle: {
                        color: 'red',
                        fontSize: 20
                    },
                    text: '每个时间段的评论人数',
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
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 14
                        },
                        rotate: -30,
                        clickable: true
                    },
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    name: '时间',
                    type: 'category',
                    boundaryGap: false,
                    // prettier-ignore
                    data: data.hours
                    //    ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
                },
                yAxis: {
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 14
                        },
                        rotate: 0,
                        clickable: true
                    },
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    name: '数量',
                    type: 'value',
                    axisPointer: {
                        snap: true
                    }
                },
                visualMap: {
                    show: false,
                    dimension: 0
                },
                series: [{
                    name: 'count',
                    type: 'line',
                    smooth: true,
                    // prettier-ignore
                    data: data.counts
                    //      [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
                }]
            };

            option && myChart.setOption(option);


        },
        error: function (xhr, type, errorThrown) { //如果请求失败则这些error对应的function
            alert('world_static_list ajax error')
        },
        async: true
    })


}

//电影语言占比
function movie_language_pie() {
    $.ajax({
        url: "/get_movie_language", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值


            var rows = new Array();

            for (var key in data) {
                row = new Object()
                row.name = key
                row.value = data[key]
                rows.push(row)
            }


            var chartDom = document.getElementById('chart_10');
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
                        data: rows,
                    }
                ]
            };

            option && myChart.setOption(option);


        },
        error: function (xhr, type, errorThrown) { //如果请求失败则这些error对应的function
            alert('world_static_list ajax error')
        },
        async: true
    })


}

//近十年上映的电影数量
function movie_num_by_year() {

    $.ajax({
        url: "/get_movie_num_by_year", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值


            var chartDom = document.getElementById('chart_5');
            var myChart = echarts.init(chartDom);
            var option;


            let dataAxis = data.years
            let value = data.counts
            let yMax = Math.max(data.counts);
            let dataShadow = [];
            for (let i = 0; i < value.length; i++) {
                dataShadow.push(yMax);
            }
            option = {
                title: {
                    textStyle: {
                        color: 'red',
                        fontSize: 20
                    },
                    text: '近十年上映的电影数量',
//                    subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
                },
                xAxis: {
                    name: '年份',
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    data: dataAxis,
                    axisLabel: {
                        inside: true,
                        color: '#fff',
//                        rotate: -30,
                        fontSize: 16,

                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    name: '数量',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#999'
                    }
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        showBackground: true,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ])
                        },
                        emphasis: {
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {offset: 0, color: '#2378f7'},
                                    {offset: 0.7, color: '#2378f7'},
                                    {offset: 1, color: '#83bff6'}
                                ])
                            }
                        },
                        data: value
                    }
                ]
            };

            const zoomSize = 6;
            myChart.on('click', function (params) {
                console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
                myChart.dispatchAction({
                    type: 'dataZoom',
                    startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                    endValue:
                        dataAxis[Math.min(params.dataIndex + zoomSize / 2, value.length - 1)]
                });
            });

            option && myChart.setOption(option);


        },
        error: function (xhr, type, errorThrown) { //如果请求失败则这些error对应的function
            alert('world_static_list ajax error')
        },
        async: true
    })


}

//机器学习-预测评分
function predict_score_line() {
    //发送ajax请求
    $.ajax({
        url: "/get_predict_score", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值
            console.log('predict_score')
            console.log(data)


            var chartDom = document.getElementById('chart_1');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                title: {
                    textStyle: {
                        color: 'red',
                        fontSize: 20
                    },
                    text: "模型得分:" + data.score + "方差:" + data.square_mean_error
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['真实值', '预测值']
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
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 18
                        },
                        rotate: -30,
                        clickable: true
                    },
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    name: "电影序号",
                    type: 'category',
                    boundaryGap: false,
                    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    data: data.label
                },
                yAxis: {
                    axisLabel: {
                        textStyle: {
                            color: '#ea7ccc',
                            fontSize: 24
                        },
                        rotate: 0,
                        clickable: true
                    },
                    nameTextStyle: {
                        color: "yellow",
                        fontSize: 18,
                        // padding:10
                    },
                    name: '评分',
                    type: 'value'
                },
                series: [{
                    name: '真实值',
                    type: 'line',
                    data: data.real
                },
                    {
                        name: '预测值',
                        type: 'line',
                        data: data.pred
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

//词云
function wordcloud_img() {
    //发送ajax请求

    $.ajax({
        url: "/get_word_cloud", //请求的资源路径
        success: function (data) { //如果请求成功，则执行success对应的function,data会接收上一行请求url的返回值
            var chartDom = document.getElementById('chart_4');
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
    china_map()
    movie_genres_change()
    directors_sort()
    person_sort()
    movie_duration_score()
    duration_comment_num()
    movie_language_pie()
    movie_num_by_year()
    predict_score_line()
    wordcloud_img()
}


// 执行
$(function () {
    setInterval(flashAll, 1000 * 60 * 30) //每隔30分钟调用flashAll函数，刷新页面数据
    flashAll() // 调用flashAll函数
});