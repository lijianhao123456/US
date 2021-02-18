import React from "react";
import { Layout, Alert, Mentions, Button, message } from "antd";
import request from "../../../../utils/request";
import { withRouter } from "react-router-dom";

import { removePrefix } from "../../../../utils/utils";

import "./Comment.less";
const { Footer } = Layout;
message.config({
  top: 50,
  maxCount: 1,
});

export default withRouter(Comment);

function Comment({ replyedInfo, clearReply, topic, history }) {
  const { go } = history;
  const { comment_id, name, content } = replyedInfo;
  const { topic_id } = topic;
  const isReplyComment = comment_id ? true : false;
  const [inputValue, setInputValue] = React.useState("");
  function onChange(value) {
    setInputValue(value);
  }
  function handleCommentSubmit() {
    if (inputValue.trim() === "") {
      message.warning("评论内容不能为空!");
    } else {
      if (isReplyComment) {
        request(
          "/api/topic/reply",
          { topic_id, content: inputValue, comment_id },
          "POST"
        );
        handleAlertClose();
        go(0);
      } else {
        request(
          "/api/topic/comment",
          { topic_id, content: inputValue },
          "POST"
        );
        go(0);
      }
    }
  }
  function handleAlertClose() {
    clearReply();
  }
  return (
    <Footer className="reply-area">
      <div className="pc-reply">
        {isReplyComment ? (
          <Alert
            message={
              <div className="ellipsis-1">
                <span>回复{name}</span>
                <span className="replyed-content">{removePrefix(content)}</span>
              </div>
            }
            type="info"
            closable
            afterClose={handleAlertClose}
            className="replyed-alert"
          />
        ) : null}
        <Mentions
          placeholder="说说你的看法吧~"
          style={{ height: 84 }}
          onChange={onChange}
        />
        <Button
          type="primary"
          onClick={handleCommentSubmit}
          className="reply-button"
        >
          评论
        </Button>
      </div>
    </Footer>
  );
}
