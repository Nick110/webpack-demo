import React, {FC, useEffect, useState} from 'react';
import {request} from '@/utils/fetch';


interface IProps {
    title: string;
    btnText: string;
    fetchUrl: string;
    limit: number;
}

const recommend: FC<IProps> = (props) => {

    const [list, setList] = useState<Array<any>>([]);

    useEffect(() => {
        request(`${props.fetchUrl}?limit=${props.limit}`, {}, 'GET').then(res => {
            setList(res.result);
        })
    }, [])

    return (
        <div></div>
    )
}

export default recommend;