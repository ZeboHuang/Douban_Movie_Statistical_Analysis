# -*- coding: utf-8 -*-
"""
  File Name：       db
  Description :
  Author :          Nick
  date：            2022/1/25
  Change Activity:  2022/1/25:
"""
import json

import numpy as np

import server as sv

# hzb modify start

predict_score = sv.get_score_prediction()
wordcloud_ = sv.get_word_cloud()


def load_comments_word_cloud():
    """封装 关键词与出现次数"""
    json_data = None
    with open("./data/wordcloud.json", "r", encoding="utf-8") as fp:
        json_data = json.load(fp)
    print(json_data)


def load_recent_year_movie_count():
    # """近年来每年不同类型电影的统计"""
    # if recent_year_df is None:
    #     recent_year_df = pd.read_csv('./data/recent_years_genres.csv')
    pass


def get_word_cloud():
    dict_ = {'path': wordcloud_.wordcloud_path}
    return dict_


def get_prediction():
    """
    获取预测信息
    :return:
    """
    pred = predict_score.predict(predict_score.x_test)
    pred_score = pred.reshape(1, -1)[0].tolist()
    real_score = predict_score.y_test.tolist()
    score = predict_score.score()
    square_mean_error =predict_score.mean_squared_error()
    dict_ = {'real': real_score, 'pred': pred_score, 'label': np.arange(1, 100+1).tolist(), 'score':score,'square_mean_error':square_mean_error}
    return dict_


def get_china_actors():
    with open("./data/province_actors_cnt.json", encoding='utf-8') as fp:
        dict_ = json.load(fp)
    print(dict_)
    return dict_
    # return sv.get_china_actors()


# hzb modify end


if __name__ == '__main__':
    # print(comments_word_cloud())
    # load_comments_word_cloud()
    print(get_prediction())
    pass
