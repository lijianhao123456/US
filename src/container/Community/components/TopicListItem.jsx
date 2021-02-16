import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { List, Card, Tag, Divider } from "antd";
import { EyeOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import UserBar from "./UserInfo.jsx";
import "./TopicListItem.less";
const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

const ListItemBottom = ({
  labels = [],
  love_count,
  comment_count,
  visitor_count,
}) => {
  const defaultLabel = {
    label_id: -1,
    label_name: "未分类",
  };
  const labelsHandler = labels.length > 0 ? labels : [defaultLabel];
  return (
    <div className={"topic-card-bottom"}>
      <div>
        {labelsHandler.map(({ label_id, label_name }) => (
          <Tag
            key={label_id}
            onClick={() => {
              console.log(labels);
            }}
          >
            {label_name}
          </Tag>
        ))}
      </div>
      <div className={"icon-group"}>
        <span>
          <EyeOutlined />
          <span>{visitor_count}</span>
        </span>
        <Divider type="vertical" />
        <span>
          <LikeOutlined />
          <span>{love_count}</span>
        </span>
        <Divider type="vertical" />
        <span>
          <MessageOutlined />
          <span>{comment_count}</span>
        </span>
      </div>
    </div>
  );
};

export default ({ topicData }) => {
  const {
    love_count,
    comment_count,
    visitor_count,
    date_modify,
    labels,
    user,
    brief,
  } = topicData;
  const date = moment(date_modify).format("YYYY-MM-DD");

  // const handleTagClick = (label) => {
  //   dispatch(routerRedux.push(`/community/index/${label}`));
  // };

  const ItemContent = () => (
    <div>
      <ListItem key={topicData.topic_id}>
        <ListItemMeta
          title={
            <Link to={`/community/topic?topic_id=${topicData.topic_id}`}>
              <div
                dangerouslySetInnerHTML={{ __html: topicData.title }}
                className={"topic-title"}
              />
            </Link>
          }
        />
        <div>
          <UserBar user={user} date={date}></UserBar>
        </div>
        <div className={"ellipsis-2"}>
          <div
            dangerouslySetInnerHTML={{
              __html: `<div>${brief}</div>`,
            }}
            className={"topic-content"}
          />
        </div>
      </ListItem>
      <ListItemBottom
        labels={labels}
        love_count={love_count}
        comment_count={comment_count}
        visitor_count={visitor_count}
      />
    </div>
  );

  return (
    <Card bordered={false} className={"topic-card"}>
      <ItemContent />
    </Card>
  );
};
