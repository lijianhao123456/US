import React from "react";
import { Tag } from "antd";
import "./TopicBottom.less";
import { LikeFilled } from "@ant-design/icons";
import request from "../../../utils/request";

export default ({ topic = {}, love, love_count, toggleLove }) => {
  const { labels = [], topic_id } = topic;
  const defaultLabel = {
    label_id: -1,
    label_name: "未分类",
  };
  const labelsHandler = labels.length > 0 ? labels : [defaultLabel];
  const toggle = (topic_id) => {
    return () => {
      request("https://api-usv2.ncuos.com/api/topic/love", { love: !love, topic_id }, "PUT").then(
        (result) => {
          toggleLove(result.data);
        }
      );
    };
  };
  return (
    <div className={"topic-detail-action"}>
      <div className={"topic-detail-labels"}>
        {labelsHandler.map(({ label_id, label_name }) => (
          <Tag key={label_id}>{label_name}</Tag>
        ))}
      </div>
      <div onClick={toggle(topic_id)} className={love ? "like" : "unlike"}>
        <LikeFilled />
        <span>{love_count}</span>
      </div>
    </div>
  );
};
