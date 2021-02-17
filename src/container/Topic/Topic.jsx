import React, { Component } from "react";
import { Spin, Layout, Tag } from "antd";
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
    return (
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
          </div>

          <div>
            <header className={["comment-title"]}>
              <h3>
                评论 <span className={["comments-count"]}>{1}</span>
              </h3>
            </header>
            {/* <List
                itemLayout="vertical"
                size="large"
                loading={loading}
                dataSource={this.packCommentsContent(comments, author.truename)}
                locale={{ emptyText: "来做第一个评论的人吧~" }}
                renderItem={(item, index) => (
                  <CommentListItem
                    order={index}
                    commentData={item}
                    loading={loading}
                    replyAction={this.handleReplyClick}
                  />
                )}
                className={["comment-list"]}
              /> */}
          </div>
        </div>
      </Content>
    );
  }
}
export default connect(
  (state) => ({
    topicInfo: state.Topic,
  }),
  { getTopicDetail, toggleLove }
)(Topic);
