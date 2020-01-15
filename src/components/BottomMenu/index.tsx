import React, { SFC } from 'react';
import Styles from './index.less';

interface Item {
    name: string;
    url: string;
    key: number
}

interface IProps {
    active: number;
    items?: Array<Item>;
}

const bottomMenu: SFC<IProps>  = function (props) {
    let {items = [{key: 1, name: '发现', url: '/discover'}, {key: 2, name: '我的', url: '/my'}, {key: 3, name: '云村', url: '/cloud'}, {key: 4, name: '账号', url: '/account'}]} = props;
    
    return (
        <div className={Styles.bottomMenu}>
            {
                items.map((item) => <div key={item.key}>{item.name}</div>)
            }

        </div>
    )
}

export default bottomMenu;