import React, { FC, useEffect, useState } from 'react';
import { request } from '@/utils/fetch';
import Styles from './index.less';
import {Carousel, SearchBar} from 'antd-mobile';
import Search from '@/components/Search';

interface IProps {
    active?: number;
}

const home: FC<IProps> = function (props) {

    const [banners, setBanners] = useState([])

    useEffect(() => {
        request('/banner', {type: 2}).then(res => {
            setBanners(res.banners)
        })
    }, [])

    return (
        <div>
            <Search/>
            <Carousel
                autoplay={true}
                infinite
                dots={true}
            >
                {
                    banners.map((item, index) => <img src={item.imageUrl} key={item.targetId}></img>)
                }
            </Carousel>
        </div>
    )


}

export default home;