import axios from "axios";

export const fetchNotifications = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/notifications/${userId}`
    );
    const data = response.data.notifications || [];
    console.log("Fetched Notifications:", data); // Log the notifications

    dispatch({
      type: "SET_NOTIFICATIONS",
      payload: data,
    });

    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const markNotificationAsRead = (notificationId) => async (dispatch) => {
  try {
    // Send PATCH request to backend to mark the notification as read
    await axios.patch(
      `http://localhost:5000/api/notifications/${notificationId}`
    );

    // Dispatch action to update Redux store
    dispatch({
      type: "MARK_AS_READ",
      payload: notificationId,
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

export const clearNotifications = () => ({
  type: "CLEAR_NOTIFICATIONS",
});

export const deleteNotification = (notificationId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/notifications/${notificationId}`
    );

    // Dispatch action to remove notification from the state
    dispatch({
      type: "DELETE_NOTIFICATION",
      payload: notificationId,
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
  }
};

// Action to delete all notifications
export const deleteAllNotifications = (userId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/notifications/all/${userId}`);

    // Dispatch action to clear notifications in the state
    dispatch({
      type: "DELETE_ALL_NOTIFICATIONS",
    });
  } catch (error) {
    console.error("Error deleting all notifications:", error);
  }
};


export const updateUnreadCount = () => async (dispatch, getState) => {
    const unreadNotifications = getState().notifications.list.filter(
      (notification) => !notification.isRead
    ).length;
  
    dispatch({
      type: "UPDATE_UNREAD_COUNT",
      payload: unreadNotifications,
    });
  };
  