import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import slider1 from '../../assets/slider-image-1.jpeg'
import slider2 from '../../assets/slider-image-2.jpeg'
import slider3 from '../../assets/slider-image-3.jpeg'

import { Helmet } from 'react-helmet'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
var settings1 = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default function Home() {
  const [categories, setcategories] = useState([]);
  const [isloading, setisloading] = useState(false)
  async function getCategories() {
    setisloading(true)
    let {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories');
    setcategories(data.data)
    setisloading(false)

  }
  useEffect(() => {
    getCategories()
  }, [])
  
  return <>
   <Helmet>
    <title>Home</title>
  </Helmet>

  <div className='container'>
    {isloading ? <div>
     <h1>Loading...</h1>
    </div>:
    (
    <>
     <div className='row'>
      <div className='col-md-8 mb-4'>
      <Slider {...settings} className={'cursor-pointer'}>
          <img src={slider1} alt="" className='w-100'/>
          <img src={slider2} alt="" className='w-100'/>
          <img src={slider3} alt="" className='w-100'/>
        </Slider>
        </div>
        <div className="col-md-4 ">
          <img src={slider3} alt="" className='w-100'/>
          <img src={slider2} alt="" className='w-100'/>
          
          
        </div>
      
      </div>
      <div className="row">
        <div>
        <h2> Shop Popular Categories </h2>
        <Slider {...settings1} className={'cursor-pointer'}>
          {categories.map((category)=><div>
            <img src={category.image} alt="" className='w-100' height={150}/>
            <h6>{category.name}</h6>
          </div>)}
        </Slider>
      </div>
      </div>

      <div className='row'>
     <h3>Men - women</h3>
     <FeaturedProducts/>
      </div>

    </>
    
    )}
    </div>     
        
  
    
    
  
  </>
  
}