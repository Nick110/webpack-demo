import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Hello from './hello';
import Children from './children';
import BottomMenu from '@/components/BottomMenu';

interface IState {
    count?: number,
    text: string
}

class Home extends React.Component<object, IState> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            text: 'TypeScript'
        }
    }

    updateCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('父组件将要更新');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('父组件更新完');
    }

    render() {
        return (
            <>
                <Link to="/hello">to Hello</Link>
                <Switch>
                    <Route exact path='/hello'>
                        <Hello name="TypeScript" enthusiasmLevel={10} />
                    </Route>
                </Switch>
    
                <div>
                    {this.state.text}
                    <p onClick={this.updateCount}>点我增加</p>
                </div>
                <Children num={this.state.count}/>
                {/* <BottomMenu active={1}/> */}
            </>
        )
    }
}

export default Home;