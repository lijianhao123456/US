import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import UsSider from "./components/UsSider/UsSider.jsx";
import MyHeader from "./components/MyHeader/MyHeader.jsx";
import Community from "./container/Community/Community.jsx";
import Topic from "./container/Topic/Topic.jsx"
import { connect } from "react-redux"
import { toggleCollapse } from "./redux/action"
class App extends Component {
  render() {
    const { collapsed } = this.props
    const { toggleCollapse } = this.props
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <UsSider toggleCollapse={toggleCollapse} collapsed={collapsed} />
        <Layout className="site-layout">
          <MyHeader collapsed={collapsed} toggleCollapse={toggleCollapse} />
          <Switch>
            <Route path="/community/index" component={Community}></Route>
            <Route path="/community/topic" component={Topic}></Route>
            <Redirect to="/community/index/0"></Redirect>
          </Switch>
        </Layout>
      </Layout>
    );
  }
}
export default connect(
  (state) => ({
    collapsed: state.Global,
  }),
  { toggleCollapse }
)(App);
