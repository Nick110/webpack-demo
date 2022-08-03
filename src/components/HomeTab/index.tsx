/** @format */

import React, { FC } from 'react';
import Styles from './index.less';

interface TabItem {
    key: number;
    name: string;
    icon: string;
}

interface IProps {
    data: Array<TabItem>;
}

const homeTab: FC<IProps> = (props) => {
  const { data } = props;
  return (
    <div className={Styles.homeTab}>
      {data.map((item) => (
        <div className={Styles.tabItem} key={item.key}>
          <div className={Styles.iconWrapper}>
            <i className={`iconfont icon-${item.icon}`} />
          </div>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default homeTab;
