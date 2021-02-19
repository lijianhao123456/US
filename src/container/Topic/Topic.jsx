import React, { Component } from "react";
import { Spin, Layout, List } from "antd";
import qs from "querystring";
import { connect } from "react-redux";
import request from "../../utils/request";

import { getTopicDetail, toggleLove, reply, clearReply } from "./action";
import "./Topic.less";
import TopicBottom from "./components/TopicBottom.jsx";
import TopicTitle from "./components/TopicTitle.jsx";
import User from "./components/User.jsx";
import TopicContent from "./components/TopicContent.jsx";
import CommentTitle from "./components/Comment/CommentTitle.jsx";
import CommentListItem from "./components/Comment/CommentListItem.jsx";
import Comment from "./components/Comment/Comment.jsx";
import MyHeader from "../../components/MyHeader/MyHeader.jsx";

const { Content } = Layout;
class Topic extends Component {
  componentDidMount() {
    const { search } = this.props.location;
    const { topic_id } = qs.parse(search.slice(1));
    request(`https://api-usv2.ncuos.com/api/topic?topic_id=${topic_id}`).then((result) => {
      this.props.getTopicDetail(result.data);
    });
  }
  render() {
    const { topic, love, love_count, comments } = this.props.topicInfo.topicDetail;
    const { replyInfo } = this.props.topicInfo;
    const { clearReply } = this.props;
    return (
      <div>
        <MyHeader />
        {topic ? (
          <div className={"topic-detail-wrapper"}>
            <Content>
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
                      reply={this.props.reply}
                      order={index + 1}
                      commentData={item}
                    />
                  )}
                  className="comment-list"
                />
              </div>
            </Content>
            <Comment replyedInfo={replyInfo} topic={topic} clearReply={clearReply} />
          </div>
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
  { getTopicDetail, toggleLove, reply, clearReply }
)(Topic);
