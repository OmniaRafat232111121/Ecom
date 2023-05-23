import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null)
  
let {getLoggedUserCart,deleteCartItem,clearCart,updateProductCount}=useContext(CartContext)
const [isloading, setisloading] = useState(false)


async function getCart() {
  setisloading(true)
  let response = await getLoggedUserCart();
  if(response.status === 200){
    setcartDetails(response.data.data);
    setisloading(false)
  }
}
async function deleteItemCart(productId) {
  setisloading(true)
  let response = await deleteCartItem (productId);
  if(response.status === 200){
    setcartDetails(response.data.data);
    console.log(response.data.data.products)
    setisloading(false)
    getCart();
  }
}
async function clearItems(){
  let response = await clearCart();
  console.log(response);
  setcartDetails(null)
}


async function updateCount(productId, count) {
  let response = await updateProductCount(productId, count);
  console.log(response);
  setcartDetails(response.data.data)
  
}
useEffect(()=>{
  getCart();
}, [])


  return(
   <>
  <Helmet>
    <title>Shop Cart</title>
  </Helmet>
   {isloading?<div className='loading'><i className='fas fa-spinner fa-spin text-main fa-3x'></i></div>:
   <> 
  <div className=' container bg-light p-4 my-4 w-75 mx-auto position-relative'>
    <h5>Shop cart</h5>
  
   <h6 className='text-second'>Total Price : {cartDetails?.totalCartPrice} EGP</h6>
    <button onClick={()=>clearItems()} className='btn btn-danger btn-sm clear'>Clear Cart</button>
    
    
     {cartDetails?.products.map((product, index) => (
  <div key={index} className='row border-bottom my-2'>
    <div className="col-md-1">
      <img src={product.product.imageCover} alt="" className='w-100'/>
    </div>
    <div className="col-md-11 d-flex justify-content-between align-items-center">
      <div>
        <h6 className='fw-bolder'>{product.product.title.split(" ").slice(0,2).join("")}</h6>
        <h6 >{product.price} EGP</h6>
        <button  onClick={()=>deleteItemCart(product.product._id)} className='btn m-0 p-0'><i className='text-danger btn-sm font-sm fa-regular fa-trash-can'></i> remove</button>
      </div>
      <div>
            <button onClick={()=>updateCount(product.product._id, product.count+1)} className='btn border-main btn-sm'>+</button>
            <span className='d-inline-block mx-2'>{product.count}</span>
            <button onClick={()=>updateCount(product.product._id, product.count-1)} className='btn border-main btn-sm'>-</button>
          </div>

    </div>

  </div>
  
))} 
    {/* <button className=' checkout'>
      <Link to="/CheckOut"></Link>Checkout
    </button> */}

    <button className=' checkout '>
      <Link className='text-decoration-none text-white' to={'/CheckOut'}>CheckOut</Link>
      </button>

  </div>


  </>
}

</>
  )
}