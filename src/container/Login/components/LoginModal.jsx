import React from "react";
import { Modal, Input, Button } from "antd";
import "./LoginModal.less";

export default class LoginModal extends React.Component {
  state = {
    value: "",
  };

  handdleInputChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const {
      title,
      visible,
      onCancel,
      inputChangeHandler,
      inputValue,
      buttonText = "获取用户名",
      buttonClickHandler,
      placeholder = "输入姓名",
      tipText = "找到用户名？直接登陆",
    } = this.props;

    return (
      <Modal
        visible={visible}
        destroyOnClose
        onCancel={onCancel}
        maskClosable={false}
        footer={false}
        centered
        className="login-modal"
      >
        <div>
          <h2>US FOR NCUHOMERS</h2>{" "}
          <div className="form-wrapper">
            <Input
              type="text"
              value={inputValue}
              onChange={inputChangeHandler}
              placeholder={placeholder}
            />
            <Button type="primary" size="large" onClick={buttonClickHandler}>
              {buttonText}
            </Button>
          </div>
          <div onClick={onCancel}>{tipText}</div>
        </div>
      </Modal>
    );
  }
}
