import * as React from "react";
import * as ReactDom from "react-dom";
import {HashRouter} from 'react-router-dom';
import App from "./app";
import Routes from './Routes';

ReactDom.render(
    <HashRouter>
        <Routes/>
    </HashRouter>,
    document.getElementById("app") as HTMLElement
);
