import json
import random

import pandas as pd
import numpy as np
import pandas as pd
import jieba
from sklearn.metrics import mean_squared_error
from PIL import Image
from wordcloud import wordcloud
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.linear_model import LinearRegression, SGDRegressor

import utils


class ScorePrediction(object):
    """预测豆瓣评分"""

    def __init__(self):
        source = pd.read_csv('./data/learning_data.csv')
        self.data = np.array(source.drop(['DOUBAN_SCORE', 'MOVIE_ID'], axis=1))  # 特征
        self.target = np.array(source.DOUBAN_SCORE)  # 标签
        # x代表特征，y代表标签，train代表训练集，test代表测试（验证集）  75%训练
        self.x_train, self.x_test, self.y_train, self.y_test = train_test_split(self.data, self.target, test_size=0.25,
                                                                                random_state=13)
        self.equation = None

    # noinspection PyAttributeOutsideInit
    def to_standard_scale(self):
        """
        特征方程标准化
        对特征进行缩放
        :return:
        """
        self.std_x = StandardScaler()
        self.std_y = StandardScaler()
        self.x_train_t = self.std_x.fit_transform(self.x_train)
        self.x_test_t = self.std_x.fit_transform(self.x_test)
        self.y_train = self.std_y.fit_transform(self.y_train.reshape(-1, 1))
        self.y_test_t = self.std_y.transform(self.y_test.reshape(-1, 1))

    # noinspection PyAttributeOutsideInit
    def to_fit_linear_regression(self):
        """
        进行线性回归数据拟合
        """
        self.to_standard_scale()
        self.equation = LinearRegression()  # 綫性回歸
        self.equation.fit(self.x_train_t, self.y_train)
        self.theta = self.equation.coef_

    def predict(self, x_arr):
        """
        根据特征进行预测标签值
        :param x_arr: 传入一个未经特征变换的numpy数组
        :return: 然会未经变换的目标值
        """
        if self.equation is None:
            self.to_fit_linear_regression()

        return self.std_y.inverse_transform(
            self.equation.predict(self.std_x.fit_transform(x_arr)))

    def score(self):
        """
        该机器学习的评分
        :return: 返回该算法得分
        """
        return self.equation.score(self.std_x.fit_transform(self.x_test),
                                   self.std_y.fit_transform(self.y_test.reshape(-1, 1)))

    def mean_squared_error(self):
        """
        均方误差
        :return:
        """
        return mean_squared_error(self.y_test, self.predict(self.x_test))  # 模型的均方误差


class WordCloud(object):
    movie_list = ["1292052", "1295644", "1292064", "1291841", "1307914"]
    stopwords = utils.stopwords_list('./data/stopwords.txt')

    def __init__(self):
        self.file_path = './data/comments_groupfy.csv'
        self.mask_path = "./static/img/wordcloud_template/{}.png"
        self.wordcloud_path = "./static/cache/wordcloud.png"

    def read_comments(self, movie_id):
        # reader = pd.read_csv(self.path, chunksize=1000)
        reader = pd.read_csv(self.file_path, index_col=0, dtype={'MOVIE_ID': str})
        try:
            comments = "".join(list(reader.loc[movie_id].CONTENT))
        except Exception as e:
            print(e)
            comments = "".join(list(reader.sample().CONTENT))
        return comments

    def generate_wordcloud(self, movie_id=None):
        if movie_id is None:
            movie_id = random.sample(WordCloud.movie_list, 1)[0]
        comments = self.read_comments(movie_id)  # 获取影评内容

        print(comments)
        # img = Image.open(self.mask_path.format('1307914'))

        if movie_id in self.movie_list:
            img = Image.open(self.mask_path.format(movie_id))
        else:
            img = Image.open(self.mask_path.format('default'))

        wordCloud = wordcloud.WordCloud(
            font_path="C:/Windows/Fonts/msyh.ttc",
            width=800,  # 词云的高度
            height=400,  # 词云的宽度
            mask=np.array(img),
            contour_width=1,
            contour_color='steelblue',
            background_color="white",
            stopwords=WordCloud.stopwords
        ).generate(" ".join(jieba.cut(comments)))  # jieba.cut(finalComment)) :把影评的字符串切割成词语  generate：把词语组成词云
        # 生成词云文件
        wordCloud.to_file(self.wordcloud_path)


word_cloud = WordCloud()
score_prediction = ScorePrediction()


def get_word_cloud():
    return word_cloud


def get_score_prediction():
    return score_prediction


def refresh_word_cloud():
    word_cloud.generate_wordcloud()


def get_china_actors():
    with open("./data/province_actors_cnt.json", encoding='utf-8') as fp:
        dict_ = json.load(fp)
    return dict_


if __name__ == '__main__':
    # refresh_word_cloud()
    print(get_china_actors())
    pass
