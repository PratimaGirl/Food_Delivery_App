import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const data = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  const dispatch = useDispatchCart();

  // Ensure options is a valid object
  const options = props.options || {}; 
  const priceOptions = Object.keys(options); // Will be empty if options is invalid
  const foodItem = props.item;

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    let food = data.find(item => item.id === foodItem._id);

    // If the item already exists in the cart
    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
      } else {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
      }
    } else {
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
    }
  };

  useEffect(() => {
    // Set the default size when the component mounts
    if (priceOptions.length > 0) {
      setSize(priceRef.current.value || priceOptions[0]);
    }
  }, [priceOptions]);

  const finalPrice = qty * (options[size] ? parseInt(options[size], 10) : 0); // Fallback to 0 if size is invalid

  return (
    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
      <img src={props.ImgSrc} className="card-img-top" alt={foodItem.name} style={{ height: "120px", objectFit: "cover" }} />
      <div className="card-body">
        <h5 className="card-title">{props.foodName}</h5>
        <div className='container w-100 p-0' style={{ height: "38px" }}>
          <select className="m-2 h-100 w-20 bg-success text-black rounded" onChange={handleQty}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select className="m-2 h-100 w-20 bg-success text-black rounded" ref={priceRef} onClick={handleClick} onChange={handleOptions}>
            {priceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className='d-inline ms-2 h-100 w-20 fs-5'>
            ₹{finalPrice}/-
          </div>
        </div>
        <hr />
        <button className="btn btn-success" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
