import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';

const Brand = () => {
  const params=useParams();
  const [loading,setLoading]=useState(false);
  const [brands,setBrand]=useState(null);
  async function getDetailsOfBrand(){
    setLoading(true);
    let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands/${params.brandId}`);
    setBrand(data);
    // console.log(data)

  }
  useEffect(()=>{
    getDetailsOfBrand();
  })
  return (
    <div>
      <Helmet>
        <title>Specific brand</title>
      </Helmet>
    <h2 className='mx-auto px-5'>Brand Products</h2>
   <div className='container'>
        <div  className="row align-items-center">
      
       
        </div>
    
   

       
        
     
  
    
    </div>

   </div>
  

  )
}

export default Brand
