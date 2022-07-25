# -*- coding: utf-8 -*-
"""
  File Name：       db
  Description :
  Author :          Nick
  date：            2022/1/25
  Change Activity:  2022/1/25:
"""
import json

import pandas as pd
import jieba

import utils

df = pd.read_csv('./data/comments.csv')
stopwords = utils.stopwords_list('./data/stopwords.txt')


def comments_word_cloud():
    """
    影评数据词云图
    :return:列表   [{关键词:出现的数量}]
    """
    # 搜集所有评论
    comments = list(df['评论'])
    # print(len(comments))
    words = []
    # 分词
    for c in comments:
        words_ = jieba.cut(c)
        while True:
            try:
                w = words_.__next__().strip()
                # print(w)
                if w not in stopwords:
                    words.append(w)
            except:
                break
    # end for

    word_frequence = pd.Series(words).value_counts().to_dict()
    with open("./data/wordcloud.json", "w", encoding="utf-8") as fp:
        json.dump(word_frequence, fp, ensure_ascii=False)

    return list(pd.Series(words).value_counts())


def load_comments_word_cloud():
    """封装 关键词与出现次数"""
    json_data = None
    with open("./data/wordcloud.json", "r", encoding="utf-8") as fp:
        json_data = json.load(fp)
    print(json_data)

    pass



if __name__ == '__main__':
    print(comments_word_cloud())
    load_comments_word_cloud()
