import React from "react";
import { Divider, Tooltip, Avatar } from "antd";

export default ({
  user = {},
  hasTooltip = true,
  showDesc = true,
  avatarSize,
  showDivider = true,
  date,
}) => {
  const { photo: avatar, truename: name = "神秘人", desc } = user;

  return (
    <div>
      <Tooltip trigger="hover" title={desc}>
        <Avatar
          src={avatar}
          style={{
            marginBottom: "17px",
          }}
        ></Avatar>
        <Divider type="vertical" />
        <span>
          <span
            style={{
              fontSize: 14,
              color: "rgba(0,0,0,0.45)",
            }}
          >
            {name}
          </span>
          <span style={{ float: "right" }}>
            <Divider type="vertical" />
            <span>{date}</span>
          </span>
        </span>
      </Tooltip>
    </div>
  );
};
