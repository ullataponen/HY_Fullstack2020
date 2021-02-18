const initialState = "";

const notificationReducer = (state = initialState, action) => {
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

let clearNotification;

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    if (clearNotification) {
      clearTimeout(clearNotification);
      clearNotification = null;
    }
    clearNotification = setTimeout(
      () => dispatch(unsetNotification()),
      seconds * 1000
    );
    dispatch({
      type: "SET_NOTIFICATION",
      notification,
    });
  };
};
export const unsetNotification = () => {
  return {
    type: "UNSET_NOTIFICATION",
  };
};

export default notificationReducer;
