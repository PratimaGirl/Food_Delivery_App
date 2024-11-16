const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CART_ITEMS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_CART_ITEMS_SUCCESS":
      return { ...state, loading: false, items: action.payload }; // Ensure 'items' is set to action.payload
    case "FETCH_CART_ITEMS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    // Add Item to Cart
    case "ADD_TO_CART_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_TO_CART_SUCCESS":
      return {
        ...state,
        items: [...state.items, action.payload], // Add the new item to the cart
        loading: false,
      };
    case "ADD_TO_CART_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Increment Item Quantity
    case "INCREMENT_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    // Decrement Item Quantity
    case "DECREMENT_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    // Remove Item from Cart
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREMENT_ITEM_SUCCESS":
    case "DECREMENT_ITEM_SUCCESS":
      return {
        ...state,
        items: state.items.map((item) =>
          item.foodItemId === action.payload.foodItemId
            ? { ...item, quantity: action.payload.quantity } // Update only quantity
            : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}
