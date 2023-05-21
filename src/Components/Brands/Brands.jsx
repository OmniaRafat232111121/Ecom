import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Brands = () => {
    const [Brands,setBrands]=useState([]);
    const [loading,setLoading]=useState(false);
    async function getBrands(){
        setLoading(true);
        let {data}=await axios.get("https://route-ecommerce.onrender.com/api/v1/brands");
           setBrands(data.data);
        //   console.log(data.data)
          setLoading(false);

    }
    useEffect(()=>{
          getBrands()
    },[])
  return (
    <div>
        <h2 className='mx-auto px-5'>Brand Products</h2>
       <div className='container'>
        <div className='row'>
            {loading?<div className='loading'><i className='fas fa-spinner fa-spin text-main fa-3x'></i></div>:""}
        {Brands.map((brand)=><div className='col-md-3'>
            <img src={brand.image} alt={brand.name} className='w-100'/>
            <h3 className='text-center'>{brand.name}</h3>

            </div>)}

        </div>

       </div>
      
    </div>
  )
}

export default Brands
