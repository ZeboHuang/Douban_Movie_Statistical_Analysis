# -*- coding: utf-8 -*-
"""
  File Name：       test
  Description :
  Author :          Nick
  date：            2022/1/25c
  Change Activity:  2022/1/25:
"""

import csv
import traceback

import requests as req
from lxml import etree


class HousePriceHanYang(object):
    def __init__(self):

        self.url = "https://wh.fang.anjuke.com/loupan/hanyang/p{}/"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
            'cookie': 'isp=true; aQQ_ajkguid=85302A87-92FB-2A51-E55E-SX0125114714; id58=CpQDXWHvcsNz/7nCjX7jAg==; isp=true; id58=CpQDXWHvcsNz/7nCjX8LAg==; 58tj_uuid=8623709a-8a13-47b2-b151-60196944b68f; new_uv=1; init_refer=; als=0; wmda_new_uuid=1; wmda_uuid=4932003244455325bb1608db67770be4; wmda_session_id_8788302075828=1643082434113-df15e2ee-8831-2ada; wmda_visited_projects=%3B8788302075828; sessid=437D4D26-C1FC-C75C-2F44-SX0125121425; ctid=22; obtain_by=2; twe=2; new_session=0; xxzl_cid=a337b4196d2b4b01a99848432f93740c; xzuid=2b04cacf-9630-45c3-b990-de443c11367b; ajk_member_verify=XFPkYRXGh4B2rMGPq1PzxmH3RB%2BwKAqcy7mreGJvK5Q%3D; ajk_member_verify2=MjQwNDM2MDQ2fE9oSnYzNTl8MQ%3D%3D; ajk_member_id=240436046; ajkAuthTicket=TT=0d257a441b54745552a5dbf4d2eda57b&TS=1643084203928&PBODY=hzO6T8OjQIsqLrc3fSC5FgufCJna-8hEnKsL6zz8LaHWntLBRIqSi5O3GwJxdEvmkCenri-0D7SxF0zNTcS06Dvs2OQDWdkBjBKMrx11-J91JPIm7UXRxrj8h9u5eOJUTaRCxr_Jkd5d2KFXIWHt4F7EIU9l1BbtvzdbzTCtu3o&VER=2&CUID=zuiTKtepM7xI2nzbt9vcvRFWXp57TMBP'
        }

    # 爬取数据
    def crawl(self, page_num):
        resp = req.get(self.url.format(page_num), headers=self.headers)
        html = resp.content.decode("utf-8")
        return html

    def parse(self, html):
        """
        解析crawl方法爬取的html字符串
        :param html: html字符串
        :return: 列表，其中元素是每个楼盘的信息
        """
        root = etree.HTML(html)
        # house = root.xpath('//*[@id="container"]/div[2]/div[1]')
        # /html/body/div[2]/div[2]/div[1]/div[4]
        print(etree.tostring(root))
        house = root.xpath('//*[@id="container"]/div[2]/div[1]/div[4]/div')
        print(house)
        information = [['楼盘名称', '地址', '户型', '建筑面积', '均价']]
        for c in house:
            try:
                name = c.xpath(r'./div/a[1]/span/text()')
                # if len(c.xpath(r'./div[@data-resource_id]')) <= 0:
                #
                # else:

                # name = c.xpath("./div/a[1]/span/text()")[0].strip()  # 楼盘名称
                # address = c.xpath("./div/a[2]/span/text()")[0].strip()  # 地址
                # style = c.xpath("./div/a[3]/span/text()")[0].strip()  # 户型
                # area = c.xpath("./div/a/span[@class='building-area']/text()")[0].strip()  # 建筑面积
                # price = c.xpath("./a/p/span/text()")[0].strip()  # 均价
                # information.append([name, address, style, area, price])
                print(name)
            except:
                print("dddd")
                continue
        return information


    def save_2_csv(self, list_):
        with open(r"./data/HousePriceHanYang.csv", 'a', encoding="utf-8") as fd:
            writer = csv.writer(fd)
            writer.writerows(list_)


# class FengLiuXingTest(object):



def main():
    spider = HousePriceHanYang()
    content = spider.crawl()
    information = spider.parse(content)
    spider.save_2_csv(information)


if __name__ == '__main__':
    main()

