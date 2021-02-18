import React from "react";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import { List, Card, Tag, Divider, message } from "antd";
import { EyeOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import UserInfo from "./UserInfo.jsx";
import "./TopicListItem.less";
import request from "../../../utils/request";
const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

const ListItemBottom = ({
  labels = [],
  love_count,
  comment_count,
  visitor_count,
  changeLabel,
  history,
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
            style={{ cursor: "pointer" }}
            key={label_id}
            onClick={() => {
              if (label_id !== -1) {
                history.push(`/community/index/${label_id}`);
                request(
                  `api/topic/list?page_num=1&page_size=10&label_id=${label_id}&sortord=0`
                ).then((result) => changeLabel(result.data));
              } else {
                message.error("未分类(US怎么未分类也请求全部第一页数据)");
              }
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

export default withRouter(({ topicData, changeLabel, history }) => {
  const { love_count, comment_count, visitor_count, date_modify, labels, user, brief } = topicData;
  const date = moment(date_modify).format("YYYY-MM-DD");

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
        <div style={{ marginBottom: 16 }}>
          <UserInfo user={user} date={date}></UserInfo>
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
        changeLabel={changeLabel}
        labels={labels}
        history={history}
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
});
