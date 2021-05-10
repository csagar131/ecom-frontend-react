import React, { useState } from "react";
import { addItemToCart, removeItemFromCart } from "./Helper/carthelper";
import ImageHelper from "./Helper/imagehelper";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";


const Card = ({
  product,
  addToCart = true,
  removeFromCart = true,
  reload = undefined,
  setReload = (f) => f,
},props) => {
  const [redirect, setRedirect] = useState(false);
  const [redirectToLoginPage, setRedirectToLoginPage] = useState(false);

  const addToCartMethod = () => {
    if (isAuthenticated()) {
      addItemToCart(product, () => {
        setRedirect(true);
      });
    } else {
      setRedirectToLoginPage(true);
      
    }
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const getRedirectToLogin = (redirectToLoginPage) => {
    if (redirectToLoginPage) {
      return <Redirect to="/signin" />;
    }
  };

  return (
    <div className="card">
      {getRedirect(redirect)}
      {getRedirectToLogin(redirectToLoginPage)}
      <ImageHelper className="card-img-top" product={product} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="btn btn-success rounded  btn-sm px-4">
          Rs. {product.price}/-
        </p>
        <p className="card-text">
          <small className="text-muted">Only {product.stock} left in stock</small>
        </p>
        <p className="card-text">
          <small className="text-muted">Last updated : {product.updated_at.split("T")[0]}</small>
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
                    onClick={() => {
                      removeItemFromCart(product.name);
                      setReload(!reload);
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
}

export default Card;