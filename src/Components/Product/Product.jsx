import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import axios from 'axios';
const Product = () => {
  const params=useParams();
    let {addToCart}=useContext(CartContext);
    const [loading,setLoading]=useState(false);
    const [Details,setDetails]=useState(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
    async function getDetails(){
        setLoading(true)
        let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${params.productId}`)
        setDetails(data.data)
       setLoading(false)
    }

    async function addProductToCart(productId){
        let response= await addToCart(productId);
        if(response.data.status=== 'success'){
            toast.success(response.data.message, {duration:3000, className:'text-center border-success', position:'bottom-left'})
        }
        else{
            toast.error('Error');
        }

    }
    useEffect(()=>{
       getDetails();
    },[])
  return (
    <>
      <div className="container">
    {loading?<div className='loading'><i className='fas fa-spinner fa-spin text-main fa-3x'></i></div>:<>
    <div  className="row align-items-center">
      <div className="col-md-4">
        <img src={Details?.imageCover} alt="" className='w-100'/>
        </div>
        <div className='col-md-8'>
            <h4>{Details?.title.split(" ").slice(0,2).join(" ")}</h4>
            <p>{Details?.description}</p>
            <h6>{Details?.category.name}</h6> 
            <div className='d-flex justify-content-between'>
                <span>{Details?.price} EGP</span>
                <span className='mt-3'><i class="fa-solid fa-star text-warning"></i>{Details?.ratingsAverage}</span>
                 
            </div>
            <button onClick={()=>addProductToCart(Details?.id)} className=' mt-4 btn btn-success w-100 bg-main'>+ add to cart</button>



        </div>
      
    </div>
    <div className='row'>
        <h3>More Images</h3>
        <Slider {...settings} className={'cursor-pointer'}>
            {Details?.images.map((photo)=>(
                <div>
                    <img src={photo} className='w-100'/>
                </div>
            ))}
        </Slider>

    </div>
    
    </>}
    
  </div>

    </>
  )
}

export default Product
