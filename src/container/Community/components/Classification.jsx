import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import quanbu from "../../../assets/icon/quanbu.svg";
import fenxiang from "../../../assets/icon/fenxiang.svg";
import ziliao from "../../../assets/icon/ziliao.svg";
import fankui from "../../../assets/icon/fankui.svg";
import taolun from "../../../assets/icon/taolun.svg";
import tucao from "../../../assets/icon/tucao.svg";
import qita from "../../../assets/icon/qita.svg";
import neitui from "../../../assets/icon/neitui.svg";
import request from "../../../utils/request";
class Classification extends React.Component {
  changeLabel(id) {
    return () => {
      console.log(this.props);
      this.props.history.push(`/community/index/${id}`);
      request(
        `api/topic/list?page_num=1&page_size=10&label_id=${id}&sortord=0`
      ).then((result) => this.props.changeLabel(result.data));
    };
  }
  render() {
    const { labels } = this.props;
    return (
      <div className={"pc-wrapper"}>
        <h3>圈子</h3>
        <Row style={{ padding: 14 }}>
          {labels.map(({ label_id, label_name, img_name }) => (
            <Col
              key={label_id}
              span={6}
              style={{
                transition: "all .3s",
              }}
            >
              <Link
                to={`/community/index/${label_id}`}
                className={"classification-label"}
                onClick={this.changeLabel(label_id).bind(this)}
              >
                {/* <img src={img_name} alt="star" /> */}
                {img_name === "quanbu" && (
                  <img src={quanbu} width="36" height="34" alt="quanbu" />
                )}
                {img_name === "fenxiang" && (
                  <img src={fenxiang} width="36" height="34" alt="fenxiang" />
                )}
                {img_name === "ziliao" && (
                  <img src={ziliao} width="36" height="34" alt="ziliao" />
                )}
                {img_name === "fankui" && (
                  <img src={fankui} width="36" height="34" alt="fankui" />
                )}
                {img_name === "taolun" && (
                  <img src={taolun} width="36" height="34" alt="taolun" />
                )}
                {img_name === "tucao" && (
                  <img src={tucao} width="36" height="34" alt="tucao" />
                )}
                {img_name === "qita" && (
                  <img src={qita} width="36" height="34" alt="qita" />
                )}
                {img_name === "neitui" && (
                  <img src={neitui} width="36" height="34" alt="neitui" />
                )}
                <span className={"classification-text"}>{label_name}</span>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default withRouter(Classification);
