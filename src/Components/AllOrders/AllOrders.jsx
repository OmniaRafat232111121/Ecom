import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

const AllOrders = () => {
  const [loading,setLoading]=useState(false);
  const [orders,setOrders]=useState(null);
  const [error,setError]=useState(null);
  async function getAllOrders(){
    setLoading(true);
    const response=await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/`)
    console.log(response.data.data);
    setOrders(response.data);
  }
  useEffect(()=>{
    getAllOrders();
  },[])
  return (
    <div>
        <Helmet>
            <title>All orders</title>
        </Helmet>
        <div className='row p-4 overflow-x-auto bg-light'>
{orders && orders.data.map((order,index)=>(
<div className='col-md-3' >
  <h6 className='text-danger text-center'>Order Created: {order.createdAt.split('-').slice(0,2).join('-')}</h6>
          <h6 className='text-success text-center'>Order Type: {order.paymentMethodType}</h6>
          <h6 className='text-black text-center'>Phone: {order.user.phone}</h6>
    {order.cartItems.map((item,index)=>(
      <>
      <img src={item.product.imageCover} className='w-100'/>
      <div className='bg-secondary text-white my-3 py-2'>
            <h6 className=' text-center'>{item.price} EGP</h6>
            <h6 className=' text-center'>{item.product.title.split(' ').slice(0,2).join(" ")}</h6>
            <h6 className=' text-center'>Count: {item.count} </h6>

         </div>
      </>
    ))}
       </div>


))}
             

        </div>
    
    </div>
  )
}

export default AllOrders
