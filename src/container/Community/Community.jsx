import { Layout, Menu, Dropdown, Row, Col, Button, List, Pagination, Spin } from "antd";
import qs from "querystring";
import { DownOutlined } from "@ant-design/icons";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import Classification from "./components/Classification.jsx";
import InformCard from "./components/InformCard.jsx";
import RankList from "./components/RankList.jsx";
import TopicListItem from "./components/TopicListItem.jsx";
import TopTopicItem from "./components/TopTopicItem.jsx";

import { getTopicList, getTopTopic, getLabels, changeLabel, getBirth, getRank } from "./action";
import request from "../../utils/request";

import "./Community.less";
const now = moment();
const { Content, Footer } = Layout;
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
};

class Community extends PureComponent {
  state = {
    currentSort: { key: 0, text: "最新话题" },
  };
  componentDidMount() {
    const { page_size = 10 } = this.props.topicListInfo.topicList;
    const { search } = this.props.location;
    const { page = 1 } = qs.parse(search.slice(1));
    const { getTopicList, getTopTopic, getLabels, getBirth, getRank } = this.props;
    request(
      `api/topic/list?page_num=${page}&page_size=${page_size}&label_id=0&sortord=0`
    ).then((result) => getTopicList(result.data));
    request("https://api-usv2.ncuos.com/api/topic/top").then((result) => getTopTopic(result.data));
    request("https://api-usv2.ncuos.com/api/topic/label").then((result) => getLabels(result.data));
    request("https://api-usv2.ncuos.com/api/user/birth").then((result) => getBirth(result.data));
    request("https://api-usv2.ncuos.com/api/user/act_rank").then((result) =>
      getRank(result.data.data)
    );
  }
  onChange(pageNumber) {
    const { page_size } = this.props.topicListInfo.topicList;
    const { currentLabel } = this.props.topicListInfo;
    this.props.history.push(`/community/index/${currentLabel}?page=${pageNumber}`);
    request(
      `api/topic/list?page_num=${pageNumber}&page_size=${page_size}&label_id=${currentLabel}&sortord=0`
    ).then((result) => this.props.getTopicList(result.data));
  }
  handleMenuClick({ key }) {
    const { currentLabel } = this.props.topicListInfo;
    const newOrder = menuConfig.items.find((item) => item.key.toString() === key);
    this.setState({ currentSort: newOrder });
    request(
      `api/topic/list?page_num=1&page_size=10&label_id=${currentLabel}&sortord=${key}`
    ).then((result) => this.props.getTopicList(result.data));
  }
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        {menuConfig.items.map(({ key, text }) => (
          <Menu.Item key={key}>
            <div>{text}</div>
          </Menu.Item>
        ))}
      </Menu>
    );
    const { myInfo } = this.props.info;
    const { page_size, rows, total, page_num } = this.props.topicListInfo.topicList;
    const { topTopic, labels, birth, rank } = this.props.topicListInfo;
    return (
      <div>
        <Content style={{ margin: "18px" }}>
          {rows ? (
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
                    <Classification changeLabel={this.props.getTopicList} labels={labels} />
                  </Col>
                  <InformCard
                    data={birth}
                    date={now.format("MMM.DD")}
                    title={"生日快乐"}
                    emptyText="今天没有过生日的小伙伴哦~"
                  />
                  <InformCard data={birth} title={"每月之星"} emptyText="投票已经结束了~" />
                  <RankList rank={rank} myInfo={myInfo} />
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
                        {this.state.currentSort.text} <DownOutlined />
                      </span>
                    </Dropdown>
                    <Link to="/community/post">
                      <Button type="primary" style={{ float: "right" }}>
                        发帖
                      </Button>
                    </Link>
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
                    renderItem={(item) => <TopTopicItem key={item.topic_id} topicData={item} />}
                  />
                  <List
                    itemLayout="vertical"
                    dataSource={rows}
                    size="large"
                    className={"topic"}
                    renderItem={(item) => (
                      <TopicListItem
                        changeLabel={this.props.getTopicList}
                        topicData={item}
                        key={item.date_modify}
                      />
                    )}
                  >
                    <div className={"topic-pagination"}>
                      <Pagination
                        current={page_num}
                        showQuickJumper
                        defaultCurrent={1}
                        pageSize={page_size}
                        total={total}
                        onChange={this.onChange.bind(this)}
                        showSizeChanger={false}
                      />
                    </div>
                  </List>
                </div>
              </Col>
            </Row>
          ) : (
            <div className="spin-wrapper">
              <Spin size="large"></Spin>
            </div>
          )}
        </Content>
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
      </div>
    );
  }
}

export default connect(
  (state) => ({
    info: state.Global,
    topicListInfo: state.Community,
  }),
  { getTopicList, getTopTopic, getLabels, changeLabel, getBirth, getRank }
)(Community);
