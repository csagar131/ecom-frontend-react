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
      <div className="offset-2 col-8">
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


  return (
    <Base>
      <div className="row text-center" style={{background:"white"}}>
        <div className="col-md-6 col-sm-12  col-xs-12">
          <div>{loadAllProducts(products)}</div>
        </div>
        <div className="col-md-6 col-sm-12  col-xs-12">{
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
