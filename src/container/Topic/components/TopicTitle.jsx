import React from "react";

export default function TopicTitle({ topic = {} }) {
  const { title } = topic;
  return (
    <div className={"topic-detail-title"}>
      <h3
        style={{ fontSize: 28 }}
        dangerouslySetInnerHTML={{
          __html: `<div>${title}</div>`,
        }}
      />
    </div>
  );
}
