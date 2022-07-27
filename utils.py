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


# 获取导演列表
def director_list():
    pd.read_csv("./data/movies.csv", usecols=['DIRECTOR_IDS', 'DIRECTOR', 'DOUBAN_SCORE', 'DOUBAN_VOTES'])


# 数据集中去除一些不符合要求的记录
def clean_database(filepath):
    data = pd.read_csv(filepath)
    data[data['DOUBAN_SCORE'] == 0].count()


def learning_data():
    """獲取機器學習的數據集"""
    pass


def comments_groupby_movie():
    """按电影类型分类评论"""
    data = pd.read_csv('./data/comments.csv', usecols=['MOVIE_ID', 'CONTENT'])
    group = data.groupby(['MOVIE_ID'])
    result = group.sum().reset_index().set_index('MOVIE_ID')
    result.to_csv("./data/comments_groupfy.csv", encoding='utf-8')
    print("分类完成")

#此方法没有用到
def word_cloud_template_list():
    lst = ['肖申克的救赎', '阿甘正传', '这个杀手不太冷', '楚门的世界', '教父']
    data = pd.read_csv('./data/movies.csv', usecols=['MOVIE_ID', 'NAME'], index_col=0)
    dict_ = {}
    for m in lst:
        t = data[data.NAME.str.contains(m)]
        if not t.empty:
            d1 = t.to_dict()
            dict_.update(d1['NAME'])

    print(dict_)
    with open("./data/movieid_name_dict.json", 'w', encoding='utf-8') as fp:
        json.dump(dict_, fp, ensure_ascii=False)

#中国演员json表，未使用
def actor_china_json():
    data = pd.read_csv('./data/person.csv',
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
    data = pd.read_csv('./data/person.csv', usecols=['PERSON_ID', "NAME", 'SEX', 'BIRTH', 'BIRTHPLACE', 'PROFESSION'])

    # 获取国内演员
    data = data.dropna(subset=['BIRTHPLACE'])
    data2 = data[data['BIRTHPLACE'].str.contains('香港|澳门|中国|台湾')]  # 获取国内演员
    place = data2.BIRTHPLACE.str.split(',', expand=True)
    data3 = data2.drop(['BIRTHPLACE'], axis=1).join(place[0]).join(place[1])
    data3.columns = ['PERSON_ID', 'NAME', 'SEX', 'BIRTH', 'PROFESSION', 'REGION_1', 'REGION_2']
    data4 = data3.groupby('REGION_2')
    data4.PERSON_ID.count().sort_values(ascending=False).to_json('./data/province_actors_cnt.json', force_ascii=False)





def language_movies():
    """按语言分类数据集提取"""
    data = pd.read_csv("./data/movies.csv", usecols=['MOVIE_ID', 'LANGUAGES'])
    clean_data = data.dropna(subset=['LANGUAGES'])
    d1 = clean_data.LANGUAGES.str.split('/', expand=True)
    d1 = d1.stack().reset_index(level=1, drop=True).str.strip()
    d1.name = "LANGUAGE"
    d2 = clean_data.drop(['LANGUAGES'], axis=1).join(d1)
    group = d2.groupby('LANGUAGE')
    result = group.MOVIE_ID.count().sort_values(ascending=False)
    result.to_json('./data/language_movie.json', force_ascii=False)

if __name__ == '__main__':
    # stopwords_list = stopwords_list('./data/stopwords.txt')
    # print(stopwords_list)
    # comments_groupby_movie()
    # word_cloud_template_list()

    province_actors()
    # language_movies()

