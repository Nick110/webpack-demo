import React, {useState, SFC } from 'react';
import Styles from './index.less';

interface Item {
    name: string;
    url: string;
    icon: string;
    key: number
}

interface IProps {
    active: number;
    items?: Array<Item>;
}

const bottomMenu: SFC<IProps>  = function (props) {
    let {active, items = [
        {key: 1, name: '发现', icon: 'discover', url: '/discover'}, 
        {key: 2, name: '视频', icon: 'video', url: '/video'}, 
        {key: 3, name: '我的', icon: 'my', url: '/my'}, 
        {key: 4, name: '云村', icon: 'yuncun', url: '/cloud'}, 
        {key: 5, name: '账号', icon: 'account', url: '/account'}
    ]} = props;

    const [nowActive, setActive] = useState(active);

    const activeChange = (key: number) => {
        setActive(key);
    }
    
    return (
        <div className={Styles.bottomMenu}>
            {
                items.map((item) => <div key={item.key} className={nowActive === item.key ? Styles.active : ''} onClick={() => activeChange(item.key)}>
                    <i className={`iconfont icon-${item.icon}`}></i>
                    <br/>
                    <span>{item.name}</span>
                </div>)
            }

        </div>
    )
}

export default bottomMenu;