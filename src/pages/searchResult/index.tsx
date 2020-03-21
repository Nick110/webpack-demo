import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { SearchBar, Tabs } from 'antd-mobile';
import {request} from '@/utils/fetch';
import SongList from '@/components/SongList';
import Styles from './index.less';

const tabs = [
    {
        title: '综合',
    },
    {
        title: '单曲'
    },
    {
        title: '云村'
    },
    {
        title: '歌单'
    },
    {
        title: '歌手'
    }
]
const searchResult = () => {

    // 使用useSelector获取redux值
    const keywords = useSelector(state => state.homeReducer.keywords);
    const {songs} = useSelector(state => state.homeReducer.searchResult);
    const dispatch = useDispatch();

    // const search = async (keywords: string, type: number = 1, offset: number = 0, limit: number = 30): Promise<void> => {
    //     const url = `/search?keywords=${keywords}&type=${type}&offset=${offset}&limit=${limit}`;
    //     const res = await request(url, {});
    //     if(res.code === 200) {
    //         dispatch({
    //             type: 'CHANGE_SEARCH_RESULT',
    //             payload: {songs: res.result.songs}
    //         })
    //     }
    // }

    useEffect(() => {
        dispatch({
            type: 'SEARCH',
            payload: {
                keywords
            }
        })
    }, [])

    console.log(songs);

    return (
        <div className={Styles.searchResult}>
            {/* <SearchBar showCancelButton/> */}
            <Tabs 
                tabs={tabs} 
                renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
                tabBarUnderlineStyle={{borderColor: '#c20c0c'}}
                tabBarActiveTextColor={'#c20c0c'}
            >
                <div className={Styles.single}>
                    <p>播放全部</p>
                    <SongList list={songs}/>
                </div>
                
            </Tabs>
            
        </div>
    )
}

export default searchResult;