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
    exact: true,
    component: Loadable({
      // import里的注释是给打包的文件命名，chunkFilename
      loader: () => import(/* webpackChunkName: "index" */ './pages/index'),
      loading: MyLoadingComponent,
    }),
  },
];

function Routes() {
  return (
    <Switch>
      {routes.map((route) => <Route key={route.path} path={route.path} component={route.component} />)}
    </Switch>
  );
}

export default Routes;
