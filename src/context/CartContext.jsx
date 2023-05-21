import axios from "axios";
import React from 'react'

import { createContext } from "react";

export const CartContext=createContext(0);

let userToken = localStorage.getItem('userToken');
let headers = {token: userToken}

 function addToCart(productId) {
    return axios.post('https://route-ecommerce.onrender.com/api/v1/cart',
    { productId:productId},
    {headers})
    .then((response)=> response)
    .catch((err)=>err)
}

export default function CartContextProvider(props) {
    return <CartContext.Provider 
    value={{addToCart}}>
     {props.children}
    </CartContext.Provider>
}