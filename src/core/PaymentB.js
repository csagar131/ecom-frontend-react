import React, { useState, useEffect } from "react";
import {Redirect} from 'react-router-dom';
import {cartEmpty} from './Helper/carthelper'
import {getToken,processPayment} from "./Helper/paymenthelper"
import {creatOrder} from "./Helper/orderhelper"
import {isAuthenticated, signout} from "../auth/helper"
import DropIn from "braintree-web-drop-in-react"

const PaymentB = ({products,reload = undefined,setReload = f => f}) => {
    
    const [info,setInfo] = useState({
        loading : false,
        success : false,
        clientToken : null,
        error : false,
        instance : {}
    })

    const userId = isAuthenticated() && isAuthenticated().user.id
    const token = isAuthenticated() && isAuthenticated().token

    const getTheToken = (userId, token) => {
        getToken(userId,token)
        .then(info => {
            if(!info){
                setInfo({
                    ...info,
                    error : true,
                })
                signout(() => {
                    return <Redirect to="/signin"/>
                })

            }
            else{
                const clientToken = info.clientToken
                setInfo({
                    ...info,
                    clientToken,
                })
            }
        })

    }

    useEffect( () => {
        getTheToken(userId, token)
    },[])

    const getAmount = () => {
        let amount = 0
        products.forEach((p) => {
            amount+= parseInt(p.price)
        })
        return amount
    }

    const showBtnDropIn = () => {
        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 ? (
                        <div>
                            <DropIn
                             options = {{authorization : info.clientToken}}
                             onInstance ={ instance => (info.instance = instance)}
                            />
                            <button className="btn btn-block btn-success">CheckOut</button>
                        </div>
                    ) : 
                    (
                        <h3>please login first</h3>
                    )
                }
            </div>
        )
    }

    return (
        <div>
            <h3>Your Bill is: {getAmount()}</h3>
            <h3>{showBtnDropIn()}</h3>
        </div>
    )
}

export default PaymentB;