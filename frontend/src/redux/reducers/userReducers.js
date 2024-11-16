import { LOGIN_SUCCESS, LOGOUT } from "../actions/types";

// const initialState = {
//   email: localStorage.getItem("userEmail") || null,
//   authToken: localStorage.getItem("token") || null,
//   userId: localStorage.getItem("userId") || null,  // Add userId to Redux state
//   isLoggedIn: !!localStorage.getItem("token"),
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         email: action.payload.userEmail,
//         authToken: action.payload.authToken,
//         userId: action.payload.userId,  // This ensures userId is updated
//         isLoggedIn: true,
//       };    
//     case LOGOUT:
//       return initialState;
//     default:
//       return state;
//   }
// };

// export default userReducer;

const initialState = {
  email: localStorage.getItem("userEmail") || null,
  authToken: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  isAdmin: localStorage.getItem("isAdmin") === "true" || false,
  isLoggedIn: !!localStorage.getItem("token"),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        email: action.payload.userEmail,
        authToken: action.payload.authToken,
        userId: action.payload.userId,
        isAdmin: action.payload.isAdmin,
        isLoggedIn: true,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
