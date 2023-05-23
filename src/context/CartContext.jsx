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

function getLoggedUserCart() {
    return axios.get('https://route-ecommerce.onrender.com/api/v1/cart',{headers})
    .then((response)=> response)
    .catch((err)=>err)
}
function deleteCartItem(productId) {
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{headers})
    .then((response)=> response)
    .catch((err)=>err)
}

function updateProductCount(productId, productCount) {
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{count:productCount},{headers})
    .then((response)=> response)
    .catch((err)=>err)
}
function clearCart() {
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`,{headers})
    .then((response)=> response)
    .catch((err)=>err)
}
function onlinePayment(cartId, shippingAddress) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {shippingAddress:shippingAddress},
    {headers:headers})
    .then((response)=> response)
    .catch((err)=>err)
}
export default function CartContextProvider(props) {
    return <CartContext.Provider 
    value={
    {addToCart,
    getLoggedUserCart,
    deleteCartItem,
    clearCart,
    updateProductCount,
    onlinePayment}}>
     {props.children}
    </CartContext.Provider>
}