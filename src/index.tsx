/** @format */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter, BrowserRouter, withRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '@/store/store';
import Routes from './routes';
import './reset.less';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app') as HTMLElement,
);
