// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./../styles/Notifications.css";
// import { fetchNotifications } from "../redux/actions/notificationsActions";

// export default function Notifications() {
//   const userId = useSelector((state) => state.user.userId);
//   const [notifications, setNotifications] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (userId) {
//       // Call fetchNotifications and await the result
//       dispatch(fetchNotifications(userId)).then((data) => {
//         setNotifications(data); // Set the notifications in state
//       });
//     }
//   }, [userId, dispatch]);

//   return (
//     <div className="notifications">
//       <h3>Notifications</h3>
//       {Array.isArray(notifications) && notifications.length === 0 ? (
//         <p>No notifications available.</p>
//       ) : (
//         <ul>
//           {notifications.map((notification) => (
//             <li
//               key={notification._id}
//               className={notification.isRead ? "read" : "unread"}
//             >
//               {notification.message}
//               <small>{new Date(notification.createdAt).toLocaleString()}</small>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllNotifications,
  deleteNotification,
  fetchNotifications,
  markNotificationAsRead,
} from "../redux/actions/notificationsActions";
import "./../styles/Notifications.css";

export default function Notifications() {
  const userId = useSelector((state) => state.user.userId);
  const notifications = useSelector((state) => state.notifications.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchNotifications(userId));
    }
  }, [userId, dispatch]);

  const handleNotificationClick = (notificationId) => {
    // Dispatch action to mark notification as read when clicked
    dispatch(markNotificationAsRead(notificationId));
  };

  const handleDeleteNotification = (notificationId) => {
    // Dispatch action to delete a specific notification
    dispatch(deleteNotification(notificationId));
  };

  const handleClearAll = () => {
    // Dispatch action to delete all notifications
    dispatch(deleteAllNotifications(userId));
  };

  return (
    <div className="notifications">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button className="clear-all-btn" onClick={handleClearAll}>
          Clear All
        </button>
      </div>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={notification.isRead ? "read" : "unread"}
              onClick={() => handleNotificationClick(notification._id)}
            >
              <span>{notification.message}</span>
              <small>{new Date(notification.createdAt).toLocaleString()}</small>
              <button
                className="close-btn"
                onClick={() => handleDeleteNotification(notification._id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
