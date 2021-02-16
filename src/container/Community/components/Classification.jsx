import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import quanbu from "../../../assets/icon/quanbu.svg";
import fenxiang from "../../../assets/icon/fenxiang.svg";
import ziliao from "../../../assets/icon/ziliao.svg";
import fankui from "../../../assets/icon/fankui.svg";
import taolun from "../../../assets/icon/taolun.svg";
import tucao from "../../../assets/icon/tucao.svg";
import qita from "../../../assets/icon/qita.svg";
import neitui from "../../../assets/icon/neitui.svg";

class Classification extends React.Component {
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
              >
                {/* <img src={img_name} alt="star" /> */}
                {img_name === "quanbu" && (
                  <img
                    src={quanbu}
                    style={{ width: 36, height: 34 }}
                    alt="quanbu"
                  />
                )}
                {img_name === "fenxiang" && (
                  <img
                    src={fenxiang}
                    style={{ width: 36, height: 34 }}
                    alt="fenxiang"
                  />
                )}
                {img_name === "ziliao" && (
                  <img
                    src={ziliao}
                    style={{ width: 36, height: 34 }}
                    alt="ziliao"
                  />
                )}
                {img_name === "fankui" && (
                  <img
                    src={fankui}
                    style={{ width: 36, height: 34 }}
                    alt="fankui"
                  />
                )}
                {img_name === "taolun" && (
                  <img
                    src={taolun}
                    style={{ width: 36, height: 34 }}
                    alt="taolun"
                  />
                )}
                {img_name === "tucao" && (
                  <img
                    src={tucao}
                    style={{ width: 36, height: 34 }}
                    alt="tucao"
                  />
                )}
                {img_name === "qita" && (
                  <img
                    src={qita}
                    style={{ width: 36, height: 34 }}
                    alt="qita"
                  />
                )}
                {img_name === "neitui" && (
                  <img
                    src={neitui}
                    style={{ width: 36, height: 34 }}
                    alt="neitui"
                  />
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

export default Classification;
