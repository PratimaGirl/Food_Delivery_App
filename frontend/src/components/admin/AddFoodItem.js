// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import '../../styles/AddFoodItem.css';
// // import { useNavigate } from 'react-router-dom';

// // const AddFoodItem = () => {
// //   const navigate = useNavigate(); 

// //   const [foodData, setFoodData] = useState({
// //     name: '', ingredients: '', restaurantName: '', starRating: '', price: '', imageUrl: ''
// //   });

// //   const handleChange = (e) => {
// //     setFoodData({ ...foodData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     axios.post('http://localhost:5000/api/food', foodData)
// //       .then(response => {
// //         console.log(response);
// //         // Navigate to the ManageFoodItems page after successfully adding the food item
// //         navigate('/admin/food-items');
// //       })
// //       .catch(error => console.error("Error adding food item:", error));
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <h2>Add New Food Item</h2>
// //       <input type="text" name="name" placeholder="Name" onChange={handleChange} />
// //       <input type="text" name="ingredients" placeholder="Ingredients" onChange={handleChange} />
// //       <input type="text" name="restaurantName" placeholder="Restaurant" onChange={handleChange} />
// //       <input type="number" name="starRating" placeholder="Rating" onChange={handleChange} />
// //       <input type="number" name="price" placeholder="Price" onChange={handleChange} />
// //       <input type="text" name="imageUrl" placeholder="Image URL" onChange={handleChange} />
// //       <button className='food-button' type="submit">Add Item</button>
// //     </form>
// //   );
// // };

// // export default AddFoodItem;


// import React, { useState } from 'react';
// import axios from 'axios';
// import '../../styles/AddFoodItem.css';
// import { useNavigate } from 'react-router-dom';

// const AddFoodItem = () => {
//   const navigate = useNavigate();

//   const [foodData, setFoodData] = useState({
//     name: '',
//     ingredients: [''],
//     restaurantName: '',
//     starRating: '',
//     price: '',
//     imageUrl: ''
//   });

//   const handleChange = (e) => {
//     setFoodData({ ...foodData, [e.target.name]: e.target.value });
//   };

//   const handleIngredientChange = (index, value) => {
//     const updatedIngredients = [...foodData.ingredients];
//     updatedIngredients[index] = value;
//     setFoodData({ ...foodData, ingredients: updatedIngredients });
//   };

//   const handleAddIngredient = () => {
//     setFoodData({ ...foodData, ingredients: [...foodData.ingredients, ''] });
//   };

//   const handleRemoveIngredient = (index) => {
//     const updatedIngredients = foodData.ingredients.filter((_, i) => i !== index);
//     setFoodData({ ...foodData, ingredients: updatedIngredients });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:5000/api/food', foodData)
//       .then(response => {
//         console.log(response);
//         navigate('/admin/food-items');
//       })
//       .catch(error => console.error("Error adding food item:", error));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add New Food Item</h2>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         onChange={handleChange}
//         value={foodData.name}
//         required
//       />
//       <div>
//         <label>Ingredients:</label>
//         {foodData.ingredients.map((ingredient, index) => (
//           <div key={index} className="ingredient-input-group">
//             <input
//               type="text"
//               placeholder="Ingredient"
//               value={ingredient}
//               onChange={(e) => handleIngredientChange(index, e.target.value)}
//               required
//             />
//             {index > 0 && (
//               <button
//                 type="button"
//                 className="remove-btn"
//                 onClick={() => handleRemoveIngredient(index)}
//               >
//                 &#10005; {/* Cross mark */}
//               </button>
//             )}
//           </div>
//         ))}
//         <div className="add-ingredient-button">
//           <button className='add-ingredient' type="button" onClick={handleAddIngredient}>Add Ingredient</button>
//         </div>
//       </div>
//       <input
//         type="text"
//         name="restaurantName"
//         placeholder="Restaurant"
//         onChange={handleChange}
//         value={foodData.restaurantName}
//         required
//       />
//       <input
//         type="number"
//         name="starRating"
//         placeholder="Rating"
//         onChange={handleChange}
//         value={foodData.starRating}
//         required
//       />
//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         onChange={handleChange}
//         value={foodData.price}
//         required
//       />
//       <input
//         type="text"
//         name="imageUrl"
//         placeholder="Image URL"
//         onChange={handleChange}
//         value={foodData.imageUrl}
//       />
//       <button className='food-button' type="submit">Add Item</button>
//     </form>
//   );
// };

// export default AddFoodItem;





