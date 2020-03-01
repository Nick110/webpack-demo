import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Hello from './hello';
import Children from './children';
import BottomMenu from '@/components/BottomMenu';
import Home from './home';
import Video from './video';
import My from './my';
import Yuncun from './yuncun';
import Account from './account';

interface IState {
    count?: number,
    text: string
}

class Index extends React.Component<object, IState> {
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

    render() {
        return (
            <>
                {/* <Link to="/hello">to Hello</Link>
                <Switch>
                    <Route exact path='/hello'>
                        <Hello name="TypeScript" enthusiasmLevel={10} />
                    </Route>
                </Switch>
    
                <div>
                    {this.state.text}
                    <p onClick={this.updateCount}>点我增加</p>
                </div>
                <Children num={this.state.count}/> */}
                <Switch>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/video' component={Video}></Route>
                    <Route path='/my' component={My}></Route>
                    <Route path='/yuncun' component={Yuncun}></Route>
                    <Route path='/account' component={Account}></Route>
                </Switch>
                <BottomMenu/>
            </>
        )
    }
}

export default Index;