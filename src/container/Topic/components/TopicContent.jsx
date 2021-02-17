import React from "react";

export default function TopicContent({ topic = {} }) {
  const { content } = topic;
  return (
    <div
      style={{ marginTop: 22 }}
      dangerouslySetInnerHTML={{
        __html: `<div>${content}</div>`,
      }}
    />
  );
}
