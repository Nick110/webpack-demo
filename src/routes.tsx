import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
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
        noExact: true,
        component: Loadable({
            // import里的注释是给打包的文件命名，chunkFilename
            loader: () => import(/* webpackChunkName: "index" */ './pages/index'),
            loading: MyLoadingComponent
        })
    },
    // {
    //     path: '/hello',
    //     component: Loadable({
    //         loader: () => import(/* webpackChunkName: "hello" */ './pages/hello'),
    //         loading: MyLoadingComponent
    //     })
    // },
]


export default function Routes() {
    return (
        <Switch>
            {
                routes.map(route => {
                    return <Route key={route.path} path={route.path} component={route.component}></Route>
                })
            }
            {/* <Route exact path='/' component={Home} /> */}
        </Switch>
    );
}