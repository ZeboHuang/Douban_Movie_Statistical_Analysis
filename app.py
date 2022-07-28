# -*- coding: utf-8 -*-

import numpy as np
from flask import Flask as _Flask
from flask import jsonify
from flask import render_template
from flask.json import JSONEncoder as _JSONEncoder

import db


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
    return render_template("index.html")


# hzb modify start
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


# hzb modify end

# lhg modify start
@app.route('/get_movie_genres_change')
def get_movie_genres_change():
    """近十年类型电影量的变化"""
    return db.get_movie_genres_change()


@app.route('/get_directors_sort')
def get_directors_sort():
    """导演均分排行榜"""
    return db.get_directors_sort(15)


@app.route('/get_person_sort')
def get_person_sort():
    """演员均分排行榜"""
    return db.get_person_sort(20)


@app.route('/get_movie_duration_score')
def get_movie_duration_score():
    """电影评分与时长的关系"""
    return db.get_movie_duration_score()


@app.route('/get_duration_comment_num')
def get_duration_comment_num():
    return db.get_duration_comment_num()


@app.route('/get_movie_language')
def get_movie_language():
    return db.get_movie_language()


@app.route('/get_movie_num_by_year')
def get_movie_num_by_year():
    return db.get_movie_num_by_year()


if __name__ == '__main__':
    app.run()
