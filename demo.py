# import pandas as pd

# import fileinput
#
# with fileinput.input(files='C:\\Users\\86191\\Desktop\\python课件\\users.csv') as file:
#     for line in file:
#         print(f'{fileinput.filename()} 第{fileinput.lineno()}行: {line}', end='')

import csv

# filename = 'C:\\Users\\86191\\Desktop\\python课件\\users.csv'
# filename = 'data/users.csv'
# data = []
#
# with open(filename) as csvfile:
#     csv_reader = csv.reader(csvfile,)  # 使用csv.reader读取csvfile中的文件
#     # header = next(csv_reader)        # 读取第一行每一列的标题
#     for row in csv_reader:  # 将csv 文件中的数据保存到data中
#         data.append(row[1])  # 选择某一列加入到data数组中
#     print(data)
# import pandas as pd
# df = pd.read_csv('data/users.csv')
# print(df)
# import pyecharts
# print(pyecharts.__version__)


# from pyecharts.charts import Bar
# bar = Bar()
# bar.add_xaxis(["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"])
# bar.add_yaxis("商家A", [5, 20, 36, 10, 75, 90])
# # render 会生成本地 HTML 文件，默认会在当前目录生成 render.html 文件
# # 也可以传入路径参数，如 bar.render("mycharts.html")
# bar.render("mycharts.html")


# from pyecharts.charts import Map
#
# province_distribution = {'四川': 239.0, '浙江': 231.0, '福建': 203.0, '江苏': 185.0, '湖南': 152.0, '山东': 131.0, '安徽': 100.0, '广东': 89.0, '河北': 87.0, '湖北': 84.0, '吉林': 75.0,
#                          '上海': 70.0, '江西': 64.0, '广西': 64.0, '贵州': 64.0, '北京': 63.0, '云南': 53.0, '重庆': 49.0, '河南': 48.0, '陕西': 38.0, '山西': 37.0, '辽宁': 33.0, '新疆': 25.0,
#                          '内蒙古': 23.0, '黑龙江': 20.0, '天津': 19.0, '甘肃': 13.0, '海南': 9.0, '青海': 7.0, '宁夏': 4.0, '西藏': 0.0}
# province = list(province_distribution.keys())
# num = list(province_distribution.values())
#
#
# chinaMap = Map(width=1200, height=600)
# chinaMap.add(name="分布数量",
#              attr=province,
#              value=num,
#              visual_range=[0, 239],
#              maptype='china',
#              is_visualmap=True)
# chinaMap.render(path="中国地图.html")


