import React from "react";

import "./CommentTitle.less";

export default function CommentTitle({ comments }) {
  return (
    <header className={"comment-title"}>
      <h3>
        评论 <span className={"comments-count"}>{comments.length}</span>
      </h3>
    </header>
  );
}
