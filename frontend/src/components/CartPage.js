import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  removeFromCart,
  incrementItem,
  decrementItem,
} from "../redux/actions/cartActions";
import "../styles/cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51OUQ2YSBsRjMaYOe1phMU8RuXK3UsacqVQ9wdcdl8w53r3DXxHMkMZoFIqKH9lqiitvrqttRjfifDiBnXrc4C2eh00jlSA8Rl3"
);

export default function CartPage() {
  const userId = useSelector((state) => state.user.userId);
  const items = useSelector((state) => state.cart.items) || [];
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    dispatch(fetchCartItems(userId));
  }, [dispatch, userId]);

  const handleRemoveFromCart = async (itemId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (confirmed) {
      await dispatch(removeFromCart(userId, itemId))
        .then(() => {
          toast.success(`Item has been removed from the cart!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.error("Error removing item from cart:", error);
          toast.error("Failed to remove item from cart. Please try again.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      dispatch(fetchCartItems(userId));
    }
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementItem(userId, itemId));
  };

  const handleDecrement = (itemId) => {
    const item = items.find((item) => item.foodItemId === itemId);
    if (item.quantity > 1) {
      dispatch(decrementItem(userId, itemId));
    }
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );
  };

  const handleBuyItem = async (item) => {
    const orderData = {
      userId,
      items: [
        {
          foodItemId: item.foodItemId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.quantity * item.price,
        },
      ],
      totalAmount: item.price * item.quantity,
      status: "completed",
    };

    // Save to sessionStorage
    sessionStorage.setItem("orderData", JSON.stringify(orderData));

    try {
      const stripe = await stripePromise;
      const { data } = await axios.post(
        "http://localhost:5000/api/user/create-checkout-session",
        {
          cartItems: [item],
        }
      );

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    }
  };

  const handleCheckout = async () => {
    const orderData = {
      userId,
      items: items.map((item) => ({
        foodItemId: item.foodItemId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.quantity * item.price,
      })),
      totalAmount: calculateTotal(),
      status: "completed",
    };

    // Save to sessionStorage
    sessionStorage.setItem("orderData", JSON.stringify(orderData));

    try {
      const stripe = await stripePromise;
      const { data } = await axios.post(
        "http://localhost:5000/api/user/create-checkout-session",
        {
          cartItems: items,
        }
      );

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <h2>Your Shopping Cart</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {items.map((item) => (
              <div
                key={item.foodItemId}
                className="cart-item d-flex align-items-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width="80"
                  height="80"
                />
                <div className="item-details ms-3">
                  <h5>{item.name}</h5>
                  <p>
                    <strong>Restaurant:</strong> {item.restaurantName}
                  </p>
                  <p>
                    <strong>Ingredients:</strong>{" "}
                    {Array.isArray(item.ingredients)
                      ? item.ingredients.join(", ")
                      : "No ingredients available"}
                  </p>
                  <p>
                    <strong>Rating:</strong> {item.starRating} ⭐
                  </p>
                  <p>
                    <strong>Price:</strong> ₹
                    {item.price ? item.price.toFixed(2) : "0.00"}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹
                    {item.totalPrice ? item.totalPrice.toFixed(2) : "0.00"}
                  </p>

                  <div className="quantity-controls d-flex align-items-center">
                    <button
                      onClick={() => handleDecrement(item.foodItemId)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.foodItemId)}>
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.foodItemId)}
                    className="btn btn-danger mt-2"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleBuyItem(item)}
                    className="btn btn-success mt-2 ms-2"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
            <div className="total mt-4">
              <h4>Total: ₹{calculateTotal().toFixed(2)}</h4>
            </div>
            <button className="btn btn-success mt-3" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
