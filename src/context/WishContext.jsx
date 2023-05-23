import axios from "axios";
import React from 'react'

import { createContext } from "react";

export const WishContext=createContext(0);

let userToken = localStorage.getItem('userToken');
let headers = {token: userToken}

 function addToWish(productId) {
    return axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist',
    { productId:productId},
    {headers})
    .then((response)=> response)
    .catch((err)=>err)
}

function getWishlist() {
    return axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist',
    {headers})
    .then((response)=> response)
    .catch((err)=>err)
}
async function removeWishlist(productid){
     return axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productid}`,
     {headers:headers})
     .then((response)=> response)
     .catch((err)=>err)

}
export default function WishContextProvider(props) {
    return <WishContext.Provider 
    value={{addToWish,getWishlist,removeWishlist}}>
     {props.children}
    </WishContext.Provider>
}