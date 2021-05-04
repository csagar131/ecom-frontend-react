import React from "react";
import {addItemToCart,removeItemFromCart} from "./Helper/carthelper";
import ImageHelper from "./Helper/imagehelper";
//import { Redirect } from "react-router-dom";

var isAuthenticated = true;

const Card = ({ product, addToCart = true, removeFromCart = true }) => {
  const addToCartMethod = () => {
    if (isAuthenticated) {
      addItemToCart(product, ()=>{})
      console.log("added to cart");
    } else {
      console.log("login required");
    }
  };

//   const getRedirect = (redirect) => {
//     if (redirect) {
//       return <Redirect to="/cart" />;
//     }
//   };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{product.name}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          Rs. {product.price}
        </p>
        <div className="row">
          <div className="col-12">
            {((addToCart) => {
              if (addToCart) {
                return (
                  <button
                    onClick={addToCartMethod}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                  >
                    Add to Cart
                  </button>
                );
              }
            })(addToCart)}
          </div>
          <div className="col-12">
            {((removeFromCart) => {
              if (removeFromCart) {
                return (
                  <button
                    onClick={()=> {
                      removeItemFromCart(product.name)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
                );
              }
            })(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
