import React, { Component } from "react";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";
import { FormOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import "./UsSider.less";
import US from "../../assets/icon/logo.svg";
const { Sider } = Layout;
const { SubMenu } = Menu;
export default class UsSider extends Component {
  render() {
    const { toggleCollapse, collapsed } = this.props;
    console.log(this.props);
    return (
      <Sider
        onBreakpoint={() => {
          toggleCollapse();
        }}
        breakpoint="lg"
        collapsed={collapsed}
        width="256"
        theme="light"
      >
        <div className="logo">
          <Link to="/">
            <img src={US} className="us-icon"></img>
            {!collapsed && <h1>For Ncuhomers</h1>}
          </Link>
        </div>
        <Menu
          style={{ paddingTop: "16px", paddingBottom: "16px" }}
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            家园圈子
          </Menu.Item>
          <Menu.Item key="2" icon={<FormOutlined />}>
            通讯录
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="黑匣子">
            <Menu.Item key="3">签到</Menu.Item>
            <Menu.Item key="4">工作量填写</Menu.Item>
            <Menu.Item key="5">组内互评</Menu.Item>
            <Menu.Item key="6">每月之星</Menu.Item>
            <Menu.Item key="7">投票</Menu.Item>
            <Menu.Item key="8">无课统计</Menu.Item>
            <Menu.Item key="9">反馈与建议</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
