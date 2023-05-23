import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { WishContext } from '../../context/WishContext'
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

const Wishlist = () => {
    const {getWishlist,removeWishlist} = useContext(WishContext);
    const {addToCart}=useContext(CartContext);
    const [loading,setLoading] = useState(false);
    const [wishes, setwishes] = useState(null)


    async function addProductToCart(productId){
      setLoading(true);
      const response=await addToCart(productId);
      if(response.data.status === 'success'){
        toast.success(response.data.message, 
          {duration:3000, className:'text-center border-success', position:'bottom-left'})
          getWish()
      }
      else{
        toast.error('Error')
      }
    }
    async function getWish(){
        setLoading(true)
        const response= await getWishlist();
        console.log(response)
        setLoading(false)
        setwishes(response.data.data);

    };
     
    async function removeWish(productid){
        setLoading(true)
        const response= await removeWishlist(productid);
        console.log(response)
        getWish();
      

    };
    
    
    useEffect(()=>{
        getWish()
    },[])



  return (
    <div>
        <Helmet>
            <title>Wishlist</title>
        </Helmet>
        <div>
        {loading ? 
        <div className='loading'>
            <i className='fas fa-spinner fa-spin text-main fa-3x'></i>
            </div>:<>
            </>}
            <div className='container'>
                {wishes?.map((wish)=><div className='row  border-main p-5'> 
                <div className="col-md-1">
        <img src={wish.imageCover} alt=""  className='w-100'/>
      </div>
      <div className='col-md-11'>
        <div>
        <h6 className='text-main'>{wish.title.split(" ").slice(0,2).join(" ")}</h6>
          <h6 className='text-danger'>{wish.brand.name}</h6>
          <p>{wish.price} EGP</p>
          {wish.priceAfterDiscount?<h6>Price after discount: {wish.priceAfterDiscount} EGP</h6>:<h6>No available discount now</h6>} 
          <button onClick={()=>removeWish(wish.id)}  className='btn btn-danger btn-sm'>Remove from wishlist</button>
          <button onClick={()=>addProductToCart(wish.id)} className='btn btn-success bg-main mx-2 btn-sm'> Add to Cart</button>

            </div>
        </div>
                    </div>)}
                </div>
        
        
        </div>
  
    </div>
  
  )
}

export default Wishlist
