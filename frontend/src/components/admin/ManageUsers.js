// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper } from "@mui/material";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [orderBy, setOrderBy] = useState("name");
//   const [order, setOrder] = useState("asc");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const { authToken } = useSelector((state) => state.user);

//   useEffect(() => {
//     // Fetch all users
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/user", {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [authToken]);

//   // Sorting functionality
//   const handleRequestSort = (property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   // Sorting logic
//   const sortData = (array) => {
//     return array.sort((a, b) => {
//       if (orderBy === "name") {
//         return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
//       } else if (orderBy === "email") {
//         return order === "asc" ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
//       } else if (orderBy === "location") {
//         return order === "asc" ? a.location.localeCompare(b.location) : b.location.localeCompare(a.location);
//       } else {
//         return order === "asc" ? a.mobile - b.mobile : b.mobile - a.mobile;
//       }
//     });
//   };

//   // Handle pagination
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const sortedUsers = sortData(users);
//   const displayedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <div className="container" style={{ marginTop: "100px" }}>
//       <h2>All Users</h2>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle">
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "name"}
//                   direction={orderBy === "name" ? order : "asc"}
//                   onClick={() => handleRequestSort("name")}
//                 >
//                   Name
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "email"}
//                   direction={orderBy === "email" ? order : "asc"}
//                   onClick={() => handleRequestSort("email")}
//                 >
//                   Email
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "location"}
//                   direction={orderBy === "location" ? order : "asc"}
//                   onClick={() => handleRequestSort("location")}
//                 >
//                   Location
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "mobile"}
//                   direction={orderBy === "mobile" ? order : "asc"}
//                   onClick={() => handleRequestSort("mobile")}
//                 >
//                   Mobile
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>Admin</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayedUsers.length > 0 ? (
//               displayedUsers.map((user) => (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.location}</TableCell>
//                   <TableCell>{user.mobile || "N/A"}</TableCell>
//                   <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   No users found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 15]}
//         component="div"
//         count={users.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </div>
//   );
// };

// export default ManageUsers;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   TablePagination,
//   Paper,
//   Button,
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify"; // Import toast
// import "react-toastify/dist/ReactToastify.css";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [orderBy, setOrderBy] = useState("name");
//   const [order, setOrder] = useState("asc");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const { authToken } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/user", {
//           headers: { Authorization: `Bearer ${authToken}` },
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [authToken]);

//   const handleRequestSort = (property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const sortData = (array) => {
//     return array.sort((a, b) => {
//       if (orderBy === "name")
//         return order === "asc"
//           ? a.name.localeCompare(b.name)
//           : b.name.localeCompare(a.name);
//       else if (orderBy === "email")
//         return order === "asc"
//           ? a.email.localeCompare(b.email)
//           : b.email.localeCompare(a.email);
//       else if (orderBy === "location")
//         return order === "asc"
//           ? a.location.localeCompare(b.location)
//           : b.location.localeCompare(a.location);
//       else return order === "asc" ? a.mobile - b.mobile : b.mobile - a.mobile;
//     });
//   };

//   const handleEditUser = (user) => {
//     // Redirect to edit page or open a modal with user info
//     // Here, you'd implement an edit form or modal popup
//     console.log("Editing user:", user);
//   };

//   const handleDeleteUser = (userId) => {
//     // Show confirmation popup
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this item?"
//     );

