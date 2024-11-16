import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userId);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const fetchFoodItems = async () => {
      const response = await fetch("http://localhost:5000/api/food/");
      const data = await response.json();
      setFoodItems(data.foodItems);
    };

    fetchFoodItems();
  }, []);

  const handleAddToCart = (item) => {
    if (isLoggedIn && userId) {
      setCart((prevCart) => [...prevCart, item]);
      
      dispatch(addToCart(userId, item))
        .then(() => {
          toast.success(`${item.name} has been added to the cart!`, {
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
          console.error("Error adding item to cart:", error);
          toast.error("Failed to add item to cart. Please try again.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.warn("Please log in to add items to the cart.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://res.cloudinary.com/digbgd478/image/upload/v1728018429/xatggoiqfusgzhwusgbd.jpg"
                className="d-block w-100 carousel-img"
                style={{ filter: "brightness(30%)" ,objectFit: "contain", backgroundColor: "black", height: "400px"}}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://res.cloudinary.com/digbgd478/image/upload/v1728018576/tebws3jegix4avnva2tf.jpg"
                className="d-block w-100 carousel-img"
                style={{ filter: "brightness(30%)" ,objectFit: "contain", backgroundColor: "black", height: "400px" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://res.cloudinary.com/digbgd478/image/upload/v1728018677/tc4nybjuwkdbqwbzkkx1.jpg"
                className="d-block w-100 carousel-img"
                style={{ filter: "brightness(30%)" ,objectFit: "contain", backgroundColor: "black", height: "400px" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          {foodItems.length > 0 ? (
            foodItems
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
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
                      <button
                        className="btn"
                        style={{ backgroundColor: '#6f42c1', color: 'white' }}
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p>No food items available</p>
          )}
        </div>
      </div>
    </div>
  );
}