import React, {FC} from 'react';
import Styles from './index.less';
import {SearchBar} from 'antd-mobile';

interface IProps {
    keyword?: string;
}

const search: FC<IProps> = function() {


    return (
        <div className={Styles.search}>
            <SearchBar
                placeholder="只是太爱你-张敬轩"
                maxLength={15}
            />
        </div>
    )
}

export default search;