import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";
import request from "../../../utils/request";

import "./TopicTitle.less";

const { confirm } = Modal;

function TopicTitle({ topic = {}, isEditAble, history }) {
  const { title, topic_id } = topic;
  const { push } = history;
  const handleDeleteTopic = () => {
    confirm({
      title: "删除",
      content: (
        <div>
          <p>删除后将不能恢复</p>
          <p>确认删除吗?</p>
        </div>
      ),
      centered: true,
      cancelText: "取消",
      okText: "删除",
      onOk() {
        request(
          `https://api-usv2.ncuos.com/api/topic?topic_id=${topic_id}`,
          topic_id,
          "DELETE"
        ).then(push("/community/index"), message.success("删除成功"));
      },
    });
  };
  const handleEditTopic = () => {
    push(`/community/edit?topic_id=${topic_id}`);
  };
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
          <DeleteOutlined onClick={handleDeleteTopic} />
          <EditOutlined onClick={handleEditTopic} />
        </div>
      )}
    </div>
  );
}
export default withRouter(TopicTitle);
