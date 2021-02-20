import React from "react";
import { Input, Modal, Layout, message } from "antd";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module";
import LabelsSelectModal from "./components/LabelsSelectModal.jsx";
import "./Post.less";
import "react-quill/dist/quill.snow.css";
import { LeftOutlined } from "@ant-design/icons";
import CommonHeader from "../../components/CommonHeader/CommonHeader.jsx";
import { withRouter } from "react-router-dom";
import request from "../../utils/request.js";

const { confirm } = Modal;
const { Content } = Layout;

Quill.register("modules/imageResize", ImageResize);

/**
 * 发帖组件，用于新建话题以及修改话题
 * 通过判断当前router来判断是编辑还是新建
 */

class TopicPost extends React.Component {
  state = {
    title: "",
    content: "",
    labels: [],
    checkedLabels: [],
    labelsSelectModalVisible: false,
  };
  componentDidMount() {
    request("https://api-usv2.ncuos.com/api/topic/label").then((res) =>
      this.setState({ labels: res.data })
    );
  }
  handleBackClick = () => {
    const { go } = this.props.history;
    confirm({
      title: "返回",
      content: (
        <div>
          <p>之前编辑的内容再次进入将会消失</p>
          <p>确认退出吗?</p>
        </div>
      ),
      centered: true,
      cancelText: "取消",
      okText: "确定",
      className: "confirm-modal",
      onOk() {
        go(-1);
      },
    });
  };
  handleEditorChange = (content) => {
    this.setState({ content });
  };
  handleLabelsSelect = () => {
    const { checkedLabels } = this.state;
    this.baseCheckedLabels = checkedLabels;
    this.setState({
      labelsSelectModalVisible: true,
    });
  };
  onLabelsModalOk = () => {
    const { content, checkedLabels, title } = this.state;
    const { push } = this.props.history;
    this.setState({
      labelsSelectModalVisible: false,
    });
    const validators = [
      { value: title, msg: "标题不能为空!" },
      { value: content, msg: "内容不能为空!" },
      { value: checkedLabels.toString(), msg: "请选择至少一个分类!" },
      { value: checkedLabels.length <= 3, msg: "不能选择多于3个分类!" },
    ];
    let pass = true;
    validators.forEach(({ value, msg }) => {
      if (!value) {
        message.warning(msg);
        pass = false;
      }
    });
    if (pass) {
      request(
        "https://api-usv2.ncuos.com/api/topic",
        { content, label_id: checkedLabels, title },
        "POST"
      ).then((res) => {
        push(`/community/topic?topic_id=${res.data.topic_id}`);
        message.success("发布成功");
      });
    }
  };
  onLabelsModalCancel = () => {
    this.setState({
      labelsSelectModalVisible: false,
      checkedLabels: this.baseCheckedLabels,
    });
  };
  handleLabelsChange = (checked, label_id) => {
    const { checkedLabels } = this.state;
    let newCheckedLabels = [...checkedLabels];
    if (checked) {
      newCheckedLabels = [...newCheckedLabels, label_id];
    } else {
      newCheckedLabels = newCheckedLabels.filter((id) => label_id !== id);
    }
    this.setState({
      checkedLabels: newCheckedLabels,
    });
  };
  handleInputChange = (stateName) => (e) => {
    const { value } = e.target;
    this.setState({
      [stateName]: value,
    });
  };
  render() {
    const handleTitleChange = this.handleInputChange("title");
    const { content, checkedLabels, labelsSelectModalVisible, labels } = this.state;
    const toolbarContainer = [
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ["image"],
    ];
    const editorConfig = {
      modules: {
        toolbar: {
          container: toolbarContainer,
        },
        imageResize: {
          displayStyles: {
            backgroundColor: "black",
            border: "none",
            color: "white",
          },
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
      },
      onChange: this.handleEditorChange,
      className: "quill-main",
      value: content,
      placeholder: "输入话题内容",
    };

    return (
      <Content style={{ margin: "24px 24px 0px" }}>
        <div className="post-page">
          <header>
            <CommonHeader
              title={"发布话题"}
              left={
                <div onClick={this.handleBackClick.bind(this)}>
                  <LeftOutlined />
                  关闭
                </div>
              }
              right={<span onClick={this.handleLabelsSelect}>发布</span>}
              className="header-container"
            />
          </header>
          <main className="post-main">
            <section className="title-wrapper">
              <Input
                placeholder="点此输入文章标题"
                bordered={false}
                className="title-input"
                size="large"
                onChange={handleTitleChange}
              />
            </section>
            <section className="content-wrapper">
              <ReactQuill
                {...editorConfig}
                ref={(node) => {
                  this.editor = node;
                }}
              />
            </section>
            <LabelsSelectModal
              visible={labelsSelectModalVisible}
              onCancel={this.onLabelsModalCancel}
              onOk={this.onLabelsModalOk}
              onLabelClick={this.handleLabelsChange}
              labels={labels}
              checkedLabels={checkedLabels}
            />
          </main>
        </div>
      </Content>
    );
  }
}

export default withRouter(TopicPost);
