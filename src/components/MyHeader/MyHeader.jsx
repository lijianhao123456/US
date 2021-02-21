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
import request from "../../utils/request";
import { connect } from "react-redux";

import { toggleCollapse, getMyInfo, initCollapse, logout } from "../../redux/action";
import "./MyHeader.less";
import { withRouter } from "react-router-dom";

const { Header } = Layout;

class MyHeader extends Component {
  componentDidMount() {
    const { getMyInfo } = this.props;
    request("https://api-usv2.ncuos.com/api/user/me").then((result) => getMyInfo(result.data));
  }
  logout() {
    localStorage.removeItem("token");
    this.props.logout();
    this.props.history.push("/user/login");
  }
  render() {
    const { collapsed, myInfo } = this.props.info;
    const { toggleCollapse } = this.props;
    const { photo, truename, activity } = myInfo;
    const menu = (
      <Menu className="my-dropdown">
        <Menu.Item onClick={() => message.error("开发中")}>
          <UserOutlined />
          个人信息
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={this.logout.bind(this)}>
          <LogoutOutlined />
          退出登录
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={() => message.error("开发中")}>
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
              <Avatar size="small" src={photo} style={{ marginRight: 6 }}></Avatar>
            ) : (
              <Avatar
                size="small"
                style={{ backgroundColor: "#20a4ff", color: "#fff", marginRight: 6 }}
              >
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
export default connect(
  (state) => ({
    info: state.Global,
  }),
  { toggleCollapse, getMyInfo, initCollapse, logout }
)(withRouter(MyHeader));
