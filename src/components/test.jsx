import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import UsSider from "./UsSider/UsSider.jsx";
import MyHeader from "./MyHeader/MyHeader.jsx";
import Community from "../container/Community/Community.jsx";
import Topic from "../container/Topic/Topic.jsx"
const { Footer } = Layout;
export default class test extends Component {
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <UsSider />
        <Layout className="site-layout">
          <MyHeader />
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
