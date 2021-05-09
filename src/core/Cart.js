import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./Helper/carthelper";
import PaymentB from "./PaymentB";


const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);
 
  const loadAllProducts = (products) => {
    if(products.toString() === [].toString()){
        return(<h1>
                No Products
            </h1>)
    }
    else{
    return (
      <div>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addToCart={false}
              removeFromCart={true}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
    );
    }
  };

  // const loadCheckout = () => {
  //   return (
  //     <div>
  //       <h1>Checkout</h1>
  //     </div>
  //   );
  // };

  return (
    <Base>
      <div className="row text-center">
        <div className="col-6">{loadAllProducts(products)}</div>
        <div className="col-6">{
          products.length > 0 ? (
            <PaymentB products = {products} setReload={setReload}/>
          ) : (
            <h3>please login and add products to cart</h3>
          )
        }
        </div>
      </div>
    </Base>
  );
};

export default Cart;
