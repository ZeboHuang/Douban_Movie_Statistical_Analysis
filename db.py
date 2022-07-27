# -*- coding: utf-8 -*-
"""
  File Name：       db
  Description :
  Author :          Nick
  date：            2022/1/25
  Change Activity:  2022/1/25:
"""
import json

import server as sv
import pandas as pd
import jieba

import db
import utils

from app import JSONEncoder


#hzb modify start

predict_score = sv.get_score_prediction()
wordcloud_ = sv.get_word_cloud()

#没用
def load_comments_word_cloud():
    """封装 关键词与出现次数"""
    json_data = None
    with open("./data/wordcloud.json", "r", encoding="utf-8") as fp:
        json_data = json.load(fp)
    print(json_data)
    pass

#没用
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
    pred = pred.reshape(1, -1)[0]
    dict_ = {'real': predict_score.y_test.tolist(), 'pred': pred.tolist()}
    return dict_


def get_china_actors():
    with open("./data/province_actors_cnt.json", encoding='utf-8') as fp:
        dict_ = json.load(fp)
    print(dict_)
    return dict_
    # return sv.get_china_actors()

#hzb modify end

#lhg modify start
# 获取某年到某年的电影数据
def get_movies_by_year_from_to(from_, to_):
    # data = pd.read_csv("./data/movies.csv", usecols=['MOVIE_ID', 'NAME', 'GENRES', 'YEAR'])
    # # 去除时间为空的项
    # data.YEAR.isna().sum()  # 没有
    # # 去除时间为0 或者大于2020的项(数据为2019年的数据)
    # d1 = data[(data.YEAR < 2020) & (data.YEAR > 0)]
    # d1.to_csv("./data/year_to_year_movie", encoding="utf_8_sig")
    #
    # d1 = data[(data.YEAR < 2020) & (data.YEAR > 2009)]
    # d1.to_csv("./data/year_to_year_movie", encoding="utf_8_sig")

    d1 = pd.read_csv("./data/year_to_year_movie")
    return d1[(d1.YEAR >= from_) & (d1.YEAR <= to_)]


# 获取某一年的电影
def get_movies_by_year(year):
    return get_movies_by_year_from_to(year, year)


def get_year_num_genre(year_, genre_):
    genres = get_movies_by_year(year_)
    dt1 = genres.GENRES.str.split('/', expand=True)
    dt1 = dt1.stack()
    dt1 = dt1.reset_index(level=1, drop=True)
    dt2 = genres.drop(['GENRES'], axis=1)
    dt1.name = "GENRES"
    dt2 = dt2.join(dt1)
    group = dt2.groupby('GENRES')
    result = group.MOVIE_ID.count().sort_values(ascending=False)  # 排序
    # print(type(result))
    return result[genre_]


def get_all_num_genre(genre_):
    lst = []
    for year in range(2010, 2020):
        lst.append(get_year_num_genre(year, genre_))
    return lst


def get_num_genre():
    # data_new = get_movies_by_year_from_to(2010, 2019)
    lst_ = []
    genre_all = ["剧情", "喜剧", "动作", "爱情", "恐怖", "惊悚", "悬疑", "犯罪", "动画", "科幻"]
    for genre in genre_all:
        dict_ = {'name': genre, 'data': get_all_num_genre(genre), 'type': 'line'}
        lst_.append(dict_)
    dict_ = {"bbb": lst_}
    return dict_


