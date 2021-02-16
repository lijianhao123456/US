import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import UsSider from "./UsSider/UsSider.jsx";
import MyHeader from "./MyHeader/MyHeader.jsx";
import Community from "../container/Community/Community.jsx";
const { Footer } = Layout;
export default class test extends Component {
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <UsSider />
        <Layout className="site-layout">
          <MyHeader />
          <Switch>
            <Route path="/community/index/:index" component={Community}></Route>
            <Route path="/community/topic" component={Community}></Route>
            <Redirect to="/community/index/0"></Redirect>
          </Switch>
          <Footer style={{ textAlign: "center" }}>
            <div>
              <a
                title="Ncuhomers"
                style={{ color: "rgb(0, 0, 0, 0.45)" }}
                target="_blank"
                href="http://team.ncuos.com/"
              >
                Ncuhomers
              </a>
            </div>
            <div style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 14 }}>
              Copyright©2021南昌大学家园工作室
            </div>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
