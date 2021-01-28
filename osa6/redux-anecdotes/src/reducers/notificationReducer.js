const initialState = "Nothing to note";

const notificationReducer = (state = initialState, action) => {
  console.log(action.notification);
  switch (action.type) {
    case "SEND_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export const sendNotification = (notification) => {
  return {
    type: "SEND_NOTIFICATION",
    notification,
  };
};

export default notificationReducer;
