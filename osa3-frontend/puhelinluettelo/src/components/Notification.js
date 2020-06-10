import React from "react";

const Notification = ({ message }) => {
	if (message.includes("Error")) {
		return <div className="error">{message}</div>;
	} else if (message.includes("successfully")) {
		return <div className="success">{message}</div>;
	} else {
		return null;
	}
};

export default Notification;
