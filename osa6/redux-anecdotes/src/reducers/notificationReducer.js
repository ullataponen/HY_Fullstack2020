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

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification,
    });
    setTimeout(() => dispatch(unsetNotification()), seconds * 1000);
  };
};
export const unsetNotification = () => {
  return {
    type: "UNSET_NOTIFICATION",
  };
};

export default notificationReducer;
