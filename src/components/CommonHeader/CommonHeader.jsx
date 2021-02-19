import React, { PureComponent } from "react";
import "./CommonHeader.less";
import { Layout } from "antd";
const { Header } = Layout;

export default class CommonHeader extends PureComponent {
  render() {
    const {
      title,
      left,
      right,
      leftClassName = "",
      rightClassName = "",
      titleClassName = "",
      headerClassName = "",
    } = this.props;
    return (
      <Header className={titleClassName || "header"}>
        <div className={leftClassName || "header-left"}>{left}</div>
        <span className={titleClassName || "header-title"}>{title}</span>
        <div className={rightClassName || "header-right"}>
          <span>{right}</span>
        </div>
      </Header>
    );
  }
}
