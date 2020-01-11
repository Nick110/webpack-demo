import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Home from './pages/home';
import Loadable from 'react-loadable';


const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return null;
    }
    if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    return null;
};


const routes = [
    {
        path: '/',
        component: Loadable({
            // import里的注释是给打包的文件命名，chunkFilename
            loader: () => import(/* webpackChunkName: "home" */ './pages/home'),
            loading: MyLoadingComponent
        })
    }
]


export default function Routes() {
    return (
        <Switch>
            {
                routes.map(route => {
                    return <Route key={route.path} exact path={route.path} component={route.component}></Route>
                })
            }
            {/* <Route exact path='/' component={Home} /> */}
        </Switch>
    );
}