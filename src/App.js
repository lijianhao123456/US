import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux"

import UsSider from "./components/UsSider/UsSider.jsx";
import Community from "./container/Community/Community.jsx";
import Topic from "./container/Topic/Topic.jsx"
import Post from "./container/Post/Post.jsx";

import { toggleCollapse, getMyInfo, initCollapse } from "./redux/action"


class App extends Component {
  componentDidMount() {
    const { initCollapse } = this.props
    window.innerWidth > "992" ? initCollapse(true) : initCollapse(false)
  }
  render() {
    const { collapsed } = this.props.info
    const { toggleCollapse } = this.props
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <UsSider toggleCollapse={toggleCollapse} collapsed={collapsed} />
        <Layout className="site-layout">
          <Switch>
            <Route path="/community/index" component={Community}></Route>
            <Route path="/community/topic" component={Topic}></Route>
            <Route path="/community/post" component={Post}></Route>
            <Redirect to="/community/index"></Redirect>
          </Switch>
        </Layout>
      </Layout>
    );
  }
}
export default connect(
  (state) => ({
    info: state.Global,
  }),
  { toggleCollapse, getMyInfo, initCollapse }
)(App);
