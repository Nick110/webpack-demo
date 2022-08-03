/** @format */

import React, { FC, useEffect, useState } from 'react';
import request from '@/utils/fetch';
import Styles from './index.less';
import formatNumber from '@/utils/formatNumber';

interface IProps {
    title: string;
    btnText: string;
    fetchUrl: string;
    limit: number;
}

const recommend: FC<IProps> = (props) => {
  const {
    title, btnText, fetchUrl, limit,
  } = props;

  const [list, setList] = useState<Array<any>>([]);

  const { clientWidth } = document.body;
  const itemWidth = (clientWidth - 70) / 3;

  useEffect(() => {
    request(`${props.fetchUrl}?limit=${props.limit}`, {}, 'GET').then((res) => {
      setList(res.result);
    });
  }, []);

  return (
    <div className={Styles.recommend}>
      <div className={Styles.title}>
        <p>{title}</p>
        <button>{btnText}</button>
      </div>

      <div className={Styles.listWrapper}>
        {list.map((item) => (
          <div className={Styles.item} key={item.id}>
            <div style={{ width: itemWidth, height: itemWidth }} className={Styles.picWrapper}>
              <p className={Styles.playCount}>{formatNumber(item.playCount)}</p>
              <img src={item.picUrl} alt={item.name} />
            </div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default recommend;