// import React, { useState } from 'react';
// import axios from 'axios';
// import '../../styles/AddFoodItem.css';
// import { useNavigate } from 'react-router-dom';
// import { FaPlus } from 'react-icons/fa'; // Importing the plus icon from react-icons

// const AddFoodItem = () => {
//   const navigate = useNavigate();

//   const [foodData, setFoodData] = useState({
//     name: '',
//     ingredients: [''],  // Start with one empty ingredient
//     restaurantName: '',
//     starRating: '',
//     price: '',
//     imageUrl: ''
//   });

//   const handleChange = (e) => {
//     setFoodData({ ...foodData, [e.target.name]: e.target.value });
//   };

//   const handleIngredientChange = (index, value) => {
//     const updatedIngredients = [...foodData.ingredients];
//     updatedIngredients[index] = value;
//     setFoodData({ ...foodData, ingredients: updatedIngredients });
//   };

//   const handleAddIngredient = () => {
//     setFoodData({ ...foodData, ingredients: [...foodData.ingredients, ''] });
//   };

//   const handleRemoveIngredient = (index) => {
//     const updatedIngredients = foodData.ingredients.filter((_, i) => i !== index);
//     setFoodData({ ...foodData, ingredients: updatedIngredients });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:5000/api/food', foodData)
//       .then(response => {
//         console.log(response);
//         navigate('/admin/food-items');
//       })
//       .catch(error => console.error("Error adding food item:", error));
//   };

//   return (
//     <form className='add-food-form' onSubmit={handleSubmit}>
//       <h2>Add New Food Item</h2>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         onChange={handleChange}
//         value={foodData.name}
//         required
//       />
//       <div>
//         <label>Ingredients:</label>
//         {foodData.ingredients.map((ingredient, index) => (
//           <div key={index} className="ingredient-input-group">
//             <input
//               type="text"
//               placeholder={`Ingredient ${index + 1}`}
//               value={ingredient}
//               onChange={(e) => handleIngredientChange(index, e.target.value)}
//               required
//             />
//             {index > 0 && (
//               <button
//                 type="button"
//                 className="remove-btn"
//                 onClick={() => handleRemoveIngredient(index)}
//               >
//                 &#10005; {/* Cross mark */}
//               </button>
//             )}
//             {index === foodData.ingredients.length - 1 && (
//               <button
//                 type="button"
//                 className="add-btn"
//                 onClick={handleAddIngredient}
//               >
//                 <FaPlus /> {/* Plus icon */}
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         name="restaurantName"
//         placeholder="Restaurant"
//         onChange={handleChange}
//         value={foodData.restaurantName}
//         required
//       />
//       <input
//         type="number"
//         name="starRating"
//         placeholder="Rating"
//         onChange={handleChange}
//         value={foodData.starRating}
//         required
//       />
//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         onChange={handleChange}
//         value={foodData.price}
//         required
//       />
//       <input
//         type="text"
//         name="imageUrl"
//         placeholder="Image URL"
//         onChange={handleChange}
//         value={foodData.imageUrl}
//       />
//       <button className='food-button' type="submit">Add Item</button>
//     </form>
//   );
// };

// export default AddFoodItem;


import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/AddFoodItem.css';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon from react-icons

const AddFoodItem = () => {
  const navigate = useNavigate();

  const [foodData, setFoodData] = useState({
    name: '',
    ingredients: [''],  // Start with one empty ingredient
    restaurantName: '',
    starRating: '',
    price: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...foodData.ingredients];
    updatedIngredients[index] = value;
    setFoodData({ ...foodData, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setFoodData({ ...foodData, ingredients: [...foodData.ingredients, ''] });
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = foodData.ingredients.filter((_, i) => i !== index);
    setFoodData({ ...foodData, ingredients: updatedIngredients });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/food', foodData)
      .then(response => {
        console.log(response);
        navigate('/admin');
      })
      .catch(error => console.error("Error adding food item:", error));
  };

  return (
    <form className='add-food-form' onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={foodData.name}
        required
      />
      <div>
        <div className="ingredient-input-group-wrapper">
          {foodData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input-group">
              <input
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  &#10005;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={handleAddIngredient}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <input
        type="text"
        name="restaurantName"
        placeholder="Restaurant"
        onChange={handleChange}
        value={foodData.restaurantName}
        required
      />
      <input
        type="number"
        name="starRating"
        placeholder="Rating"
        onChange={handleChange}
        value={foodData.starRating}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
        value={foodData.price}
        required
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        onChange={handleChange}
        value={foodData.imageUrl}
      />
      <button className='food-button' type="submit">Add Item</button>
    </form>
  );
};

export default AddFoodItem;
