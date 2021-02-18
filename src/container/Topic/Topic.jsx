import React, { Component } from "react";
import { Spin, Layout, Tag, List } from "antd";
import qs from "querystring";
import { DownOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import moment from "moment";
import request from "../../utils/request";

import { getTopicDetail, toggleLove } from "./action";
import "./Topic.less";
import TopicBottom from "./components/TopicBottom.jsx";
import TopicTitle from "./components/TopicTitle.jsx";
import User from "./components/User.jsx";
import TopicContent from "./components/TopicContent.jsx";
import CommentTitle from "./components/Comment/CommentTitle.jsx";
import CommentListItem from "./components/Comment/CommentListItem.jsx";

const { Content } = Layout;
class Topic extends Component {
  componentDidMount() {
    const { search } = this.props.location;
    const { topic_id } = qs.parse(search.slice(1));
    console.log(topic_id);
    // console.log(this.props.topicInfo.topicDetail.topic);
    request(`https://api-usv2.ncuos.com/api/topic?topic_id=${topic_id}`).then(
      (result) => {
        this.props.getTopicDetail(result.data);
      }
    );
  }
  render() {
    const {
      topic,
      love,
      love_count,
      comments,
    } = this.props.topicInfo.topicDetail;
    console.log(comments);
    return (
      <div>
        {topic ? (
          <Content>
            <div className={"topic-detail-wrapper"}>
              <div className={"topic-detail-content"}>
                <TopicTitle topic={topic} />
                <User topic={topic} />
                <TopicContent topic={topic} />
                <TopicBottom
                  toggleLove={this.props.toggleLove}
                  topic={topic}
                  love={love}
                  love_count={love_count}
                />
                <CommentTitle comments={comments} />
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={comments}
                  locale={{ emptyText: "来做第一个评论的人吧~" }}
                  renderItem={(item, index) => (
                    <CommentListItem
                      order={index + 1}
                      commentData={item}
                      // replyAction={this.handleReplyClick}
                    />
                  )}
                  className="comment-list"
                />
              </div>
            </div>
          </Content>
        ) : (
          <div className="spin-wrapper">
            <Spin size="large"></Spin>
          </div>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({
    topicInfo: state.Topic,
  }),
  { getTopicDetail, toggleLove }
)(Topic);
