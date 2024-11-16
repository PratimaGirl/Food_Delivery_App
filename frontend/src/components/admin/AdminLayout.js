// components/admin/AdminLayout.js
import React from 'react';
import AdminDashboard from './AdminDashboard'; // Sidebar component
import './../../styles/AdminLayout.css'; // Optional styling for layout

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminDashboard />
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
