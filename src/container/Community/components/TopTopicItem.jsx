import React from "react";
import { List, Card, Tag } from "antd";
import { Link } from "react-router-dom";

export default function TopTopicItem(item) {
  const {
    title,
    user: { truename },
    topic_id,
  } = item.topicData;
  return (
    <Card bordered={false} className={"list-card"}>
      <List.Item>
        <Link to={`/community/topic?topic_id=${topic_id}`}>
          <div style={{ width: "84%", display: "inline-block" }}>
            <div className={"ellipsis-1"}>
              <Tag color="red">置顶</Tag>
              <div
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
                style={{
                  display: "inline",
                  color: "black",
                }}
              />
            </div>
          </div>
        </Link>
        <span style={{ float: "right" }}>{truename}</span>
      </List.Item>
    </Card>
  );
}
