import {
  Layout,
  Menu,
  Dropdown,
  Row,
  Col,
  Button,
  List,
  Card,
  Tag,
  Pagination,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import TopicListItem from "./components/TopicListItem.jsx";
import TopTopicItem from "./components/TopTopicItem.jsx";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icon/tucao.svg";
import { connect } from "react-redux";
import moment from "moment";
import request from "../../utils/request";
import { getTopicList, getTopTopic, getLabels } from "./action";
import "./Community.less";
import Classification from "./components/Classification.jsx";
const now = moment();
const { Content } = Layout;
const menuConfig = {
  items: [
    {
      key: 0,
      text: "最新话题",
    },
    {
      key: 2,
      text: "点赞数最多",
    },
    {
      key: 1,
      text: "评论数最多",
    },
  ],
  click: ({ key }) => {
    const newOrder = menuConfig.items.find(
      (item) => item.key.toString() === key
    );
    const payload = {
      label_id: currentRoute,
      sortord: newOrder.key,
    };
    // request("community/saveTopicOrder",payload)
  },
};

const menu = (
  <Menu onClick={menuConfig.click}>
    {menuConfig.items.map(({ key, text }) => (
      <Menu.Item key={key}>
        <div>{text}</div>
      </Menu.Item>
    ))}
  </Menu>
);
class Community extends Component {
  state = {
    labels: [
      { label_id: 0, label_name: "全部" },
      { label_id: 1, label_name: "全部" },
      { label_id: 2, label_name: "全部" },
      { label_id: 3, label_name: "全部" },
      { label_id: 4, label_name: "全部" },
      { label_id: 5, label_name: "全部" },
      { label_id: 6, label_name: "全部" },
      { label_id: 7, label_name: "全部" },
    ],
  };
  componentDidMount() {
    request(
      "api/topic/list?page_num=1&page_size=10&label_id=0&sortord=0"
    ).then((result) => this.props.getTopicList(result.data));
    request("https://api-usv2.ncuos.com/api/topic/top").then((result) =>
      this.props.getTopTopic(result.data)
    );
    request("https://api-usv2.ncuos.com/api/topic/label").then((result) =>
      this.props.getLabels(result.data)
    );
    console.log(this.props)
  }
  test() {
    console.log(this.props.topicInfo.topicList);
  }
  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }
  render() {
    const {
      page_num = 1,
      page_size,
      rows,
      total,
      total_page,
    } = this.props.topicInfo.topicList;
    const topTopic = this.props.topicInfo.topTopic;
    const labels = this.props.topicInfo.labels;
    return (
      <Content style={{ margin: "18px" }}>
        <Row style={{ marginLeft: -12, marginRight: -12 }}>
          <Col
            xs={{ span: 24, order: 1 }}
            md={{ span: 8, order: 2 }}
            lg={{ span: 7, order: 2 }}
            style={{
              paddingLeft: 12,
              paddingRight: 12,
            }}
          >
            <Row>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 11 }}
                md={{ span: 24 }}
                style={{ marginBottom: 16, height: "100%" }}
              >
                <Classification labels={labels}/>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 11 }}
                md={{ span: 24 }}
                style={{ marginBottom: 16 }}
              >
                <div className={"birthday-wrapper"}>
                  <h3 className={"title"}>
                    <span style={{ float: "left" }}>生日快乐</span>
                    <span style={{ float: "right" }}>
                      {now.format("MMM.DD")}
                    </span>
                  </h3>
                  <div className={"birthday-content"}>
                    <div>
                      <p className={"birthday-empty-text"}>
                        今天没有过生日的小伙伴哦~
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 11, offset: 2 }}
                md={{ span: 24, offset: 0 }}
                style={{ marginBottom: 16, height: "100%" }}
              >
                <div className={"birthday-wrapper"}>
                  <h3 className={"title"}>
                    <span style={{ float: "left" }}>生日快乐</span>
                    <span style={{ float: "right" }}>
                      {now.format("MMM.DD")}
                    </span>
                  </h3>
                  <div className={"birthday-content"}>
                    <div>
                      <p className={"birthday-empty-text"}>
                        今天没有过生日的小伙伴哦~
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 11 }}
                md={{ span: 24 }}
                style={{ marginBottom: 16, height: "100%" }}
              >
                <div className={"birthday-wrapper"}>
                  <h3 className={"title"}>
                    <span style={{ float: "left" }}>生日快乐</span>
                    <span style={{ float: "right" }}>
                      {now.format("MMM.DD")}
                    </span>
                  </h3>
                  <div className={"birthday-content"}>
                    <div>
                      <p className={"birthday-empty-text"}>
                        今天没有过生日的小伙伴哦~
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            xs={{ span: 24, order: 2 }}
            md={{ span: 16, order: 1 }}
            lg={{ span: 17, order: 1 }}
            style={{
              paddingLeft: 12,
              paddingRight: 12,
            }}
          >
            <div className="topic-list-wrapper">
              <div style={{ height: "40px" }}>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <span style={{ cursor: "pointer", lineHeight: "40px" }}>
                    最新话题 <DownOutlined />
                  </span>
                </Dropdown>
                <Button
                  type="primary"
                  style={{ float: "right" }}
                  onClick={this.test.bind(this)}
                >
                  发帖
                </Button>
              </div>
              <div className="tag-header">
                <i className={"dot"}></i>
                <span className="topiclist-text">
                  全部
                  <small>
                    <strong>{total}</strong>
                  </small>
                </span>
              </div>
              <List
                itemLayout="vertical"
                size="small"
                dataSource={topTopic}
                className={"top-topic"}
                renderItem={(item) => <TopTopicItem topicData={item} />}
              />
              <List itemLayout="vertical" size="large" className={"topic"}>
                {rows.map((item) => (
                  <TopicListItem topicData={item} key={item.topic_id} />
                ))}
                <div className={"topic-pagination"}>
                  <Pagination
                    showQuickJumper
                    defaultCurrent={1}
                    pageSize={page_size}
                    total={total}
                    onChange={this.onChange}
                    showSizeChanger={false}
                  />
                </div>
              </List>
            </div>
          </Col>
        </Row>
      </Content>
    );
  }
}

export default connect(
  (state) => ({
    topicInfo: state.Community,
  }),
  { getTopicList, getTopTopic, getLabels }
)(Community);
