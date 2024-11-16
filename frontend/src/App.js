// import logo from "./logo.svg";
// import "./App.css";
// import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css"; // Use package name directly
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./components/Home";
// import Login from "./components/Login";
// import MyOrder from "./components/MyOrder";
// import Signup from "./components/Signup";
// import CartPage from "./components/CartPage";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "./redux/actions/userActions";
// import { useEffect } from "react";
// import SuccessPage from "./components/successPage";
// import Navbar from "./components/NavBar";
// import ProfilePage from "./components/ProfilePage";
// import AdminDashboard from "./components/admin/AdminDashboard";
// import AdminRoute from "./components/AdminRoutes";
// import ManageFoodItems from "./components/admin/ManageFoodItems";
// import ManageUsers from "./components/admin/ManageUsers";
// import ManageOrders from "./components/admin/ManageOrders";
// import AddFoodItem from "./components/admin/AddFoodItem";
// import EditFoodItem from "./components/admin/EditFoodItem";

// function App() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const email = localStorage.getItem("userEmail");
//     const userId = localStorage.getItem("userId");

//     if (token && email) {
//       dispatch(loginUser(token, email, userId));
//     }
//   }, [dispatch]);

//   useEffect(() => {}, [user]);

//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route exact path="/" element={<Home />} />
//           <Route exact path="/login" element={<Login />} />
//           <Route exact path="/signup" element={<Signup />} />
//           <Route exact path="/myorder" element={<MyOrder />} />
//           <Route exact path="/cart" element={<CartPage />} />
//           <Route exact path="/success" element={<SuccessPage />} />
//           <Route exact path="/profile" element={<ProfilePage />} />
//           <Route
//             path="/admin"
//             element={
//               <AdminRoute>
//                 <AdminDashboard />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/admin/food-items"
//             element={
//               <AdminRoute>
//                 <ManageFoodItems />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/admin/food-items/add"
//             element={
//               <AdminRoute>
//                 <AddFoodItem />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/admin/users"
//             element={
//               <AdminRoute>
//                 <ManageUsers />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/admin/orders"
//             element={
//               <AdminRoute>
//                 <ManageOrders />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/admin/food-items/edit/:id"
//             element={
//               <AdminRoute>
//                 <EditFoodItem />
//               </AdminRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// App.js
// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "./redux/actions/userActions";
// import Navbar from "./components/NavBar";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import MyOrder from "./components/MyOrder";
// import Signup from "./components/Signup";
// import CartPage from "./components/CartPage";
// import SuccessPage from "./components/successPage";
// import ProfilePage from "./components/ProfilePage";
// import AdminRoute from "./components/AdminRoutes";
// import AdminLayout from "./components/admin/AdminLayout";
// import ManageFoodItems from "./components/admin/ManageFoodItems";
// import ManageUsers from "./components/admin/ManageUsers";
// import ManageOrders from "./components/admin/ManageOrders";
// import AddFoodItem from "./components/admin/AddFoodItem";
// import EditFoodItem from "./components/admin/EditFoodItem";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const email = localStorage.getItem("userEmail");
//     const userId = localStorage.getItem("userId");
//     const isAdmin = localStorage.getItem("isAdmin") === "true"; // Retrieve isAdmin from localStorage
  
//     if (token && email) {
//       dispatch(loginUser(token, email, userId, isAdmin)); // Pass isAdmin to loginUser action
//     }
//   }, [dispatch]);
  

//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route exact path="/" element={<Home />} />
//           <Route exact path="/login" element={<Login />} />
//           <Route exact path="/signup" element={<Signup />} />
//           <Route exact path="/myorder" element={<MyOrder />} />
//           <Route exact path="/cart" element={<CartPage />} />
//           <Route exact path="/success" element={<SuccessPage />} />
//           <Route exact path="/profile" element={<ProfilePage />} />

//           <Route
//             path="/admin"
//             element={
//               <AdminRoute>
//                 <AdminLayout>
//                   <ManageFoodItems />
//                 </AdminLayout>
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/admin/food-items"
//             element={
//               <AdminRoute>
//                 <AdminLayout>
//                   <ManageFoodItems />
//                 </AdminLayout>
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/admin/food-items/add"
//             element={
//               <AdminRoute>
//                 <AdminLayout>
//                   <AddFoodItem />
//                 </AdminLayout>
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/admin/users"
//             element={
//               <AdminRoute>
//                 <AdminLayout>
//                   <ManageUsers />
//                 </AdminLayout>
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/admin/orders"
//             element={
//               <AdminRoute>
//                 <AdminLayout>
//                   <ManageOrders />
//                 </AdminLayout>
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/admin/food-items/edit/:id"
//             element={
//               <AdminRoute>
//                 <AdminLayout>
//                   <EditFoodItem />
//                 </AdminLayout>
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/admin/profile"
//             element={
//               <AdminRoute>
//                 <AdminLayout>
//                   <ProfilePage />
//                 </AdminLayout>
//               </AdminRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/actions/userActions";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import MyOrder from "./components/MyOrder";
import Signup from "./components/Signup";
import CartPage from "./components/CartPage";
import SuccessPage from "./components/successPage";
import ProfilePage from "./components/ProfilePage";
import AdminRoute from "./components/AdminRoutes";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./components/admin/AdminLayout";
import ManageFoodItems from "./components/admin/ManageFoodItems";
import ManageUsers from "./components/admin/ManageUsers";
import ManageOrders from "./components/admin/ManageOrders";
import AddFoodItem from "./components/admin/AddFoodItem";
import EditFoodItem from "./components/admin/EditFoodItem";
import ResetPassword from "./components/ResetPassword";
import Notifications from "./components/Notifications";
import { fetchNotifications } from "./redux/actions/notificationsActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin") === "true"; // Retrieve isAdmin from localStorage
  
    if (token && email) {
      dispatch(loginUser(token, email, userId, isAdmin)); // Pass isAdmin to loginUser action
      console.log('userID:::::::::::>>>>>',userId);
      
      if (userId) {
        dispatch(fetchNotifications(userId));
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ marginTop: "100px" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/reset-password/:token" element={<ResetPassword />} />
          <Route exact path="/notifications" element={<Notifications />} />
          {/* Protected Routes */}
          <Route
            path="/myorder"
            element={<PrivateRoute element={<MyOrder />} />}
          />
          <Route
            path="/cart"
            element={<PrivateRoute element={<CartPage />} />}
          />
          <Route
            path="/success"
            element={<PrivateRoute element={<SuccessPage />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfilePage />} />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={<AdminRoute element={<AdminLayout><ManageFoodItems /></AdminLayout>} />}
          />
          {/* <Route
            path="/admin/food-items"
            element={<AdminRoute element={<AdminLayout><ManageFoodItems /></AdminLayout>} />}
          /> */}
          <Route
            path="/admin/food-items/add"
            element={<AdminRoute element={<AdminLayout><AddFoodItem /></AdminLayout>} />}
          />
          <Route
            path="/admin/users"
            element={<AdminRoute element={<AdminLayout><ManageUsers /></AdminLayout>} />}
          />
          <Route
            path="/admin/orders"
            element={<AdminRoute element={<AdminLayout><ManageOrders /></AdminLayout>} />}
          />
          <Route
            path="/admin/food-items/edit/:id"
            element={<AdminRoute element={<AdminLayout><EditFoodItem /></AdminLayout>} />}
          />
          <Route
            path="/admin/profile"
            element={<AdminRoute element={<AdminLayout><ProfilePage /></AdminLayout>} />}
          />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
