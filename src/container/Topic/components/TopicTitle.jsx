import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";

import "./TopicTitle.less";

export default function TopicTitle({ topic = {}, isEditAble }) {
  const { title } = topic;
  return (
    <div className="topic-detail-title">
      <h3
        style={{ fontSize: 28 }}
        dangerouslySetInnerHTML={{
          __html: `<div>${title}</div>`,
        }}
        className="topic-title"
      />
      {isEditAble && (
        <div className="topic-edit-icon">
          <DeleteOutlined />
          <EditOutlined />
        </div>
      )}
    </div>
  );
}
