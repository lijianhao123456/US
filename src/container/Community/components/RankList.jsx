import React from "react";
import { Divider, Col } from "antd";
import "./RankList.less";
import UserInfo from "../../../components/UserInfo/UserInfo.jsx";
import no1 from "../../../assets/icon/no1.svg";
import no2 from "../../../assets/icon/no2.svg";
import no3 from "../../../assets/icon/no3.svg";

export default function RankList(props) {
  const { rank, myInfo } = props;
  const rankList = [...rank].slice(0, 5);
  return (
    <Col
      xs={{ span: 24 }}
      sm={{ span: 11 }}
      md={{ span: 24 }}
      style={{ marginBottom: 16, height: "100%" }}
    >
      <div className={"birthday-wrapper"}>
        <h3 className={"title"}>
          <span style={{ float: "left" }}>活跃度排行榜</span>
        </h3>
        <div className="rank-list-content">
          {rank.length > 0 ? (
            <ul className="rank-list">
              {rankList.map((user, index) => (
                <li key={user.user_id}>
                  <RankListItem data={user} rank={index + 1} />
                </li>
              ))} 
              <Divider style={{ margin: "10px 0" }} />
              <li>
                <RankListItem data={myInfo} rank={myInfo.activity_rank} />
              </li>
            </ul>
          ) : (
            <div>
              <p className="birthday-empty-text">当前暂无排名</p>
            </div>
          )}
        </div>
      </div>
    </Col>
  );
}

function RankListItem(props) {
  const { data: user, rank } = props;
  return (
    <div className="rank-list-item">
      <div className="rank">
        {rank === 1 ? (
          <img src={no1} width={24} />
        ) : rank === 2 ? (
          <img src={no2} width={24} />
        ) : rank === 3 ? (
          <img src={no3} width={24} />
        ) : (
          <span className="rank-text">{rank}</span>
        )}
      </div>
      <div className="rank-list-item-user">
        <UserInfo
          user={user}
          showDivider={false}
          hasTooltip = {false}
          textStyle={{
            marginLeft: "10px",
            fontSize: "14px",
          }}
        />
      </div>
      <div className="rank-list-active">{Number(user.activity).toFixed(2)}</div>
    </div>
  );
}
