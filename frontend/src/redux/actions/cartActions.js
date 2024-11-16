import axios from 'axios';

// Action Types for Fetching Cart Items
export const FETCH_CART_ITEMS_REQUEST = 'FETCH_CART_ITEMS_REQUEST';
export const FETCH_CART_ITEMS_SUCCESS = 'FETCH_CART_ITEMS_SUCCESS';
export const FETCH_CART_ITEMS_FAILURE = 'FETCH_CART_ITEMS_FAILURE';

// Action Types for Adding, Removing, and Updating Items
export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const INCREMENT_ITEM = 'INCREMENT_ITEM';
export const DECREMENT_ITEM = 'DECREMENT_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

// Action Creators for Fetching Cart Items
export const fetchCartItemsRequest = () => ({ type: FETCH_CART_ITEMS_REQUEST });
export const fetchCartItemsSuccess = (items) => ({ type: FETCH_CART_ITEMS_SUCCESS, payload: items });
export const fetchCartItemsFailure = (error) => ({ type: FETCH_CART_ITEMS_FAILURE, payload: error });

// Thunk Action Creator for Fetching Cart Items
export const fetchCartItems = (userId) => async (dispatch) => {
  dispatch(fetchCartItemsRequest());
  try {
    const response = await fetch(`http://localhost:5000/api/user/cart/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }

    const data = await response.json(); // Parse JSON response

    dispatch(fetchCartItemsSuccess(data.cartItems)); // Assuming 'data.cartItems' is correct
  } catch (error) {
    const errorMessage = error.message || 'Failed to fetch cart items';
    dispatch(fetchCartItemsFailure(errorMessage));
  }
};


// Action Creator for Adding Item to Cart
export const addToCartRequest = () => ({ type: ADD_TO_CART_REQUEST });
export const addToCartSuccess = (item) => ({ type: ADD_TO_CART_SUCCESS, payload: item });
export const addToCartFailure = (error) => ({ type: ADD_TO_CART_FAILURE, payload: error });

export const addToCart = (userId, item) => async (dispatch) => {
  dispatch(addToCartRequest());

  // Calculate the total price for the item (price * quantity)
  const itemWithTotalPrice = {
    ...item,
    foodItemId: item._id,
    quantity : 1,
    totalPrice: item.price,  // Ensure totalPrice is calculated
  };

  try {
    const response = await fetch(`http://localhost:5000/api/user/cart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemWithTotalPrice),  // Ensure this is properly formatted
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addToCartSuccess(data.cartItems));
    } else {
      const errorData = await response.json();
      dispatch(addToCartFailure(errorData.message));
    }
  } catch (error) {
    dispatch(addToCartFailure(error.message));
  }
};

// Action Creator for Removing Item from Cart
export const removeItem = (itemId) => ({ type: REMOVE_ITEM, payload: itemId });

// Thunk Action Creator for Removing Item from Cart
export const removeFromCart = (userId, itemId) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/user/cart/${userId}/cartItems/${itemId}`);
    console.log('Response:', response); // Log response or handle accordingly
    dispatch(removeItem(itemId));
  } catch (error) {
    console.error('Failed to remove item from cart:', error);
  }
};

// Action Creator for Incrementing Item Quantity
export const incrementItem = (userId, itemId) => async (dispatch) => {
  try {
    const response = await axios.patch(`http://localhost:5000/api/user/cart/${userId}/cartItems/${itemId}/increment`);
    dispatch(fetchCartItems(userId)); // Refresh cart after increment
  } catch (error) {
    console.error('Failed to increment item quantity:', error);
  }
};

// Thunk Action for Decrementing Item Quantity
export const decrementItem = (userId, itemId) => async (dispatch) => {
  try {
    const response = await axios.patch(`http://localhost:5000/api/user/cart/${userId}/cartItems/${itemId}/decrement`);
    dispatch(fetchCartItems(userId)); // Refresh cart after decrement
  } catch (error) {
    console.error('Failed to decrement item quantity:', error);
  }
};

export const clearCart = () => ({ type: CLEAR_CART });

export const clearCartItem = (userId) => async (dispatch) => {
  try {
    await fetch(`http://localhost:5000/api/user/cart/${userId}`, {
      method: 'DELETE',
    });
    dispatch(clearCart()); // Clear cart in Redux store after clearing in backend
  } catch (error) {
    console.error("Failed to clear cart:", error);
  }
};