//     if (confirmDelete) {
//       axios
//         .delete(`http://localhost:5000/api/user/${userId}`)
//         .then(() => {
//           // Filter out the deleted item from the state
//           setUsers((prevUsers) =>
//             prevUsers.filter((user) => user._id !== userId)
//           );
//           // Show success toast notification
//           toast.success("User deleted successfully!");
//         })
//         .catch((error) => {
//           console.error("Error deleting user:", error);
//           // Show error toast notification
//           toast.error("Failed to delete user.");
//         });
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const sortedUsers = sortData(users);
//   const displayedUsers = sortedUsers.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <div className="container">
//       <h2>All Users</h2>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle">
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "name"}
//                   direction={orderBy === "name" ? order : "asc"}
//                   onClick={() => handleRequestSort("name")}
//                 >
//                   Name
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "email"}
//                   direction={orderBy === "email" ? order : "asc"}
//                   onClick={() => handleRequestSort("email")}
//                 >
//                   Email
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "location"}
//                   direction={orderBy === "location" ? order : "asc"}
//                   onClick={() => handleRequestSort("location")}
//                 >
//                   Location
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "mobile"}
//                   direction={orderBy === "mobile" ? order : "asc"}
//                   onClick={() => handleRequestSort("mobile")}
//                 >
//                   Mobile
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>Admin</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayedUsers.length > 0 ? (
//               displayedUsers.map((user) => (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.location}</TableCell>
//                   <TableCell>{user.mobile || "N/A"}</TableCell>
//                   <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
//                   <TableCell>
//                     <div style={{ display: "flex", gap: "10px" }}>
//                       <div onClick={() => handleEditUser(user)}>
//                         <FaEdit style={{ color: "blue", cursor: "pointer" }} />
//                       </div>
//                       <div onClick={() => handleDeleteUser(user._id)}>
//                         <FaTrash style={{ color: "red", cursor: "pointer" }} />
//                       </div>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No users found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 15]}
//         component="div"
//         count={users.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//       <ToastContainer />
//     </div>
//   );
// };

// export default ManageUsers;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   TablePagination,
//   Paper,
//   Button,
//   Modal,
//   Box,
//   TextField,
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "./../../styles/ManageUser.css";
// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [orderBy, setOrderBy] = useState("name");
//   const [order, setOrder] = useState("asc");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [editUser, setEditUser] = useState(null);
//   const { authToken } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/user", {
//           headers: { Authorization: `Bearer ${authToken}` },
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [authToken]);

//   const handleRequestSort = (property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const sortData = (array) => {
//     return array.sort((a, b) => {
//       if (orderBy === "name")
//         return order === "asc"
//           ? a.name.localeCompare(b.name)
//           : b.name.localeCompare(a.name);
//       else if (orderBy === "email")
//         return order === "asc"
//           ? a.email.localeCompare(b.email)
//           : b.email.localeCompare(a.email);
//       else if (orderBy === "location")
//         return order === "asc"
//           ? a.location.localeCompare(b.location)
//           : b.location.localeCompare(a.location);
//       else return order === "asc" ? a.mobile - b.mobile : b.mobile - a.mobile;
//     });
//   };

//   const handleEditUser = (user) => {
//     setEditUser(user);
//     setOpenEditModal(true);
//   };

//   const handleEditChange = (event) => {
//     setEditUser({
//       ...editUser,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleEditSubmit = async () => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/user/profile/${editUser._id}`,
//         editUser,
//         { headers: { Authorization: `Bearer ${authToken}` } }
//       );
//       setUsers((prevUsers) =>
//         prevUsers.map((user) => (user._id === editUser._id ? editUser : user))
//       );
//       toast.success("User updated successfully!");
//       setOpenEditModal(false);
//     } catch (error) {
//       console.error("Error updating user:", error);
//       toast.error("Failed to update user.");
//     }
//   };

