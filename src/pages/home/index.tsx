import React, { FC, useEffect, useState } from 'react';
import { request } from '@/utils/fetch';
import Styles from './index.less';
import {Carousel, SearchBar} from 'antd-mobile';
import Search from '@/components/Search';
import HomeTab from '@/components/HomeTab';
import Recommend from '@/components/Recommend';

interface IProps {
    active?: number;
}

const home: FC<IProps> = function (props) {

    const [banners, setBanners] = useState([]);

    const tabData = [
        {
            key: 1,
            name: '每日推荐',
            icon: 'everyday'
        },
        {
            key: 2,
            name: '歌单',
            icon: 'songlist'
        },
        {
            key: 3,
            name: '排行榜',
            icon: 'paihangbang'
        },
        {
            key: 4,
            name: '电台',
            icon: 'radio'
        },
        {
            key: 5,
            name: '直播',
            icon: 'live'
        }
    ]

    useEffect(() => {
        request('/banner', {type: 2}).then(res => {
            setBanners(res.banners)
        })
    }, [])

    return (
        <div className={Styles.home}>
            <Search/>
            <div className={Styles.bannerWrapper}>
                <div className={Styles.red}></div>
                <Carousel
                    autoplay={true}
                    infinite
                    dots={true}
                    dotActiveStyle={{backgroundColor: '#c20c0c'}}
                >
                    {
                        banners.map((item, index) => <img src={item.imageUrl} key={item.targetId}></img>)
                    }
                </Carousel>

                <HomeTab data={tabData}/>

                <Recommend title={'为您精挑细选'} btnText={'查看更多'} fetchUrl={'/personalized'} limit={6}/>
            </div>
            
        </div>
    )


}

export default home;