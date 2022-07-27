# -*- coding: utf-8 -*-
import json

from flask import Flask as _Flask
from flask import jsonify
from flask import render_template
from flask.json import JSONEncoder as _JSONEncoder
import db
import numpy as np


# 重写Flask框架中的JSONEncoder类中的default方法
class JSONEncoder(_JSONEncoder):
    def default(self, o):
        import decimal
        if isinstance(o, decimal.Decimal):
            return float(o)
        elif isinstance(o, np.int64):
            return int(o)
        super(JSONEncoder, self).default(o)


class Flask(_Flask):
    json_encoder = JSONEncoder


app = Flask(__name__)


@app.route('/')
def index():
    return render_template("databoard.html")

#hzb modify start
@app.route('/get_predict_score')
def get_predict_score():
    """
    获取预测数据与真实值数据，传给前端进行对比
    :return: json 格式数据
    """
    result = db.get_prediction()
    # print(result)
    return jsonify(result)


@app.route('/get_china_actors')
def get_china_actors():
    """
    为地图提供演员数据
    :return:
    """
    dict_ = db.get_china_actors()
    print(dict_)
    return dict_

@app.route('/get_word_cloud')
def get_word_cloud():
    return db.get_word_cloud()

#hzb modify end

#lhg modify start
@app.route('/get_test_data')
def get_test_data():
    # dict_ = {'category': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    #          'value': [120, 200, 150, 80, 70, 110, 130]}
    return jsonify(db.get_num_genre())


@app.route('/get_test2_data')
def get_test2_data():
    return jsonify(db.get_score_person())


@app.route('/get_test3_data')
def get_test3_data():
    return jsonify(db.get_score_time())


@app.route('/get_test4_data')
def get_test4_data():
    return jsonify(db.get_time_count())


@app.route('/get_test5_data')
def get_test5_data():
    return jsonify(db.get_language_movie())


@app.route('/get_test6_data')
def get_test6_data():
    return jsonify(db.get_year_num_all())

    '''
@app.route('/get_world_map_data')
def get_world_map_data():
    """
    :return:json字符串 获取世界疫情地图数据
    """
    return jsonify(db.query_world_map_data())


@app.route('/get_china_map_data')
def get_china_map_data():
    """
    :return:json字符串  获取中国疫情地图数据
    """
    return jsonify(db.query_china_map_data())


@app.route('/get_china_rank_data')
def get_china_rank_data():
    """
    :return:中国新增确诊排行前5的城市(不包含境外输入)
    """
    return jsonify(db.query_china_rank_data())


@app.route('/get_world_rank_data')
def get_world_rank_data():
    """
    :return:全球新增排行前5的国家
    """
    return jsonify(db.query_world_rank_data())


@app.route('/get_continent_pie_data')
def get_continent_pie_data():
    """
    :return:各洲确诊数占比饼图数据
    """
    return jsonify(db.query_continent_pie_data())


@app.route('/get_world_daily_confirm_data')
def get_world_daily_confirm_data():
    """
    :return:世界每日新增确认历史数据，数据格式 [[年/月/日,...], [每日确诊数]]
    """
    return jsonify(db.query_world_daily_confirm_data())


@app.route('/get_world_daily_dead_data')
def get_world_daily_dead_data():
    """
    :return:世界每日新增死亡历史数据，数据格式 [[年/月/日,...], [每日确诊数]]
    """
    return jsonify(db.query_world_daily_dead_data())

@app.route('/get_world_china_vaccinations')
def get_world_china_vaccinations_data():
    """
    :return:世界每日新增死亡历史数据，数据格式：最大接种数，最大接种率,[[日期,...], [世界接种数], [中国接种数], [世界接种率], [中国接种率]]
    """
    max, maxPer, data = db.query_world_china_vaccinations_data()
    return jsonify(max=max, maxPer=maxPer, data=data)

@app.route('/get_world_static_list_data')
def get_world_static_list_data():
    """
    :return:大屏头部左边和右边疫情数字信息 [新增死亡, 总死亡数, 总确诊数, 总治愈数, 新增治愈数, 总疫苗接种数]
    """
    return jsonify([111,222,333,111,222,333])
    # return jsonify(db.query_world_static_list_data())
'''


if __name__ == '__main__':
    app.run()
