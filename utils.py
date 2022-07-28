# -*- coding: utf-8 -*-
"""
  File Name：       utils
  Description :
  Author :          Nick
  date：            2022/1/25
  Change Activity:  2022/1/25:
"""
import json

import pandas as pd


# 创建停用词list
def stopwords_list(filepath):
    stopwords = [line.strip() for line in open(filepath, 'r', encoding='utf-8').readlines()]
    return stopwords


def learning_data():
    """獲取機器學習的數據集"""
    print("机器学习表")
    pass


def comments_groupby_movie():
    """按电影类型分类评论"""
    data = pd.read_csv('data/raw/comments.csv', usecols=['MOVIE_ID', 'CONTENT'])
    group = data.groupby(['MOVIE_ID'])
    result = group.sum().reset_index().set_index('MOVIE_ID')
    result.to_csv("./data/comments_groupfy.csv", encoding='utf-8')
    print("影评分类完成")


# 中国演员json表，未使用
def actor_china_json():
    data = pd.read_csv('data/raw/person.csv',
                       usecols=['PERSON_ID', "NAME", 'SEX', 'BIRTH', 'BIRTHPLACE', 'PROFESSION', 'CONSTELLATORY'],
                       index_col=0)
    place_clean = data.dropna(subset=['BIRTHPLACE', 'NAME'])
    # 获取国内演员
    data2 = place_clean[place_clean['BIRTHPLACE'].str.contains('香港|澳门|中国|台湾')]  # 获取国内演员
    place = data2.BIRTHPLACE.str.split(',', expand=True)
    data3 = data2.drop(['BIRTHPLACE'], axis=1).join(place[0]).join(place[1])
    data3.columns = ['NAME', 'SEX', 'BIRTH', 'PROFESSION', 'CONSTELLATORY', 'REGION_1', 'REGION_2']
    dict_ = {}
    for index, row in data3.iterrows():
        dict_[str(index)] = {}
        dict_.get(str(index))['person_id'] = str(index)
        dict_.get(str(index))['name'] = row['NAME']
        dict_.get(str(index))['sex'] = row['SEX']
        dict_.get(str(index))['bith'] = row['BIRTH']
        dict_.get(str(index))['constellatory'] = row['CONSTELLATORY']
        dict_.get(str(index))['profession'] = row['PROFESSION']
        dict_.get(str(index))['region_1'] = row['REGION_1']
        dict_.get(str(index))['region_2'] = row['REGION_2']

    with open("./data/actor_china.json", "w", encoding="utf-8") as fp:
        json.dump(dict_, fp, ensure_ascii=False)


def province_actors():
    """按省份分类-演员数量数据集"""
    data = pd.read_csv('data/raw/person.csv', usecols=['PERSON_ID', "NAME", 'SEX', 'BIRTH', 'BIRTHPLACE', 'PROFESSION'])

    # 获取国内演员
    data = data.dropna(subset=['BIRTHPLACE'])
    data2 = data[data['BIRTHPLACE'].str.contains('香港|澳门|中国|台湾')]  # 获取国内演员
    place = data2.BIRTHPLACE.str.split(',', expand=True)
    data3 = data2.drop(['BIRTHPLACE'], axis=1).join(place[0]).join(place[1])
    data3.columns = ['PERSON_ID', 'NAME', 'SEX', 'BIRTH', 'PROFESSION', 'REGION_1', 'REGION_2']
    data4 = data3.groupby('REGION_2')
    data4.PERSON_ID.count().sort_values(ascending=False).to_json('./data/province_actors_cnt.json')
    # data4.PERSON_ID.count().sort_values(ascending=False).to_json('./data/province_actors_cnt.json', force_ascii=False)
    print("按省分类演员表")


# lhg modify start

