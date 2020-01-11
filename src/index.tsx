import * as React from "react";
import * as ReactDom from "react-dom";
import {HashRouter, BrowserRouter} from 'react-router-dom';
import App from "./app";
import Routes from './Routes';

ReactDom.render(
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>,
    document.getElementById("app") as HTMLElement
);
