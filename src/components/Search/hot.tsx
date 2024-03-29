/* eslint-disable react/no-array-index-key */
/** @format */

// 热搜组件
import React, { useState, useEffect } from 'react';
import Styles from './index.less';
import request from '@/utils/fetch';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface hotDetail {
    alg: string;
    content: string;
    iconType: number;
    iconUrl: string;
    score: number;
    searchWord: string;
    source: number;
    url: string;
}

const hot = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [hotList, setHotList] = useState<Array<hotDetail>>([]);

  useEffect(() => {
    request('/search/hot/detail', {}).then((res) => {
      setHotList(res.data);
    });
  }, []);

  const search = (searchWord: string): void => {
    dispatch({
      type: 'CHANGE',
      payload: {
        keywords: searchWord,
      },
    });
    history.push('/home/search');
  };

  return (
    <div className={Styles.hot}>
      <p>热搜榜</p>
      <div className={Styles.hotWrapper}>
        {hotList.map((item, index) => (
          <div
            key={index}
            className={`${Styles.hotItem} ${index < 4 ? Styles.top4 : Styles.grey}`}
            onClick={() => search(item.searchWord)}
          >
            <span>{index + 1}</span>
            <div>
              <p className={Styles.searchWord}>
                <span className={item.iconUrl ? Styles.short : Styles.long}>{item.searchWord}</span>
                {item.iconUrl && <img src={item.iconUrl} />}
              </p>
              <p className={Styles.content}>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default hot;
