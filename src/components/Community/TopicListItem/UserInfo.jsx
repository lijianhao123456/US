import React from "react";
import { Divider, Tooltip, Avatar } from "antd";

export default ({
  user = {},
  hasTooltip = true,
  showDesc = true,
  className,
  textStyle = {},
  dateStyle = {},
  avatarSize,
  showDivider = true,
  date,
}) => {
  const { photo: avatar, truename: name = "神秘人", desc } = user;

  return (
    <div>
      <Tooltip trigger="hover" title={desc}>
        <Avatar style={{ backgroundColor: "#20a4ff", color: "#fff" }}></Avatar>
        <Divider type="vertical" />
        <span>
          <span>{name}</span>
          <span style={{ float: "right" }}>
            <Divider type="vertical" />
            <span>{date}</span>
          </span>
        </span>
      </Tooltip>
    </div>
  );
};
