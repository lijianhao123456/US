import React, { Component } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  FireOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, message, Avatar } from "antd";
import "./MyHeader.less";
import request from "../../utils/request";
const { Header } = Layout;

export default class MyHeader extends Component {
  componentDidMount() {
    const { getMyInfo } = this.props;
    request("https://api-usv2.ncuos.com/api/user/me").then((result) => getMyInfo(result.data));
  }
  render() {
    const { toggleCollapse, myInfo, collapsed } = this.props;
    const { photo, truename, activity } = myInfo;
    const menu = (
      <Menu className="my-dropdown" onClick={() => message.error("开发中")}>
        <Menu.Item>
          <UserOutlined />
          个人信息
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <LogoutOutlined />
          退出登录
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <FireOutlined />
          活跃度{activity}
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className="site-layout-background">
        <div
          className="fold-icon"
          onClick={() => {
            toggleCollapse();
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <Dropdown overlay={menu}>
          <div className="notice-icon">
            {photo ? (
              <img src={photo} className="my-avatar"></img>
            ) : (
              <Avatar size="small" style={{ backgroundColor: "#20a4ff", color: "#fff" }}>
                {truename && truename.split("")[0]}
              </Avatar>
            )}
            <span>{truename}</span>
          </div>
        </Dropdown>

        <div className="notice-icon">
          <BellOutlined style={{ fontSize: 23, color: "#A1A2A2" }} />
        </div>
      </Header>
    );
  }
}
