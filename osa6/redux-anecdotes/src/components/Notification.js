import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  let displayStyle;
  const notification = useSelector((state) => state.notification);
  notification ? (displayStyle = "block") : (displayStyle = "none");

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: displayStyle,
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
