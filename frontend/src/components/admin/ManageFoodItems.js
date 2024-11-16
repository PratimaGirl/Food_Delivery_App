// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const ManageFoodItems = () => {
//   const [foodItems, setFoodItems] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/food/')
//       .then(response => {
//         console.log('response::::', response.data.foodItems);
//         setFoodItems(response.data.foodItems);
//       })
//       .catch(error => console.error("Error fetching food items:", error));
//   }, []);

//   const deleteFoodItem = (id) => {
//     axios.delete(`http://localhost:5000/api/food/${id}`)
//       .then(() => setFoodItems(foodItems.filter(item => item._id !== id)))
//       .catch(error => console.error("Error deleting food item:", error));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Manage Food Items</h2>
//       <Link to="/admin/food-items/add" className="btn btn-success mb-4">Add New Food Item</Link>
//       <div className="row">
//         {foodItems.length > 0 ? (
//           foodItems.map((item) => (
//             <div key={item._id} className="col-md-4 mb-4">
//               <div className="card h-100">
//                 <img
//                   src={item.imageUrl}
//                   className="card-img-top"
//                   alt={item.name}
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{item.name}</h5>
//                   <p className="card-text">
//                     <strong>Ingredients:</strong> {item.ingredients.join(", ")}
//                   </p>
//                   <p className="card-text">
//                     <strong>Restaurant:</strong> {item.restaurantName}
//                   </p>
//                   <p className="card-text">
//                     <strong>Rating:</strong> {item.starRating} ⭐
//                   </p>
//                   <p className="card-text">
//                     <strong>Price:</strong> ₹{item.price}
//                   </p>
//                   <div className="d-flex justify-content-between">
//                     <Link to={`/admin/food-items/edit/${item._id}`} className="btn btn-warning">Edit</Link>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => deleteFoodItem(item._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No food items available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageFoodItems;





// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify'; // Import toast
// import 'react-toastify/dist/ReactToastify.css'; // Import the toast CSS
// import { FaEdit, FaTrash } from 'react-icons/fa';

// const ManageFoodItems = () => {
//   const [foodItems, setFoodItems] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/food/')
//       .then(response => {
//         console.log('response::::', response.data.foodItems);
//         setFoodItems(response.data.foodItems);
//       })
//       .catch(error => console.error("Error fetching food items:", error));
//   }, []);

//   const deleteFoodItem = (id) => {
//     // Show confirmation popup
//     const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    
//     if (confirmDelete) {
//       axios.delete(`http://localhost:5000/api/food/${id}`)
//         .then(() => {
//           // Filter out the deleted item from the state
//           setFoodItems(foodItems.filter(item => item._id !== id));
//           // Show success toast notification
//           toast.success("Food item deleted successfully!");
//         })
//         .catch(error => {
//           console.error("Error deleting food item:", error);
//           // Show error toast notification
//           toast.error("Failed to delete food item.");
//         });
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Manage Food Items</h2>
//       <Link to="/admin/food-items/add" className="btn btn-success mb-4">Add New Food Item</Link>
//       <div className="row">
//         {foodItems.length > 0 ? (
//           foodItems.map((item) => (
//             <div key={item._id} className="col-md-4 mb-4">
//               <div className="card h-100">
//                 <img
//                   src={item.imageUrl}
//                   className="card-img-top"
//                   alt={item.name}
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{item.name}</h5>
//                   <p className="card-text">
//                     <strong>Ingredients:</strong> {item.ingredients.join(", ")}
//                   </p>
//                   <p className="card-text">
//                     <strong>Restaurant:</strong> {item.restaurantName}
//                   </p>
//                   <p className="card-text">
//                     <strong>Rating:</strong> {item.starRating} ⭐
//                   </p>
//                   <p className="card-text">
//                     <strong>Price:</strong> ₹{item.price}
//                   </p>
//                   <div className="d-flex justify-content-between">
//                     <Link to={`/admin/food-items/edit/${item._id}`} className="btn btn-warning"><FaEdit /></Link>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => deleteFoodItem(item._id)}
//                     > <FaTrash />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No food items available</p>
//         )}
//       </div>
//       <ToastContainer /> {/* Add ToastContainer to display toast notifications */}
//     </div>
//   );
// };

// export default ManageFoodItems;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import the toast CSS
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap'; // Importing modal components
import './../../App.css'
import AddFoodItem from './AddFoodItem';
const ManageFoodItems = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editFoodItem, setEditFoodItem] = useState({
    name: '',
    ingredients: '',
    restaurantName: '',
    starRating: 0,
    price: 0,
    imageUrl: ''
  });

  // Fetch food items
  useEffect(() => {
    axios.get('http://localhost:5000/api/food/')
      .then(response => {
        setFoodItems(response.data.foodItems);
      })
      .catch(error => console.error("Error fetching food items:", error));
  }, []);

  const deleteFoodItem = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/api/food/${id}`)
        .then(() => {
          setFoodItems(foodItems.filter(item => item._id !== id));
          toast.success("Food item deleted successfully!");
        })
        .catch(error => {
          console.error("Error deleting food item:", error);
          toast.error("Failed to delete food item.");
        });
    }
  };

  const openEditModal = (foodItem) => {
    setEditFoodItem(foodItem);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
    setEditFoodItem({
      name: '',
      ingredients: '',
      restaurantName: '',
      starRating: 0,
      price: 0,
      imageUrl: ''
    });
  };

  const handleEditChange = (e) => {
    setEditFoodItem({
      ...editFoodItem,
      [e.target.name]: e.target.value
    });
  };

  const updateFoodItem = () => {
    axios.put(`http://localhost:5000/api/food/edit/${editFoodItem._id}`, editFoodItem)
      .then(() => {
        const updatedFoodItems = foodItems.map(item => 
          item._id === editFoodItem._id ? editFoodItem : item
        );
        setFoodItems(updatedFoodItems);
        toast.success("Food item updated successfully!");
        closeEditModal();
      })
      .catch(error => {
        console.error("Error updating food item:", error);
        toast.error("Failed to update food item.");
      });
  };

  return (
    <div className="container">
      <h2>Manage Food Items</h2>
      <Button variant="success" onClick={() => setShowAddModal(true)} className="mb-4">
  <FaPlus /> Add New Food Item
</Button>

      <div className="row">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={item.imageUrl}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    <strong>Ingredients:</strong> {item.ingredients.join(", ")}
                  </p>
                  <p className="card-text">
                    <strong>Restaurant:</strong> {item.restaurantName}
                  </p>
                  <p className="card-text">
                    <strong>Rating:</strong> {item.starRating} ⭐
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{item.price}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning"
                      onClick={() => openEditModal(item)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteFoodItem(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No food items available</p>
        )}
      </div>

      {/* Edit Food Item Modal */}
      <Modal show={showModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Food Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFoodName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter food name"
                name="name"
                value={editFoodItem.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formFoodIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ingredients"
                name="ingredients"
                value={editFoodItem.ingredients}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formRestaurantName">
              <Form.Label>Restaurant</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter restaurant name"
                name="restaurantName"
                value={editFoodItem.restaurantName}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formFoodRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rating"
                name="starRating"
                value={editFoodItem.starRating}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formFoodPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={editFoodItem.price}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formFoodImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="imageUrl"
                value={editFoodItem.imageUrl}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>Close</Button>
          <Button variant="primary" onClick={updateFoodItem}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header>
          <Modal.Title>Add New Food Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddFoodItem />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer />
    </div>
  );
};

export default ManageFoodItems;
