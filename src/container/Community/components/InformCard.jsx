import React, { Component } from "react";
import { Row, Col } from "antd";

// import "./InformCard.less";
import UserInfo from "../../../components/UserInfo/UserInfo.jsx";
import "./InformCard.less";

export default class InformCard extends Component {
  state = {
    scale: 8,
  };
  render() {
    const { data = [], title, date, emptyText } = this.props;
    return (
      <Col
        xs={{ span: 24 }}
        sm={{ span: 11 }}
        md={{ span: 24 }}
        style={{ marginBottom: 16, height: "100%" }}
      >
        <div className={"birthday-wrapper"}>
          <h3 className={"title"}>
            <span style={{ float: "left" }}>{title}</span>
            <span style={{ float: "right" }}>{date}</span>
          </h3>
          <div className="birthday-content">
            {data.length > 0 ? (
              <Row className="users-list">
                {data.map((user) => (
                  <Col
                    key={user.truename}
                    span="8"
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <UserInfo
                      vertical={true}
                      user={user}
                      showDivider={false}
                      avatarSize={"large"}
                      textStyle={{
                        fontSize: 12,
                        display: "inline-block",
                        marginTop: 4,
                        marginBottom: 7.5,
                      }}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <div>
                <p className="birthday-empty-text">{emptyText}</p>
              </div>
            )}
          </div>
        </div>
      </Col>
    );
  }
}
