// import React from 'react';
// import { Link } from 'react-router-dom';
// import './../../styles/AdminDashboard.css';

// const AdminDashboard = () => {
//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <nav>
//         <ul>
//           <li><Link to="/admin/food-items">Manage Food Items</Link></li>
//           <li><Link to="/admin/users">Manage Users</Link></li>
//           <li><Link to="/admin/orders">Manage Orders</Link></li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './../../styles/AdminDashboard.css';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// const AdminDashboard = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`dashboard-container ${isOpen ? 'open' : 'closed'}`}>
//       <aside className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
//         <div className="toggle-button" onClick={toggleSidebar}>
//           {isOpen ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
//         </div>
//         {isOpen && (
//           <>
//             <ul className="sidebar-menu">
//               <li><Link to="/admin">Manage Food Items</Link></li>
//               <li><Link to="/admin/users">Manage Users</Link></li>
//               <li><Link to="/admin/orders">Manage Orders</Link></li>
//             </ul>
//           </>
//         )}
//       </aside>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './../../styles/AdminDashboard.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation(); // Access the current location (path)
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to check if the current link is active
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className={`dashboard-container ${isOpen ? 'open' : 'closed'}`}>
      <aside className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
        <div className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
        </div>
        {isOpen && (
          <>
            <ul className="sidebar-menu">
              <li className={isActive('/admin')}><Link to="/admin">Manage Food Items</Link></li>
              <li className={isActive('/admin/users')}><Link to="/admin/users">Manage Users</Link></li>
              <li className={isActive('/admin/orders')}><Link to="/admin/orders">Manage Orders</Link></li>
            </ul>
          </>
        )}
      </aside>
    </div>
  );
};

export default AdminDashboard;
