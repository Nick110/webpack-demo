import * as React from 'react';
import { useState, useEffect, SFC, MouseEvent } from 'react';
import {request} from '@/utils/fetch';

interface IProps {
    name: string;
    enthusiasmLevel: number;
}

// 这里是把泛型参数提前到接口名上
// SFC是个接口
let Hello: SFC<IProps> = function (props) {

    const { name, enthusiasmLevel = 1 } = props;
    let [count, setCount] = useState({});

    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }

    useEffect(() => {
        request('/artist/list', {}).then(res => {
            console.log(res)
        })
    });

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel)}，我是Hello
            </div>
        </div>
    );
}

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

export default Hello;