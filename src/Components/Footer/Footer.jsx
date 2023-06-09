import React from 'react'
import appStore from '../../assets/128x128.png';
import googleStore from '../../assets/googleplay.png'
const Footer = () => {
  return (
    <div>
        <div className='container-fluid bg-light py-4 px-4 mt-4'>
            <div className='row'>
                <h3>Get the Fresh cart App</h3>
                <p>We will send you a link, open it on your phone to download the app</p>

            </div>
            <div className='row'>
                <div className='col-md-9'>
                    <input
                    type="email"
                    placeholder='Email..'
                    className='form-control'
                    />

                </div>
                <div className='col-md-3'>
                    <button className='btn btn-success bg-main'>
                   Submit
                    </button>

</div>

            </div>
            <div className='d-flex align-items-center justify-content-between'>
     <h6>Payment Partnert 
      <i class="fa-brands fa-amazon-pay mx-2"></i>
      <i class="fa-brands fa-cc-paypal mx-2"></i>
      <i class="fa-brands fa-cc-mastercard mx-2"></i>
      </h6>
      <div>
        <span>Get delivires with FreshCart</span>
        <img src={appStore} alt="" className='mx-2'/>
        <img src={googleStore} alt="" />
      </div>

            </div>

        </div>
      
    </div>
  )
}

export default Footer