def movie_genres_change(from_=2010, to_=2019):
    """获取近年来 按年-类型的电影数量"""
    data = pd.read_csv("./data/raw/movies.csv", usecols=['MOVIE_ID', 'NAME', 'GENRES', 'YEAR'], dtype={'YEAR': int})
    # 去除时间为空的项
    # data.YEAR.isna().sum()  # 没有
    # 去除时间为0 或者大于2020的项(数据为2019年的数据)
    d1 = data[(data.YEAR >= from_) & (data.YEAR <= to_)]
    genres = d1.GENRES.str.split('/', expand=True).stack().reset_index(level=1, drop=True)
    genres.name = 'GENRE'
    d2 = d1.drop(['GENRES', 'NAME'], axis=1).join(genres)
    d2.GENRE = d2.GENRE.str.strip()
    group = d2.groupby(['YEAR', 'GENRE'])
    count = group.count().reset_index()
    count.columns = ['YEAR', 'GENRE', 'COUNT']
    dict_ = {}
    for row in count.values:
        if row[0] not in dict_.keys():
            dict_[row[0]] = {}
        t = {}
        t[row[1]] = row[2]
        dict_[row[0]].update(t)
    # print(dict_)
    with open('./data/recent_years_movies_count_by_genre.json', 'w', encoding='utf-8') as fp:
        json.dump(dict_, fp, ensure_ascii=False)
    print("类型年变化表")


# 导演均分排行
def directors_sort():
    data = pd.read_csv("./data/raw/movies.csv", usecols=["MOVIE_ID", "DOUBAN_SCORE", "DIRECTORS", "DIRECTOR_IDS"])
    # 去除NaN项
    clean_data = data.dropna(subset=['DIRECTOR_IDS', 'DIRECTORS', 'MOVIE_ID', 'DOUBAN_SCORE'])
    clean_data = clean_data[clean_data['DOUBAN_SCORE'] > 0]  # 豆瓣评分>0
    # 可能有多个导演，先分行，在分列
    d1 = clean_data.DIRECTOR_IDS.str.split('|', expand=True).stack().str.strip().reset_index(level=1, drop=True)
    d1.name = "DIRECTOR_ID"
    # 原表删除两个字段
    d2 = clean_data.drop(['DIRECTOR_IDS', 'DIRECTORS'], axis=1).join(d1)
    # 分列
    col = d2.DIRECTOR_ID.str.split(':', expand=True)
    col.columns = ['DIRECTOR', 'DIRECTOR_ID']
    # 合并
    d2['DIRECTOR'] = col.DIRECTOR
    d2['DIRECTOR_ID'] = col.DIRECTOR_ID
    # 去除空值
    d3 = d2[d2.DIRECTOR_ID != '']
    d3 = d3.dropna(subset=['DIRECTOR_ID'])
    # 排序
    group = d3.groupby(['DIRECTOR_ID', 'DIRECTOR'])
    result = group.DOUBAN_SCORE.mean().sort_values(ascending=False)
    result = result.reset_index()
    result.columns = ['DIRECTOR_ID', 'DIRECTOR', 'AVG_SCORE']
    result.to_csv("./data/directors_sort.csv", encoding='utf-8-sig', index=False)
    # 出表
    print("导演排行表")


# 演员均分排行
def person_sort():
    data = pd.read_csv("./data/raw/movies.csv", usecols=["MOVIE_ID", "DOUBAN_SCORE", "ACTORS", "ACTOR_IDS"])
    # 去除NaN项
    clean_data = data.dropna(subset=['ACTOR_IDS', 'ACTORS', 'MOVIE_ID', 'DOUBAN_SCORE'])
    clean_data = clean_data[clean_data['DOUBAN_SCORE'] > 0]  # 豆瓣评分>0
    # 可能有多个演员，先分行，在分列
    d1 = clean_data.ACTOR_IDS.str.split('|', expand=True).stack().str.strip().reset_index(level=1, drop=True)
    d1.name = "ACTOR_ID"
    # 原表删除两个字段
    d2 = clean_data.drop(['ACTOR_IDS', 'ACTORS'], axis=1).join(d1)
    # 分列
    col = d2.ACTOR_ID.str.split(':', expand=True)
    col.columns = ['ACTOR', 'ACTOR_ID']
    # 合并
    d2['ACTOR'] = col.ACTOR
    d2['ACTOR_ID'] = col.ACTOR_ID
    # 去除空值
    d3 = d2[d2.ACTOR_ID != '']
    d3 = d3.dropna(subset=['ACTOR_ID'])
    # 排序
    group = d3.groupby(['ACTOR_ID', 'ACTOR'])
    result = group.DOUBAN_SCORE.mean().sort_values(ascending=False)
    result = result.reset_index()
    result.columns = ['ACTOR_ID', 'ACTOR', 'AVG_SCORE']
    result.to_csv("./data/person_sort.csv", encoding='utf-8-sig', index=False)
    # 出表
    print("演员排行表")


