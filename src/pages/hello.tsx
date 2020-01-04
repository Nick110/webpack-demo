import * as React from 'react';
import { SFC } from 'react';
import { MouseEvent } from 'react';

interface IProps {
    name: string;
    enthusiasmLevel: number;
}

// 这里是把泛型参数提前到接口名上
// SFC是个接口
let Hello: SFC<IProps> = function(props) {

    const { name, enthusiasmLevel = 1 } = props;

    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel)}
            </div>
        </div>
    );
}

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

export default Hello;