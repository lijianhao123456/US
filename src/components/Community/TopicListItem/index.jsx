import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { List, Card, Tag, Divider } from "antd";
import { EyeOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
// import styles from "./TopicListItem.less";
import UserBar from "./UserInfo.jsx";
import "./index.less"
const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

const ListItemBottom = ({ labels }) => {
  const defaultLabel = {
    label_id: -1,
    label_name: "未分类",
  };
  const labelsHandler = [defaultLabel];
  return (
    <div className={"topic-card-bottom"}>
      <div>
        {labelsHandler.map(({ label_id, label_name }) => (
          <Tag key={label_id}>{label_name}</Tag>
        ))}
      </div>
      <div className={"icon-group"}>
        <span>
          <EyeOutlined />
          <span>{999}</span>
        </span>
        <Divider type="vertical" />
        <span>
          <LikeOutlined />
          <span>{999}</span>
        </span>
        <Divider type="vertical" />
        <span>
          <MessageOutlined />
          <span>{999}</span>
        </span>
      </div>
    </div>
  );
};

export default ({ topicData }) => {
  //   const {
  //     love_count,
  //     comment_count,
  //     visitor_count,
  //     date_modify,
  //     labels,
  //     user,
  //   } = topicData;
  let love_count = 1;
  let comment_count = 1;
  let visitor_count = 1;
  let labels = "啊啊";
  const stat = { love_count, comment_count, visitor_count };
  const date = moment().format("YYYY-MM-DD");

  //   const handleTagClick = (label) => {
  //     dispatch(routerRedux.push(`/community/index/${label}`));
  //   };

  const ItemContent = () => (
    <div>
      <ListItem key={"topicData.topic_id"}>
        <ListItemMeta
          title={
            <Link to={`/community/topic?topic_id=${"topicData.topic_id"}`}>
              <div
                dangerouslySetInnerHTML={{ __html: "topicData.title" }}
                className={"topic-title"}
              />
            </Link>
          }
        />
        <div>
          <UserBar date={date}></UserBar>
        </div>
        <div className={"ellipsis"}>
          <div
            dangerouslySetInnerHTML={{
              __html: `<div>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊阿啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>`,
            }}
            className={"topic-content"}
          />
        </div>
      </ListItem>
      <ListItemBottom labels={labels} />
    </div>
  );

  return (
    <Card bordered={false} className={"topic-card"}>
      <div>
        <ItemContent />
      </div>
    </Card>
  );
};