# 电影时长与得分的关系
def movie_duration_score():
    data = pd.read_csv("./data/raw/movies.csv", usecols=["MINS", "DOUBAN_SCORE", 'MOVIE_ID'])
    data2 = data[data.MINS >= 60]
    data2 = data2[data2.MINS <= 360]
    data2 = data2[data2.DOUBAN_SCORE > 0]
    data2.MINS = data2.MINS.apply(lambda x: int(x / 10) * 10)
    data2.MINS = data2.MINS.astype(int)
    group = data2.groupby('MINS')
    cnt = group.MOVIE_ID.agg('count')
    result = group.DOUBAN_SCORE.mean().reset_index()
    result = result.merge(cnt, on='MINS')
    result.columns = ['MINS', 'AVG_SCORE', "COUNT"]
    result = result[result.COUNT > 5]
    result.to_csv("./data/movie_duration_score.csv", encoding="utf_8_sig", index=False)
    print("时长得分表")


# 时间段与评论数量的关系--优化
def duration_comment_num():
    data = pd.read_csv("./data/raw/comments.csv", usecols=['COMMENT_TIME', 'COMMENT_ID'])
    data['COMMENT_TIME'] = pd.to_datetime(data['COMMENT_TIME'])
    time_s = data
    time_s.COMMENT_TIME = data["COMMENT_TIME"].apply(lambda x: x.hour)
    groups = time_s.groupby('COMMENT_TIME')
    time_count = groups['COMMENT_ID'].count().reset_index()
    time_count.columns = ['HOUR', 'COUNT']
    time_count.to_csv("./data/duration_comment_num.csv", encoding="utf_8_sig", index=False)
    # dabiao
    print("时段评论量")


# 各语言电影占比
def movie_language():
    data = pd.read_csv("./data/raw/movies.csv", usecols=['MOVIE_ID', 'LANGUAGES'])
    clean_data = data.dropna(subset=['LANGUAGES'])
    d1 = clean_data.LANGUAGES.str.split('/', expand=True)
    d1 = d1.stack().reset_index(level=1, drop=True).str.strip()
    d1.name = "LANGUAGE"
    d2 = clean_data.drop(['LANGUAGES'], axis=1).join(d1)
    group = d2.groupby('LANGUAGE')
    result = group.MOVIE_ID.count().sort_values(ascending=False)
    result = result.reset_index()
    result.columns = ['LANGUAGE', 'COUNT']
    result.to_csv("./data/movie_language.csv", encoding='utf-8', index=False)
    print("电影占比")


def movie_num_by_year():
    data = pd.read_csv('./data/raw/movies.csv', encoding='utf-8', usecols=['YEAR', 'MOVIE_ID'])
    data.YEAR = data.YEAR.astype(int)
    data2 = data.dropna(subset=['MOVIE_ID', 'YEAR'])
    data2 = data2[(data2.YEAR > 0) & (data2.YEAR < 2020)]
    result = data2.groupby('YEAR').count().reset_index()
    result.columns = ['YEAR', 'COUNT']
    result.to_csv('./data/movie_num_by_year.csv', encoding="utf-8", index=False)
    print("年电影量表")


def init_file():
    learning_data()
    comments_groupby_movie()
    province_actors()
    movie_genres_change()
    directors_sort()
    person_sort()
    movie_duration_score()
    duration_comment_num()
    movie_language()
    movie_num_by_year()
    print("所有文件构造已完成!")


if __name__ == '__main__':
    init_file()
    pass
