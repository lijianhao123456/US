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
      extra,
      isInput = true,
    } = this.props;

    return (
      <Modal
        bodyStyle={{ color: " rgba(0, 0, 0, 0.65)" }}
        visible={visible}
        destroyOnClose
        onCancel={onCancel}
        maskClosable={false}
        footer={false}
        centered
        className="login-modal"
      >
        <div className="login-modal-wrapper">
          <h2>US FOR NCUHOMERS</h2>{" "}
          {isInput ? (
            <div className="login-modal-form">
              <Input
                type="text"
                value={inputValue}
                onChange={inputChangeHandler}
                placeholder={placeholder}
                className="login-modal-input"
              />
              <Button
                type="primary"
                size="large"
                onClick={buttonClickHandler}
                className="login-modal-button"
              >
                {buttonText}
              </Button>
            </div>
          ) : (
            <div className="login-modal-result">
              <div className="login-modal-result-title">{title}</div>
              {extra}
            </div>
          )}
          <div className="login-modal-tip" onClick={onCancel}>
            {tipText}
          </div>
        </div>
      </Modal>
    );
  }
}
