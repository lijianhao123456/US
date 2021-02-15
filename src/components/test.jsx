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
import {
  FormOutlined,
  HomeOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from "@ant-design/icons";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./test.css";
import logo from "../assets/icon/tucao.svg";
import moment from "moment";
import TopicListItem from "./Community/TopicListItem/index.jsx";
const now = moment();
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        最新话题
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        点赞数最多
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        评论数最多
      </a>
    </Menu.Item>
  </Menu>
);
export default class test extends Component {
  state = {
    collapsed: false,
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
    topTopic: [11, 111, 1111, 1111111, 323123213],
    topic: [1, 1, 1, 1, 1, 1],
  };
  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  toggle = (collapsed) => {
    this.setState({ collapsed: !collapsed });
  };

  render() {
    const { collapsed, labels, topTopic, topic } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsed={collapsed}
          width="256"
          onCollapse={this.onCollapse}
          theme="light"
        >
          <div className="logo">
            <Link to="/">
              <div className="us-icon">US</div>
              {!collapsed && <h1>For Ncuhomers</h1>}
            </Link>
          </div>
          <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
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
        <Layout className="site-layout">
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
                    <div className={"pc-wrapper"}>
                      <h3>圈子</h3>
                      <Row style={{ padding: 14 }}>
                        {labels.map(({ label_id, label_name }) => (
                          <Col
                            key={label_id}
                            span={6}
                            style={{
                              transition: "all .3s",
                            }}
                          >
                            <Link
                              to={`community/index/${label_id}`}
                              className={"classification-label"}
                            >
                              <img src={logo} alt="star" />
                              <span className={"classification-text"}>
                                {label_name}
                              </span>
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </div>
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
                      <span style={{ cursor: "pointer" }}>
                        最新话题 <DownOutlined />
                      </span>
                    </Dropdown>
                    <Button type="primary" style={{ float: "right" }}>
                      发帖
                    </Button>
                  </div>
                  <div className="tag-header">
                    <i className={"dot"}></i>
                    <span className="topiclist-text">
                      全部
                      <small>
                        <strong>868</strong>
                      </small>
                    </span>
                  </div>
                  <List
                    itemLayout="vertical"
                    size="small"
                    dataSource={topTopic}
                    className={"top-topic"}
                    renderItem={(item) => (
                      // <TopTopicItem
                      //   // dispatch={dispatch}
                      //   topicData={item}
                      //   loading={loading}
                      //   isMobile={mb}
                      // />
                      <Card bordered={false} className={"list-card"}>
                        <List.Item>
                          <Link to={`/community/topic?topic_id=1`}>
                            <Tag color="red">置顶</Tag>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item,
                              }}
                              style={{
                                display: "inline",
                                color: "black",
                              }}
                            />
                          </Link>
                          <span style={{ float: "right" }}>李健豪</span>
                        </List.Item>
                      </Card>
                    )}
                  />
                  <List itemLayout="vertical" size="large" className={"topic"}>
                    {topic.map((item) => (
                      <TopicListItem topicData={item} key={item.topic_id} />
                    ))}
                    <div className={"topic-pagination"}>
                      <Pagination
                        showQuickJumper
                        defaultCurrent={1}
                        total={870}
                        onChange={this.onChange}
                        showSizeChanger={false}
                      />
                    </div>
                  </List>
                </div>
              </Col>
            </Row>
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
        </Layout>
      </Layout>
    );
  }
}
