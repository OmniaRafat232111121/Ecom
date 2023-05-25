import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';

const Products = (productid) => {
    let [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);
    async function getProducts(){
        setLoading(true);
        const response=await fetch(`https://route-ecommerce.onrender.com/api/v1/products`);
        const data= await response.json();
        setProducts(data.data);
        console.log(data.data)
        setLoading(false);
    }
    useEffect(()=>{
        getProducts();
    },[])
  return (
    <div>
        <h2 className='mx-auto p-5'>All Products</h2>
       <div className='container'>
        <div className='row'>
            {loading?<div className='loading'><i className='fas fa-spinner fa-spin text-main fa-3x'></i></div>:""}
            {products.map((product)=>
           <div className='col-md-3 mb-4 bg-light text-decoration-none'>
            
            <img src={product.images[0]} alt={product.title} className='w-100'/>
            <h3 className='text-center text-black mt-4 '>{product.title.split(" ").slice(0,2).join(" ")}</h3>

           
           </div>
            )}

        </div>

       </div>
      
    </div>
  )
}

export default Products