//   const handleDeleteUser = (userId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (confirmDelete) {
//       axios
//         .delete(`http://localhost:5000/api/user/${userId}`)
//         .then(() => {
//           setUsers((prevUsers) =>
//             prevUsers.filter((user) => user._id !== userId)
//           );
//           toast.success("User deleted successfully!");
//         })
//         .catch((error) => {
//           console.error("Error deleting user:", error);
//           toast.error("Failed to delete user.");
//         });
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const sortedUsers = sortData(users);
//   const displayedUsers = sortedUsers.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <div className="container">
//       <h2>All Users</h2>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle">
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "name"}
//                   direction={orderBy === "name" ? order : "asc"}
//                   onClick={() => handleRequestSort("name")}
//                 >
//                   Name
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "email"}
//                   direction={orderBy === "email" ? order : "asc"}
//                   onClick={() => handleRequestSort("email")}
//                 >
//                   Email
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "location"}
//                   direction={orderBy === "location" ? order : "asc"}
//                   onClick={() => handleRequestSort("location")}
//                 >
//                   Location
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "mobile"}
//                   direction={orderBy === "mobile" ? order : "asc"}
//                   onClick={() => handleRequestSort("mobile")}
//                 >
//                   Mobile
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>Admin</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayedUsers.length > 0 ? (
//               displayedUsers.map((user) => (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.location}</TableCell>
//                   <TableCell>{user.mobile || "N/A"}</TableCell>
//                   <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
//                   <TableCell>
//                     <div style={{ display: "flex", gap: "10px" }}>
//                       <div onClick={() => handleEditUser(user)}>
//                         <FaEdit style={{ color: "blue", cursor: "pointer" }} />
//                       </div>
//                       <div onClick={() => handleDeleteUser(user._id)}>
//                         <FaTrash style={{ color: "red", cursor: "pointer" }} />
//                       </div>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No users found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 15]}
//         component="div"
//         count={users.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />

//       <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
//         <Box className="modalBox">
//           <h2 className="modalHeader">Edit User</h2>
//           <TextField
//             label="Name"
//             name="name"
//             value={editUser?.name || ""}
//             onChange={handleEditChange}
//             fullWidth
//             className="modalInput"
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={editUser?.email || ""}
//             onChange={handleEditChange}
//             fullWidth
//             className="modalInput"
//           />
//           <TextField
//             label="Location"
//             name="location"
//             value={editUser?.location || ""}
//             onChange={handleEditChange}
//             fullWidth
//             className="modalInput"
//           />
//           <TextField
//             label="Mobile"
//             name="mobile"
//             value={editUser?.mobile || ""}
//             onChange={handleEditChange}
//             fullWidth
//             className="modalInput"
//           />
//           <Button
//             onClick={handleEditSubmit}
//             variant="contained"
//             color="primary"
//             className="modalButton"
//           >
//             Save Changes
//           </Button>
//         </Box>
//       </Modal>

//       <ToastContainer />
//     </div>
//   );
// };

// export default ManageUsers;



import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import './../../App.css'
import { Modal, Button, Form } from 'react-bootstrap';
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { authToken } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    location: '',
    mobile: '',
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/user",{
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, [authToken]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortData = (array) => {
    return array.sort((a, b) => {
      if (orderBy === "name")
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      else if (orderBy === "email")
        return order === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      else if (orderBy === "location")
        return order === "asc"
          ? a.location.localeCompare(b.location)
          : b.location.localeCompare(a.location);
      else return order === "asc" ? a.mobile - b.mobile : b.mobile - a.mobile;
    });
  };

  const openEditModal = (foodItem) => {
    setEditUser(foodItem);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
    setEditUser({
      name: '',
      email: '',
      location: '',
      mobile: '',
    });
  };

  const handleEditChange = (event) => {
    setEditUser({
      ...editUser,
      [event.target.name]: event.target.value,
    });
  };

  const updateFoodItem = () => {
    axios.put(`http://localhost:5000/api/user/profile/${editUser._id}`, editUser)
      .then(() => {
        const updatedUsers = users.map((user) =>
          user._id === editUser._id ? { ...user, ...editUser } : user
        );
        setUsers(updatedUsers);
        toast.success("User updated successfully!");
        closeEditModal();
      })
      .catch(error => {
        console.error("Error updating User:", error);
        toast.error("Failed to update User.");
      });
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/user/${userId}`)
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
          toast.success("User deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user.");
        });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedUsers = sortData(users);
  const displayedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="container">
      <h2>All Users</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "email"}
                  direction={orderBy === "email" ? order : "asc"}
                  onClick={() => handleRequestSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "location"}
                  direction={orderBy === "location" ? order : "asc"}
                  onClick={() => handleRequestSort("location")}
                >
                  Location
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "mobile"}
                  direction={orderBy === "mobile" ? order : "asc"}
                  onClick={() => handleRequestSort("mobile")}
                >
                  Mobile
                </TableSortLabel>
              </TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>{user.mobile || "N/A"}</TableCell>
                  <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div onClick={() => openEditModal(user)}>
                        <FaEdit style={{ color: "blue", cursor: "pointer" }} />
                      </div>
                      <div onClick={() => handleDeleteUser(user._id)}>
                        <FaTrash style={{ color: "red", cursor: "pointer" }} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <Modal show={showModal} onHide={closeEditModal}>
        <Modal.Header>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFoodName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User name"
                name="name"
                value={editUser?.name || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
               typr = "text"
               label="Email"
               name="email"
               value={editUser?.email || ""}
               onChange={handleEditChange}
               fullWidth
               className="modalInput"
              />
            </Form.Group>
            <Form.Group controlId="formRestaurantName">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                label="Location"
                name="location"
                value={editUser?.location || ""}
                onChange={handleEditChange}
                fullWidth
                className="modalInput"
              />
            </Form.Group>
            <Form.Group controlId="formFoodRating">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                label="Mobile"
                name="mobile"
                value={editUser?.mobile || ""}
                onChange={handleEditChange}
                fullWidth
                className="modalInput"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>Close</Button>
          <Button variant="primary" onClick={updateFoodItem}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ToastContainer />
    </div>
  );
};

export default ManageUsers;
