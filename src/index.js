import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import { Provider } from "react-redux"
import store from "./redux/store"
import zh_CN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(
    <BrowserRouter>
        <ConfigProvider locale={zh_CN}>
            <Provider store={store}>
                <App />
            </Provider>
        </ConfigProvider>
    </BrowserRouter>,
    document.getElementById('root')
);