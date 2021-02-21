import React, { Component } from 'react'
import { connect } from "react-redux"
import renderRoutes from './utils/renderRoutes';
import routes from './router/router'


class App extends Component {
    render() {
        const token = localStorage.getItem("token")
        const authed = token ? true : false
        const authPath = '/user/login' // 默认未登录的时候返回的页面
        return (
            <div>
                {renderRoutes(routes, authed, authPath)}
            </div>
        )
    }
}
export default connect(
    (state) => ({
        info: state.Global,
    }),
    {}
)(App);
