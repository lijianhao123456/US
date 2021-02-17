import React from "react";
import UserInfo from "../../Community/components/UserInfo.jsx";
import moment from "moment";
export default function User({ topic = {} }) {
  const { user, date_create } = topic;
  const date = moment(date_create).format("YYYY-MM-DD HH:mm:ss");
  console.log(topic);
  return (
    <div className={["topic-detail-desc"]}>
      <UserInfo
        hasTooltip={false}
        showDesc={false}
        className={["topic-detail-author"]}
        showDivider={false}
        dateStyle={{
          fontSize: "14px",
          color: "rgba(0,0,0,.25)",
        }}
        textStyle={{
          marginLeft: "14px",
          marginRight: "20px",
        }}
        user={user}
        date={date}
      />
    </div>
  );
}
