import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/MyOrder.css';

export default function MyOrder() {
  const userId = useSelector((state) => state.user.userId);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/order/${userId}`);
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="container mt-4">
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="row">
          {orders.map((order, index) => (
            <div key={order._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Order #{index + 1}</h5>
                  <p className="card-text"><strong>Status:</strong> {order.status}</p>
                  <p className="card-text"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                  <p className="card-text"><strong>Order Date:</strong> {formatDate(order.createdAt)}</p> {/* Display date and time */}
                  <ul className="list-group list-group-flush">
                    {order.items.map((item) => (
                      <li key={item.foodItemId} className="list-group-item">
                        {item.name} - Quantity: {item.quantity} - ₹{item.totalPrice}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="btn btn-primary mt-3"  style={{ backgroundColor: '#6f42c1', color: 'white' }} onClick={() => navigate('/cart')}>
        Go to Cart
      </button>
    </div>
  );
}
