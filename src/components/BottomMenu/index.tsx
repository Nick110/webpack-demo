import React, { useState, FC } from 'react';
import Styles from './index.less';
import { Link, useHistory } from 'react-router-dom';

interface Item {
  name: string;
  url: string;
  icon: string;
  key: number;
}

interface IProps {
  items?: Array<Item>;
}

const bottomMenu: FC<IProps> = (props) => {
  const {
    items = [
      {
        key: 1,
        name: '发现',
        icon: 'discover',
        url: '/home',
      },
      {
        key: 2,
        name: '视频',
        icon: 'video',
        url: '/video',
      },
      {
        key: 3,
        name: '我的',
        icon: 'my',
        url: '/my',
      },
      {
        key: 4,
        name: '云村',
        icon: 'yuncun',
        url: '/yuncun',
      },
      {
        key: 5,
        name: '账号',
        icon: 'account',
        url: '/account',
      },
    ],
  } = props;

  const history = useHistory();

  return (
    <div className={Styles.bottomMenu}>
      {items.map((item) => (
        <Link
          key={item.key}
          to={item.url}
          className={history.location.pathname.indexOf(item.url) !== -1 ? Styles.active : ''}
        >
          <i className={`iconfont icon-${item.icon}`} />
          <br />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default bottomMenu;
