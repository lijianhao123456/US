import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import CommunityIndex from "./container/CommunityIndex"
import renderRoutes from './utils/renderRoutes';
import routes from './router/router'


export default class App extends Component {
    render() {
        const token = localStorage.getItem("token")
        console.log(token);
        const authed = token ? true : false
        const authPath = '/user/login' // 默认未登录的时候返回的页面
        return (
            <div>
                {renderRoutes(routes, authed, authPath)}
            </div>
        )
    }
}
