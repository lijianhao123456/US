import React from "react";
import { Divider, Tooltip, Avatar } from "antd";

export default ({
  user = {},
  hasTooltip = true,
  avatarSize = "default",
  textStyle,
  dateStyle,
  showDivider = true,
  vertical = false,
  date,
}) => {
  const { photo: avatar, truename: name = "神秘人", desc } = user;

  return (
    <div>
      {hasTooltip ? (
        <Tooltip trigger="hover" title={desc}>
          <div style={vertical ? null : { display: "inline-block" }}>
            {avatar ? (
              <Avatar src={avatar} size={avatarSize}></Avatar>
            ) : (
              <Avatar size={avatarSize} style={{ backgroundColor: "#20a4ff", color: "#fff" }}>
                {name.split("")[0]}
              </Avatar>
            )}
          </div>
          {showDivider ? <Divider type="vertical" /> : null}
          <span>
            <span
              style={
                textStyle
                  ? textStyle
                  : {
                      fontSize: 14,
                      color: "rgba(0,0,0,0.45)",
                    }
              }
            >
              {name}
            </span>
            {date ? (
              <span
                style={
                  dateStyle
                    ? dateStyle
                    : {
                        float: "right",
                        lineHeight: "2.8em",
                        color: "#7b7b7b",
                        fontSize: "12px",
                        height: "100%",
                        marginRight: "4px",
                      }
                }
              >
                {showDivider ? <Divider type="vertical" /> : null}
                <span>{date}</span>
              </span>
            ) : null}
          </span>
        </Tooltip>
      ) : (
        <div>
          <Avatar src={avatar}></Avatar>
          {showDivider ? <Divider type="vertical" /> : null}
          <span>
            <span
              style={
                textStyle
                  ? textStyle
                  : {
                      fontSize: 14,
                      color: "rgba(0,0,0,0.45)",
                    }
              }
            >
              {name}
            </span>
            {date ? (
              <span
                style={
                  dateStyle
                    ? dateStyle
                    : {
                        float: "right",
                        lineHeight: "2.8em",
                        color: "#7b7b7b",
                        fontSize: "12px",
                        height: "100%",
                        marginRight: "4px",
                      }
                }
              >
                {showDivider ? <Divider type="vertical" /> : null}
                <span>{date}</span>
              </span>
            ) : null}
          </span>
        </div>
      )}
    </div>
  );
};
