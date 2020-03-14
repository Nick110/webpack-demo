import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { SearchBar } from 'antd-mobile';

const searchResult = () => {

    // 使用useSelector获取redux值
    const keywords = useSelector(state => state.homeReducer.keywords);
    const dispatch = useDispatch();

    return (
        <div>
            <SearchBar showCancelButton/>
            <div>{keywords}</div>
        </div>
    )
}

export default searchResult;