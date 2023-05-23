import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { CartContext } from '../../context/CartContext';


const CheckOut = () => {
    const [messageError, setmessageError] = useState('');
    const [isloading, setisloading] = useState(false);
     //cartcontextpayment
     let {onlinePayment} =useContext(CartContext)  
     async function handleSubmit(values) {
       let response = await onlinePayment(localStorage.getItem('cartId'),values)
       if (response?.data?.status=== 'success') {
         console.log(response);
         window.location.href=response.data.session.url 
       }
     }
   
    const validationSchema = Yup.object().shape({
        
        details: Yup.string()
          .required('Details are required')
          .min(5, 'Details must be at least 5 characters'),
        phone: Yup.string()
          .required('Phone is required')
          .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
      
        city: Yup.string()
          .required('City is required'),
      
      });
      
    let formik=useFormik({
        initialValues:{
            Details:'',
            Phone:'',
            City:''
            
        },validationSchema,
        onSubmit:handleSubmit
    })
  return (
    <div>
      <Helmet>
        <title>Check Out</title>
      </Helmet>
     <div className='w-50 py-5 mx-auto'>
        <h4>Checkout</h4>
        {messageError?<div className="alert alert-danger text-black">{messageError}</div>:null}
        <form>
            <label htmlFor='details'>details</label>
            <input  
            type="text" 
            className="form-control mt-1 mb-2"
            id="details"
            name="details" 
            onChange={formik.handleChange}
            value={formik.values.details}
            onBlur={formik.handleBlur}
            />
           {formik.errors.details && formik.touched.details?<div className="alert alert-danger text-black">{formik.errors.details}</div>:null}


            <label htmlFor='phone'>phone:</label>
            <input  
            type="number"
             className="form-control mt-1 mb-2"
              id="phone"
             name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
 
               />
          {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger text-black">{formik.errors.phone}</div>:null}


            <label htmlFor='city'>city:</label>
            <input  type="text"
            className="form-control mt-1 mb-2"
             id="city"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
              onBlur={formik.handleBlur}

              />
             {formik.errors.city && formik.touched.city?<div className="alert alert-danger">{formik.errors.city}</div>:null}


            <button  type='submit' className='btn w-100 border-main my-5' >Pay</button>
        </form>

     </div>
    </div>
  )
}

export default CheckOut
