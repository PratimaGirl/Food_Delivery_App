import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/EditFoodItem.css';

const EditFoodItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState({
    name: '',
    ingredients: [''], // Initialize with one empty ingredient
    restaurantName: '',
    starRating: '',
    price: '',
    imageUrl: ''
  });

  // Fetch food data when the component is mounted
  useEffect(() => {
    axios.get(`http://localhost:5000/api/food/${id}`)
      .then(response => {
        console.log('response', response);
        
        // Ensure ingredients is an array
        const fetchedData = response.data.foodItem;
        setFoodData({
          ...fetchedData,
          ingredients: Array.isArray(fetchedData.ingredients) ? fetchedData.ingredients : ['']
        }); // Set the fetched food data to state
      })
      .catch(error => console.error("Error fetching food item:", error));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  // Handle ingredient change for each input field
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...foodData.ingredients];
    updatedIngredients[index] = value;
    setFoodData({ ...foodData, ingredients: updatedIngredients });
  };

  // Add a new ingredient input
  const handleAddIngredient = () => {
    setFoodData({ ...foodData, ingredients: [...foodData.ingredients, ''] });
  };

  // Remove an ingredient input
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = foodData.ingredients.filter((_, i) => i !== index);
    setFoodData({ ...foodData, ingredients: updatedIngredients });
  };

  // Submit the form data
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/food/edit/${id}`, foodData)
      .then(response => {
        console.log(response);
        navigate('/admin'); // Redirect after successful update
      })
      .catch(error => console.error("Error updating food item:", error));
  };

  return (
    <form className='edit-food-item' onSubmit={handleSubmit}>
      <h2>Edit Food Item</h2>

      {/* Name Input */}
      <input
        type="text"
        name="name"
        value={foodData.name || ''}
        onChange={handleChange}
        placeholder="Food Name"
        required
      />

      {/* Ingredients Input */}
      <div>
        <label>Ingredients:</label>
        {Array.isArray(foodData.ingredients) && foodData.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-input-group">
            <input
              type="text"
              name={`ingredient-${index}`}
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              required
            />
            {index > 0 && (
              <button className='remove-button' type="button" onClick={() => handleRemoveIngredient(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button className='add-ingredient-button' type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </div>

      {/* Restaurant Name */}
      <input
        type="text"
        name="restaurantName"
        value={foodData.restaurantName || ''}
        onChange={handleChange}
        placeholder="Restaurant Name"
        required
      />

      {/* Star Rating */}
      <input
        type="number"
        name="starRating"
        value={foodData.starRating || ''}
        onChange={handleChange}
        placeholder="Rating"
        required
        min="1"
        max="5"
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        value={foodData.price || ''}
        onChange={handleChange}
        placeholder="Price"
        required
        min="0"
      />

      {/* Image URL */}
      <input
        type="text"
        name="imageUrl"
        value={foodData.imageUrl || ''}
        onChange={handleChange}
        placeholder="Image URL"
        required
      />

      {/* Submit Button */}
      <button className='update-item' type="submit">Update Item</button>
    </form>
  );
};

export default EditFoodItem;
