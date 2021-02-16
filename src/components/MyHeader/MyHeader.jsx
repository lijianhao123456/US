import React, { Component } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import "./MyHeader.less";
const { Header } = Layout;
export default class MyHeader extends Component {
  state = {
    collapsed: true,
  };
  toggle = (collapsed) => {
    this.setState({ collapsed: !collapsed });
  };
  render() {
    const {collapsed} = this.state;
    return (
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div
          className="fold-icon"
          onClick={() => {
            this.toggle(this.state.collapsed);
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className="notice-icon">
          <BellOutlined />
        </div>
        <div className="notice-icon">
          <BellOutlined />
        </div>
      </Header>
    );
  }
}
