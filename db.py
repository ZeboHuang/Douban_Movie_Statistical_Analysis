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
import pandas as pd

import server as sv

# hzb modify start

predict_score = sv.get_score_prediction()
wordcloud_ = sv.get_word_cloud()


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
    square_mean_error = predict_score.mean_squared_error()
    dict_ = {'real': real_score, 'pred': pred_score, 'label': np.arange(1, 100 + 1).tolist(), 'score': score,
             'square_mean_error': square_mean_error}
    return dict_


def get_china_actors():
    """按省获取中国演员"""
    with open("./data/province_actors_cnt.json", encoding='utf-8') as fp:
        dict_ = json.load(fp)
    print(dict_)
    return dict_
    # return sv.get_china_actors()


# hzb modify end

# lhg modify start

# # 获取某年到某年的电影数据
# def get_movies_by_year_from_to(from_, to_):
#     # data = pd.read_csv("./data/movies.csv", usecols=['MOVIE_ID', 'NAME', 'GENRES', 'YEAR'])
#     # # 去除时间为空的项
#     # data.YEAR.isna().sum()  # 没有
#     # # 去除时间为0 或者大于2020的项(数据为2019年的数据)
#     # d1 = data[(data.YEAR < 2020) & (data.YEAR > 0)]
#     # d1.to_csv("./data/year_to_year_movie", encoding="utf_8_sig")
#     #
#     # d1 = data[(data.YEAR < 2020) & (data.YEAR > 2009)]
#     # d1.to_csv("./data/year_to_year_movie", encoding="utf_8_sig")
#
#     d1 = pd.read_csv("./data/year_to_year_movie")
#     return d1[(d1.YEAR >= from_) & (d1.YEAR <= to_)]
# # 获取某一年的电影
# def get_movies_by_year_range():
#     return server.get_movies_by_year_range(2009, 2019)
#
#
# def get_year_num_genre(year_, genre_):
#     genres = get_movies_by_year(year_)
#     dt1 = genres.GENRES.str.split('/', expand=True)
#     dt1 = dt1.stack()
#     dt1 = dt1.reset_index(level=1, drop=True)
#     dt2 = genres.drop(['GENRES'], axis=1)
#     dt1.name = "GENRES"
#     dt2 = dt2.join(dt1)
#     group = dt2.groupby('GENRES')
#     result = group.MOVIE_ID.count().sort_values(ascending=False)  # 排序
#     # print(type(result))
#     return result[genre_]
#
#
# def get_all_num_genre(genre_):
#     lst = []
#     for year in range(2010, 2020):
#         lst.append(get_year_num_genre(year, genre_))
#     return lst


# 近十年类型电影量的变化
def get_movie_genres_change():
    """
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        """
    df = pd.read_json('./data/recent_years_movies_count_by_genre.json')
    genre_index = ["剧情", "喜剧", "动作", "爱情", "恐怖", "惊悚", "悬疑", "犯罪", "动画", "科幻"]
    data = df.loc[genre_index]
    lst = []
    for genre in genre_index:
        t = {}
        t['name'] = genre
        t['data'] = list(data.loc[genre].values)
        t['type'] = 'line'
        # t['stack'] = 'Total'#堆叠
        lst.append(t)

    dict_ = {'legend': genre_index, 'xAxis': list(df.columns), 'series': lst}
    print(dict_["series"])
    return dict_


# 导演均分排行
def get_directors_sort(ntop=10):
    """获取前top10 的导演
        :return (DataFrame)
        """
    data = pd.read_csv('./data/directors_sort.csv', encoding='utf-8', nrows=ntop)
    dict_ = {
        'names': list(data.DIRECTOR),
        'values': list(data.AVG_SCORE)
    }

    # dic = score_avg.to_dict()
    # dic = dic['DOUBAN_SCORE']
    # dict_directors = {"key": list(dic.keys()), "values": list(dic.values())}
    print(dict_)
    return dict_


# 演员均分排行
def get_person_sort(ntop=10):
    data = pd.read_csv('./data/person_sort.csv', encoding='utf-8', nrows=ntop)
    dict_ = {
        'names': list(data.ACTOR),
        'values': list(data.AVG_SCORE)
    }
    # print(dict_)
    return dict_


def get_movie_duration_score():
    df = pd.read_csv('./data/movie_duration_score.csv')
    dict_time_score = {"mins": list(df.MINS), "scores": list(df.AVG_SCORE)}
    print(dict_time_score)
    return dict_time_score


# 各时间段内用户的活跃程度
def get_duration_comment_num():
    time_count = pd.read_csv('./data/duration_comment_num.csv')
    time_count['HOUR'] = time_count.HOUR.apply(lambda x: "{}:30".format(x))
    dict_time_count = {"hours": list(time_count.HOUR), "counts": list(time_count.COUNT)}
    # print(dict_time_count)
    return dict_time_count


# 每年电影数量
def get_movie_num_by_year(from_=2010, to_=2019):
    data = pd.read_csv("./data/movie_num_by_year.csv")
    df = data[(data.YEAR >= from_) & (data.YEAR <= to_)]
    dict_year_num_all = {"years": list(df.YEAR.astype(str)), "counts": list(df.COUNT)}
    print(dict_year_num_all)
    return dict_year_num_all


# 语言占比
def get_movie_language(ntop=15):
    df = pd.read_csv('./data/movie_language.csv', nrows=ntop)
    df = df.set_index('LANGUAGE')
    # print(df.to_dict()['COUNT'])
    return df.to_dict()['COUNT']


# lhg modify end

if __name__ == '__main__':
    # print(comments_word_cloud())
    # load_comments_word_cloud()
    # get_recent_years_movies_count_by_genre()
    # get_directors_sort()
    # get_person_sort()
    # get_movie_duration_score()
    # get_duration_comment_num()
    # get_movie_language()
    get_movie_num_by_year(2010, 2019)
    pass
