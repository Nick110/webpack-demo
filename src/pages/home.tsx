import * as React from 'react';
import Hello from './hello';

interface IState {
    count?: number,
    text: string
}

class Home extends React.Component<object, IState> {
    constructor(props) {
        super(props);
        this.state = {
            text: 'TypeScript'
        }
    }

    render() {
        return (
            <>
                <Hello name="TypeScript" enthusiasmLevel={10} />
                <div>{this.state.text}</div>
            </>
        )
    }
}

export default Home;