def get_directors_sort():
    # data = pd.read_csv("./data/movies.csv")
    # data['DOUBAN_SCORE'].value_counts()
    # # 找出0的索引
    # data[data['DOUBAN_SCORE'] == 0].index.tolist
    # clean_data1 = data.drop(index=data[(data['DOUBAN_SCORE'] == 0)].index.tolist())
    # clean_data1 = clean_data1.reset_index(drop=True)
    # clean_data1.to_csv("./data/movies_score.csv", encoding="utf_8_sig")
    # data = pd.read_csv("./data/movies_score.csv",
    #                    usecols=["MOVIE_ID", "NAME", "DOUBAN_SCORE", "DIRECTORS", "DIRECTOR_IDS"])
    # # 去除NaN项
    # clean_data = data.dropna(subset=['DIRECTOR_IDS'])
    # # 可能有多个导演，先分行，在分列
    # dd = clean_data.DIRECTOR_IDS.str.split('|', expand=True)
    # dd = dd.stack()
    # dd = dd.reset_index(level=1, drop=True)
    # dd.name = "DIRECTOR_IDS"
    # # 原表删除两个字段
    # d2 = clean_data.drop(['DIRECTOR_IDS', 'DIRECTORS'], axis=1)
    # d3 = d2.join(dd)
    # # 分列
    # d4 = d3.DIRECTOR_IDS.str.split(':', expand=True)
    # d4.columns = ['DIRECTORS', 'DIRECTOR_IDS']
    # # 合并
    # d5 = d3
    # d5['DIRECTORS'] = d4.DIRECTORS
    # d5['DIRECTOR_IDS'] = d4.DIRECTOR_IDS
    # # 去除空值
    # d6 = d5[d5.DIRECTOR_IDS != '']
    # d6 = d6.dropna(subset=['DIRECTOR_IDS'])
    # d6 = d6.drop('MOVIE_ID', axis=1)
    # d6 = d6.drop('NAME', axis=1)
    # groups = d6.groupby('DIRECTORS')
    # dict_groups = groups.groups  # 查看分组情况, 字典类型
    # score_avg = groups['DOUBAN_SCORE'].mean()
    # score_avg = score_avg.sort_values(ascending=False).head(14)
    # score_avg.to_csv("./data/director_score_avg.csv", encoding="utf_8_sig")

    score_avg = pd.read_csv("./data/director_score_avg.csv")
    score_avg = score_avg.set_index("DIRECTORS")
    # print(type(score_avg))
    dic = score_avg.to_dict()
    dic = dic['DOUBAN_SCORE']
    dict_directors = {"key": list(dic.keys()), "values": list(dic.values())}
    return dict_directors


def get_score_person():
    # data = pd.read_csv("./data/movies_score.csv", usecols=["MOVIE_ID", "NAME", "ACTORS", "ACTOR_IDS", "DOUBAN_SCORE"])
    # data.ACTORS.isna().sum()
    # clean_data = data.dropna(subset=['ACTORS', 'ACTOR_IDS'])
    # clean_data.isna().sum()
    # clean_data.shape
    # # 上述处理有问题
    # # 一行分多行
    # d1 = clean_data.ACTOR_IDS.str.split('|', expand=True)
    # d1 = d1.stack()
    # d1 = d1.reset_index(level=1, drop=True)
    # d1.name = "ACTOR_IDS"
    # d2 = clean_data.drop(['ACTOR_IDS', 'ACTORS'], axis=1).join(d1)
    # # 一列分多列
    # d3 = d2.ACTOR_IDS.str.split(':', expand=True)
    # d3.columns = ['ACTORS', 'ACTOR_IDS']
    # # 合并
    # d4 = d2
    # d4['ACTORS'] = d3.ACTORS
    # d4['ACTOR_IDS'] = d3.ACTOR_IDS
    # # 去除没有ID的行
    # d4 = d4[d4.ACTOR_IDS != '']
    # d4 = d4.dropna(subset=['ACTORS', 'ACTOR_IDS'])
    # d4.to_csv('./data/movie_person_score.csv', encoding='utf-8-sig')
    #
    # # 读数据，清洗数据
    # data = pd.read_csv("./data/movie_person_score.csv", )
    # clean_data = data.dropna(subset=['ACTORS'])
    # clean_data = clean_data.drop("MOVIE_ID", axis=1)
    # clean_data = clean_data.drop("NAME", axis=1)
    # clean_data = clean_data.drop("ACTOR_IDS", axis=1)
    # groups = clean_data.groupby('ACTORS')
    # score_person = groups['DOUBAN_SCORE'].mean()
    # # 存均评分前30排名的演员
    # score_person = score_person.sort_values(ascending=False)
    # score_person_head = score_person.head(30)
    # score_person_head.to_csv('./data/score_person_head.csv', encoding='utf-8-sig')

    score_person_head = pd.read_csv('./data/score_person_head.csv')
    score_person_head = score_person_head.head(10)
    score_person_head = score_person_head.set_index('ACTORS')
    dict_ = score_person_head.to_dict()
    dict_ = dict_['DOUBAN_SCORE']
    dict_score_person = {"key": list(dict_.keys()), "values": list(dict_.values())}
    return dict_score_person


