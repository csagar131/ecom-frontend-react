import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { cartEmpty } from "./Helper/carthelper";
import { getToken, processPayment } from "./Helper/paymenthelper";
import { createOrder } from "./Helper/orderhelper";
import { isAuthenticated, signout } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({ products, reload = undefined, setReload = (f) => f }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: false,
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user.id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getTheToken = (userId, token) => {
    getToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });
        signout(() => {
          return <Redirect to="/signin" />;
        });
      } else {
        setInfo({
          ...info,
          clientToken: info.client_token,
        });
      }
    });
  };

  const onPurchase = () => {
    setInfo({
      ...info,
      loading: true,
    });
    let nonce;
    console.log(info.instance);

    info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData).then((response) => {
          if (response.error) {
            if (response.code === "1") {
              console.log("payment failed");
              signout(() => {
                return <Redirect to="/" />;
              });
            }
          } else {
            setInfo({
              ...info,
              success: response.success,
              loading: false,
            });
            console.log("payment success");
            let product_names = "";
            products.forEach((item) => {
              product_names += item.name + ",";
            });
            const orderData = {
              products: product_names,
              transaction_id: response.transaction_id,
              amount: response.transaction.amount,
            };

            createOrder(userId, token, orderData)
              .then((response) => {
                if (response.error === true) {
                  if (response.code === "1") {
                    console.log("order failed");
                  }
                  signout(() => {
                    return <Redirect to="/" />;
                  });
                } else {
                  if (response.success === true) {
                    console.log("order placed");
                  }
                }
              })
              .catch((error) => {
                setInfo({
                  loading: false,
                  success: false,
                });
                console.log("Order failed", error);
              });
            cartEmpty(() => {
              console.log("Cart is Empty now");
            });
            setReload(!reload);
          }
        });
      })
      .catch((e) => console.log("Nonce:" + e));
  };

  useEffect(() => {
    getTheToken(userId,token)
  },[])

  const getAmount = () => {
    let amount = 0;
    products.forEach((p) => {
      amount += parseInt(p.price);
    });
    return amount;
  };

  const showBtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => {
                console.log("instance is:" + instance);
                setInfo({
                  ...info,
                  instance: instance,
                });
                info.instance = instance;
              }}
            />
            <button
              disabled={info.loading}
              onClick={onPurchase}
              className="btn btn-block btn-success"
            >
              Checkout
            </button>
          </div>
        ) : (
          <h3>please login first</h3>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3>Your Bill is: {getAmount()}</h3>
      <h3>{showBtnDropIn()}</h3>
    </div>
  );
};

export default PaymentB;
