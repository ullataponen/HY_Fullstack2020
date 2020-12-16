import React from "react";
import PropTypes from "prop-types";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else if (message.includes("error") || message.includes("Wrong")) {
    return <div className="error">{message}</div>;
  }

  return <div className="success">{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
