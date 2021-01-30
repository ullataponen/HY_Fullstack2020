const initialState = "";

const notificationReducer = (state = initialState, action) => {
  console.log(action.notification);
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    case "UNSET_NOTIFICATION":
      action.notification = "";
      return action.notification;

    default:
      return state;
  }
};

export const setNotification = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    notification,
  };
};

export const unsetNotification = () => {
  return {
    type: "UNSET_NOTIFICATION",
  };
};

export default notificationReducer;
