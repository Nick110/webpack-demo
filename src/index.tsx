import * as React from "react";
import * as ReactDom from "react-dom";
import {HashRouter, BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store/store';
import Routes from './Routes';
import './reset.less';

ReactDom.render(
    <Provider store={store}>        
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("app") as HTMLElement
);
