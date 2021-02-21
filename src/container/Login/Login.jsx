import { Alert, Checkbox, Form, Input, Button, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import React, { Component } from "react";
import { login } from "../../redux/action";
import LoginModal from "./components/LoginModal.jsx";
import "./Login.less";
import request from "../../utils/request.js";

const { Footer } = Layout;

class Login extends Component {
  state = {
    type: "username",
    autoLogin: true,
    modalTitle: "",
    modalPlaceholder: "",
    modalButtonText: "",
    modalVisible: false,
    modalInputValue: "",
    modalExtra: "",
    modalIsInput: true,
    modalTiptext: "",
  };

  componentDidMount() {
    localStorage.getItem("token") && this.props.history.push("/community/index");
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (values) => {
    const { autoLogin } = this.state;
    request(
      "https://api-usv2.ncuos.com/api/user/login",
      { ...values, remember_me: autoLogin },
      "POST"
    ).then((res) => {
      localStorage.setItem("token", res.data.token);
      this.props.login(res.data.token);
      this.props.history.push("/community/index");
    });
  };

  onModalCancel = () => {
    this.setState({
      modalExtra: "",
      modalInputValue: "",
      modalIsInput: true,
    });
    this.setModalVisible(false);
  };

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };

  handleUsernameForggoten = () => {
    this.setState({
      type: "username",
      modalTitle: "",
      modalPlaceholder: "输入姓名",
      modalButtonText: "获取用户名",
      modalTiptext: "找到用户名？直接登陆",
    });
    this.setModalVisible(true);
  };

  handlePasswordForggoten = () => {
    this.setState({
      type: "password",
      modalTitle: "",
      modalPlaceholder: "输入用户名",
      modalButtonText: "找回密码",
      modalTiptext: "想起密码？直接登陆",
    });
    this.setModalVisible(true);
  };

  handleModalInputChange = (e) => {
    this.setState({
      modalInputValue: e.target.value,
    });
  };

  handleUsernameQuery = async () => {
    console.log(1);
    const { modalInputValue: truename } = this.state;
    const res = await request(`https://api-usv2.ncuos.com/api/user/username`, { truename });
    const { status } = res;
    if (status === 200) {
      this.setState({
        modalTitle: `找到 ${truename} 存在如下用户名：`,
        modalIsInput: false,
        modalExtra: res.data.map(({ username }) => <span key={username}>{username}</span>),
      });
    }
  };

  handlePasswordQuery = async () => {
    const { modalInputValue: username } = this.state;
    const res = await request(
      `https://api-usv2.ncuos.com/api/user/forgot_password`,
      { username },
      "POST"
    );
    const { status } = res;
    if (status === 200) {
      this.setState({
        modalTitle: `重置密码链接已发送到您的邮箱，请查看邮件`,
        modalIsInput: false,
      });
    }
  };
  test = () => {
    console.log(localStorage.getItem("token"));
  };
  render() {
    const {
      type,
      autoLogin,
      modalVisible,
      modalInputValue,
      modalExtra,
      modalTitle,
      modalIsInput,
      modalPlaceholder,
      modalButtonText,
      modalTiptext,
    } = this.state;
    return (
      <div className="login-container">
        <div className="login-content">
          <div className="login-main">
            <header onClick={this.test.bind(this)}>
              <h1>US FOR NCUHOMERS</h1>
            </header>
            <div className="login">
              <Form
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.handleSubmit.bind(this)}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "邮箱或用户名不能为空!" }]}
                >
                  <Input
                    suffix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="邮箱(老us用户使用用户名)"
                  />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: "密码不能为空!" }]}>
                  <Input
                    suffix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                  />
                </Form.Item>
                <div className="login-action">
                  <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                    <span>记住密码</span>
                  </Checkbox>
                  <div className="login-forgotton">
                    <p onClick={this.handlePasswordForggoten} style={{}}>
                      忘记密码?
                    </p>
                  </div>
                </div>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登录
                  </Button>
                </Form.Item>
                <div className="login-forgotton">
                  <p onClick={this.handleUsernameForggoten}>老家园忘记用户名?</p>
                </div>
              </Form>
              <LoginModal
                visible={modalVisible}
                onCancel={this.onModalCancel}
                title={modalTitle}
                placeholder={modalPlaceholder}
                buttonText={modalButtonText}
                extra={modalExtra}
                inputValue={modalInputValue}
                inputChangeHandler={this.handleModalInputChange}
                buttonClickHandler={
                  type === "username" ? this.handleUsernameQuery : this.handlePasswordQuery
                }
                isInput={modalIsInput}
                tipText={modalTiptext}
              />
            </div>
          </div>
        </div>
        <Footer style={{ textAlign: "center", background: "transparent" }}>
          <div style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 14 }}>
            Copyright©2018南昌大学家园工作室
          </div>
        </Footer>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    info: state.Global,
  }),
  { login }
)(Login);
