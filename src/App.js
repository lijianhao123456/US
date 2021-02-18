import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import UsSider from "./components/UsSider/UsSider.jsx";
import MyHeader from "./components/MyHeader/MyHeader.jsx";
import Community from "./container/Community/Community.jsx";
import Topic from "./container/Topic/Topic.jsx"
import { connect } from "react-redux"
import { toggleCollapse, getMyInfo } from "./redux/action"
class App extends Component {
  render() {
    const { collapsed, myInfo } = this.props.info
    const { toggleCollapse, getMyInfo } = this.props
    console.log(collapsed);
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <UsSider toggleCollapse={toggleCollapse} collapsed={collapsed} />
        <Layout className="site-layout">
          <MyHeader getMyInfo={getMyInfo} myInfo={myInfo} collapsed={collapsed} toggleCollapse={toggleCollapse} />
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
    info: state.Global,
  }),
  { toggleCollapse, getMyInfo }
)(App);
