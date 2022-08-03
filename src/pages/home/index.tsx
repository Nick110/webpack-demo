/** @format */

import React, { FC, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import request from '@/utils/fetch';
import Styles from './index.less';
import { Carousel, SearchBar } from 'antd-mobile';
import Search from '@/components/Search';
import HomeTab from '@/components/HomeTab';
import Recommend from '@/components/Recommend';
import SearchResult from '@/pages/searchResult';

interface IProps {
    active?: number;
}

const Main: FC<IProps> = (props) => {
  const [banners, setBanners] = useState([]);

  const tabData = [
    {
      key: 1,
      name: '每日推荐',
      icon: 'everyday',
    },
    {
      key: 2,
      name: '歌单',
      icon: 'songlist',
    },
    {
      key: 3,
      name: '排行榜',
      icon: 'paihangbang',
    },
    {
      key: 4,
      name: '电台',
      icon: 'radio',
    },
    {
      key: 5,
      name: '直播',
      icon: 'live',
    },
  ];

  useEffect(() => {
    request('/banner', { type: 2 }).then((res) => {
      setBanners(res.banners);
    });
  }, []);

  return (
    <div className={Styles.home}>
      <Search />
      <div className={Styles.pageWrapper}>
        <div className={Styles.red} />
        <Carousel autoplay infinite dots dotActiveStyle={{ backgroundColor: '#c20c0c' }}>
          {banners.map((item, index) => (
            <img src={item.imageUrl} key={item.targetId} />
          ))}
        </Carousel>

        <HomeTab data={tabData} />

        <p className={Styles.moduleTitle}>推荐歌单</p>
        <Recommend title="你的歌单精选站" btnText="查看更多" fetchUrl="/personalized" limit={6} />
      </div>
    </div>
  );
};

const Home = (props) => (
  <Switch>
    <Route path="/home/search" component={SearchResult} />
    <Route path="/home" exact component={Main} />
  </Switch>
);

export default Home;
