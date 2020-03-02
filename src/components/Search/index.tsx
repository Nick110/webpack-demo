import React, {FC, useEffect, useState} from 'react';
import Styles from './index.less';
import {SearchBar} from 'antd-mobile';
import {request} from '@/utils/fetch';
import { useSelector, useDispatch } from "react-redux";

interface IProps {
    keyword?: string;
}

const search: FC<IProps> = function(props) {

    const getSearchResult = async (keywords: string) => {
        const result = await request(`/search?keywords=${keywords}`, {});
        return result;
    }

    const [result, setResult] = useState([]);
    const [defaultKeywords, setDefaultKeywords] = useState<string>('');

    const getDefaultKeywords = async () => {
        const res = await request('/search/default', {});
        setDefaultKeywords(res.data.realkeyword);
    }

    useEffect(() => {
        getDefaultKeywords();
    }, [])

    // 使用useSelector获取redux值
    const keywords = useSelector(state => state.homeReducer.keywords);

    const dispatch = useDispatch();
    const submit = (val: string) => {
        dispatch({type: 'CHANGE', payload: {keywords: val}})
    }

    return (
        <div className={Styles.search}>
            <SearchBar
                placeholder={defaultKeywords}
                maxLength={15}
                onSubmit={submit}
            />

            {/* <div>{keywords}</div> */}
        </div>
    )
}

export default search;