const initialState = {
  unreadCount: 0,
  list: [],
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        list: action.payload,
        unreadCount: action.payload.filter(
          (notification) => !notification.isRead
        ).length,
      };
    case "MARK_AS_READ":
      return {
        ...state,
        list: state.list.map((notification) =>
          notification._id === action.payload
            ? { ...notification, isRead: true }
            : notification
        ),
        unreadCount: state.unreadCount - 1,
      };
    case "DELETE_NOTIFICATION":
      return {
        ...state,
        list: state.list.filter(
          (notification) => notification._id !== action.payload
        ),
        unreadCount: state.unreadCount > 0 ? state.unreadCount - 1 : 0,
      };
    case "DELETE_ALL_NOTIFICATIONS":
      return {
        ...state,
        list: [],
        unreadCount: 0,
      };
    default:
      return state;
  }
};
