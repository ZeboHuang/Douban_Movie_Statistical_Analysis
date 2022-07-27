# -*- coding: utf-8 -*-
"""
  File Name：       test
  Description :
  Author :          Nick
  date：            2022/1/25c
  Change Activity:  2022/1/25:
"""

import utils

"""测试utils"""
def test_utils():
    """
     1.
     get_movies_by_year_range
     获取年范围内的电影数据
     是否有正常写入文件,
     success: ./data/movies_year_range.csv
    """
    # utils.get_movies_by_year_from_to(2009, 2019)

    """
    2. def comments_groupby_movie():
    按电影类型分类评论-词云
    success: ./data/comments_groupfy.csv
    """
    # utils.comments_groupby_movie()

    """
    3. def province_actors()
    获取省份-演员数量的关系表
    ./data/province_actors_cnt.json
    """
    # utils.province_actors()
    """
    
    """



if __name__ == '__main__':
    test_utils()

