export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = "LOGOUT";
// export const loginUser = (token, email, userId) => {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: { authToken: token, email, userId },
//   };
// };


// export const login = (credentials) => {
//   return async (dispatch) => {
//     const response = await fetch("http://localhost:5000/api/user/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(credentials),
//     });

//     const json = await response.json();

//     if (json.success) {
//       // Store token, email, and userId in localStorage
//       localStorage.setItem("token", json.authToken);
//       localStorage.setItem("userEmail", json.email);  // Store email in localStorage
//       localStorage.setItem("userId", json.userId);    // Store userId in localStorage

//       dispatch(loginUser(json.authToken, json.email, json.userId));  // Dispatch user data to Redux
//       return true;
//     } else {
//       alert("Enter Valid Credentials");
//       return false;
//     }
//   };
// };

export const loginUser = (token, email, userId, isAdmin) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { authToken: token, email, userId, isAdmin },
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("userEmail", json.email);
      localStorage.setItem("userId", json.userId);
      localStorage.setItem("isAdmin", json.isAdmin);

      dispatch(loginUser(json.authToken, json.email, json.userId, json.isAdmin));
      return true;
    } else {
      alert("Enter Valid Credentials");
      return false;
    }
  };
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
  return {
    type: LOGOUT,
  };
};