def get_score_time():
    # data = pd.read_csv("./data/movies.csv", usecols=["MINS", "DOUBAN_SCORE"])
    # drop_list = data[data['MINS'] <= 60].index.tolist()
    # data_time = data.drop(index=drop_list)
    # drop_list1 = data_time[data['MINS'] >= 200].index.tolist()
    # data_time1 = data_time.drop(index=drop_list1)
    # drop_list2 = data_time1[data['DOUBAN_SCORE'] == 0].index.tolist()
    # data_time2 = data_time1.drop(index=drop_list2)
    # data_time2 = data_time2.reset_index(drop=True)
    # data_time2.to_csv("./data/movie_time.csv", encoding="utf_8_sig")

    data_time = pd.read_csv('./data/movie_time.csv')
    groups = data_time.groupby('MINS')
    score_time = groups['DOUBAN_SCORE'].mean()
    dict_time_score = score_time.to_dict()
    dict_time_score_new = {"key": list(dict_time_score.keys()), "values": list(dict_time_score.values())}
    return dict_time_score_new


def get_time_count():
    # data = pd.read_csv("./data/comments.csv", usecols=['COMMENT_TIME', 'COMMENT_ID'])
    # data['COMMENT_TIME'] = pd.to_datetime(data['COMMENT_TIME'])
    # time_s = data
    # time_s.COMMENT_TIME = data["COMMENT_TIME"].apply(lambda x: x.hour)
    # groups = time_s.groupby('COMMENT_TIME')
    # time_count = groups['COMMENT_ID'].count()
    # time_count.to_csv("./data/time_count.csv", encoding="utf_8_sig")

    time_count = pd.read_csv('./data/time_count.csv')
    time_count['COMMENT_TIME'] = time_count.COMMENT_TIME.apply(lambda x: "{}:30".format(x))
    time_count = time_count.set_index(['COMMENT_TIME'])
    dict_time_count = time_count.to_dict()
    dict_time_count = dict_time_count['COMMENT_ID']
    dict_time_count_new = {"key": list(dict_time_count.keys()), "values": list(dict_time_count.values())}
    print(dict_time_count_new)
    return dict_time_count_new


def get_year_num_all():
    # data1 = get_movies_by_year_from_to(2010, 2019)
    # groups = data1.groupby(['YEAR'])
    # data_ = groups['MOVIE_ID'].count()
    # data_.to_csv("./data/year_movie_num.csv", encoding="utf_8_sig")

    data_ = pd.read_csv("./data/year_movie_num.csv")
    data_ = data_.set_index(["YEAR"])
    dict_ = data_.to_dict()
    dict_ = dict_['MOVIE_ID']
    dict_year_num_all = {"key": list(dict_.keys()), "values": list(dict_.values())}
    return dict_year_num_all


def save_language_movies():
    pass
    # data = pd.read_csv("./data/movies.csv", usecols=['MOVIE_ID', 'LANGUAGES'])
    # clean_data = data.dropna(subset=['LANGUAGES'])
    # d1 = clean_data.LANGUAGES.str.split('/', expand=True)
    # d1 = d1.stack().reset_index(level=1, drop=True).str.strip()
    # d1.name = "LANGUAGE"
    # d2 = clean_data.drop(['LANGUAGES'], axis=1).join(d1)
    # group = d2.groupby('LANGUAGE')
    # result = group.MOVIE_ID.count().sort_values(ascending=False)
    # result.to_csv('./data/language_movie.csv', encoding='utf-8')
    # print("aaa")


def get_language_movie():
    data_ = pd.read_csv('./data/language_movie.csv')
    data_ = data_.head(15)
    data_ = data_.set_index(['LANGUAGE'])
    dict_ = data_.to_dict()
    dict_ = dict_['MOVIE_ID']
    dict_new = {"aaa": dict_}
    print(dict_new)
    return dict_new
#lhg modify end

if __name__ == '__main__':
    # print(comments_word_cloud())
    # load_comments_word_cloud()
    # print(get_year_num_all())
    pass
