import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom';
import { Offline } from 'react-detect-offline';
import Footer from '../Footer/Footer';

const Layout = ({userData,setuserData}) => {
  let navigate = useNavigate()
  function logOut() {
    localStorage.removeItem('userToken');
    setuserData(null);
    navigate('/login')
    
 }
  return (
    <div>
      <Navbar userData={userData} logOut={logOut}/>
    <Outlet></Outlet>
    <Offline><div className='network'>You are offline <i className='fas fa-wifi'></i></div></Offline>
    <Footer></Footer>
      

    </div>
  )
}

export default Layout
