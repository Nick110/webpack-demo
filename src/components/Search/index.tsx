import React, {FC, useEffect, useState} from 'react';
import Styles from './index.less';
import {SearchBar} from 'antd-mobile';
import {request} from '@/utils/fetch';
import { useSelector, useDispatch } from "react-redux";
import Hot from './hot';
interface IProps {
    keyword?: string;
}

const search: FC<IProps> = function(props) {

     // 使用useSelector获取redux值
     const keywords = useSelector(state => state.homeReducer.keywords);

     const dispatch = useDispatch();

    const [defaultKeywords, setDefaultKeywords] = useState<string>('');
    const [hotSearch, setHotSearch] = useState<boolean>(false);

    useEffect(() => {
        getDefaultKeywords();
    }, [])

   
    const getDefaultKeywords = async () => {
        const res = await request('/search/default', {});
        setDefaultKeywords(res.data.realkeyword);
    }

    const getSearchResult = async (keywords: string) => {
        const result = await request(`/search?keywords=${keywords}`, {});
        return result;
    }

    const submit = (): void => {
        if(keywords == '') {
            dispatch({type: 'CHANGE', payload: {keywords: defaultKeywords}});
        }
        getSearchResult(defaultKeywords);
    }

    const toggleHot = (visible: boolean): void => {
        setHotSearch(visible);
        if(!visible) {
            dispatch({type: 'CHANGE', payload: {keywords: ''}});
        }
    }

    const handleChange = (val: string): void => {
        dispatch({type: 'CHANGE', payload: {keywords: val}});
    }

    return (
        <div className={Styles.search}>
            <SearchBar
                placeholder={defaultKeywords}
                maxLength={15}
                onSubmit={submit}
                onFocus={() => toggleHot(true)}
                onCancel={() => toggleHot(false)}
                value={keywords}
                onChange={handleChange}
            />
            {
                hotSearch ? <Hot/> : null
            }
        </div>
    )
}

export default search;