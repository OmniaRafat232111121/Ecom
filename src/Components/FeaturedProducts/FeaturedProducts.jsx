import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { WishContext } from '../../context/WishContext';


const FeaturedProducts = () => {
    const [loading,setLoading]=useState(false);
    const [products, setProducts] = useState([]);
    const {addToCart}=useContext(CartContext);
    const {addToWish}=useContext(WishContext);
    async function getProducts() {
        setLoading(true);
      let {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/products/');
      setProducts(data.data);
    }
    useEffect(()=>{
        getProducts()
    },[])

    // async function addProductToCart(productId) {
    //   let response = await addToCart(productId);
    //   if (response && response.data && response.data.status === 'success') {
    //     toast.success(response.data.message, {
    //       duration: 1000,
    //       className: 'text-center',
    //       position: 'bottom-left'
    //     });
    //   } else {
    //     toast.error('error')

    //   }
    // }
    async function addProductToCart(productId) {
      try {
        let response = await addToCart(productId);
        if (response && response.data && response.data.status === 'success') {
          toast.success(response.data.message, {
            duration: 1000,
            className: 'text-center',
            position: 'bottom-left'
          });
        } else {
          toast.error('An error occurred while adding the product to the cart.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        toast.error('An error occurred while adding the product to the cart.');
      }
    }

    async function addWishlist(productId) {
      let response = await addToWish(productId);
      if(response.data.status === 'success'){
     
      toast.success(response.data.message,
        {duration:1000,
        className:"text-center",
         position:'bottom-left'
        }
      )

      }
      else if (response.data.status === 'error'){
        // toast.error('Error')
        toast.error('This is an error!');

      }
    }

  return (
   <>
   {products.map((product)=>
    <div className="col-md-2 product" key={product.id}>
    <Link className="nav-link py-4 px-2 text-center " to={product.id}  >
   <img src={product.imageCover} alt="" className='w-100 rounded'/>
   <h2 className='h6'>{product.title.split(" ").slice(0,2).join(" ")}</h2>
   <small className='text-main'>{product.category.name}</small>
    </Link>
    <div className='d-flex justify-content-between'>
        <span>{product.price}EGP</span>
        <span><i class="fa-solid fa-star text-warning"></i>{product.ratingsAverage}</span>
      </div>
      <div className='d-flex justify-content-between'>
      <button onClick={()=>addWishlist(product.id)}   className='btn text-center '><i className='fas fa-heart wish wishlist'></i></button>
      <button onClick={()=>addProductToCart(product.id)} className='productbtn btn bg-main text-white w-100 my-2'>+ Add</button>

      </div>
     
     
      

    </div>

  )}
   </>
  )
}

export default FeaturedProducts
