import React from "react";
import { Modal, Tag } from "antd";
import "./LabelsSelectModal.less";
import { PlusOutlined } from "@ant-design/icons";

const { CheckableTag } = Tag;

const LabelsSelectModal = ({
  visible,
  onOk,
  onCancel,
  labels = [],
  checkedLabels = [],
  onLabelClick,
}) => {
  return (
    <Modal
      title="给话题添加标签吧（可多选）"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      centered
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {labels.map(({ label_id, label_name }) => (
          <div
            key={label_id}
            style={{
              display: "inline-block",
              width: "16%",
              margin: "0 2%",
            }}
          >
            <CheckableTag
              checked={checkedLabels.indexOf(label_id) > -1}
              onChange={(checked) =>
                onLabelClick(checked, label_id)
              }
              className={"post-label"}
            >
              <span>{label_name}</span>
              <PlusOutlined />
            </CheckableTag>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default LabelsSelectModal;
