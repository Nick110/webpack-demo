/** @format */

import * as React from 'react';
import {useState, useEffect, FC, MouseEvent} from 'react';
import {request} from '@/utils/fetch';
import {connect, useSelector, useDispatch} from 'react-redux';

interface IProps {
    name: string;
    enthusiasmLevel: number;
}

// 这里是把泛型参数提前到接口名上
// FC是个接口
let Hello: FC<IProps> = function (props) {
    const {name, enthusiasmLevel = 1} = props;
    let [count, setCount] = useState(0);
    let [list, setList] = useState([]);

    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }

    useEffect(() => {
        request('/artist/list', {}).then(res => {
            console.log(res);
        });
    }, [list]);

    // 使用useSelector获取redux值
    const test = useSelector((state: any) => state.todoReducer.test);

    function click(event: MouseEvent) {
        setCount(count + 1);
    }

    const dispatch = useDispatch();
    function change(event: MouseEvent) {
        console.log('点击');
        dispatch({type: 'ADD', payload: {test: '变'}});
    }

    return (
        <div className="hello">
            <div className="greeting">Hello {name + getExclamationMarks(enthusiasmLevel)}，我是Hello</div>

            <button onClick={click}>我是按钮</button>
            <hr />
            <p>{test}</p>
            <button onClick={change}>变</button>
        </div>
    );
};

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

export default Hello;
