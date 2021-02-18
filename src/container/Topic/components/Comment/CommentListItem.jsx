import { Tooltip } from "antd";
import React from "react";
import moment from "moment";
import { removePrefix, getDistanceFromNow } from "../../../../utils/utils";

import message from "../../../../assets/icon/message.jpg";
import UserInfo from "../../../Community/components/UserInfo.jsx";

import "./CommentListItem.less";

export default function CommentListItem({ commentData, order }) {
  const { user, beReplied } = commentData;
  const { comment_id, content, date_create } = commentData.comment;
  const isReplyedComment = !!beReplied.user;
  const date = moment(date_create);
  const distance = getDistanceFromNow(date);
  console.log(isReplyedComment);
  return (
    <div className="comment-wrapper" key={comment_id}>
      <div className="comment-desc">
        <div className="comment-author">
          <UserInfo
            user={user}
            avatarSize={30}
            showDesc={false}
            hasTooltip={false}
            className="comment-author"
            showDivider={false}
            textStyle={{
              display: "inline-block",
              marginLeft: "14px",
              fontSize: "15px",
            }}
          />
        </div>
        <div>#{order}</div>
      </div>
      <div className="comment-content">
        {isReplyedComment ? (
          <div className="comment-replyed-content">
            <div className="ellipsis-2">
              <span className="user-name">{beReplied.user.truename}:</span>
              <span>{removePrefix(beReplied.comment.content)}</span>
            </div>
          </div>
        ) : null}
        <div
          dangerouslySetInnerHTML={{
            __html: `<div>${removePrefix(content)}</div>`,
          }}
        />
      </div>
      <div className="comment-bottom">
        <span className="comment-date">{distance}</span>
        <Tooltip title="回复">
          <span
            className="comment-reply"
            // onClick={() =>
            //   replyAction({
            //     id: comment.comment_id,
            //     name: user.truename,
            //     content: comment.content,
            //   })
            // }
          >
            <img src={message}></img>
          </span>
        </Tooltip>
      </div>
    </div>
  );
}
