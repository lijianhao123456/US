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
  render() {
    const { toggleCollapse } = this.props;
    const { collapsed } = this.props.collapsed;
    return (
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div
          className="fold-icon"
          onClick={() => {
            toggleCollapse();
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
