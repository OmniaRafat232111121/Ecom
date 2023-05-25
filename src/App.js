import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Layout from './Components/Layout/Layout';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Brands from './Components/Brands/Brands';
import CartContextProvider from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import WishContextProvider from './context/WishContext';
import Wishlist from './Components/Wishlist/Wishlist';
import Cart from './Components/Cart/Cart';
import CheckOut from './Components/Checkout/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Products from './Components/Products/Products';
import Product from './Components/Product/Product';
function App() {

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }
  },[])
const [userData, setuserData] = useState(null)
function saveUserData(){
  let encodedToken = localStorage.getItem('userToken')
  let decodedToken = jwtDecode(encodedToken)
  setuserData(decodedToken);
 }

 

 let routers=createBrowserRouter([
  {path:'',
   element:
   <Layout 
    userData={userData}
     setuserData={setuserData}/>,
    children:[
    {
      index:"true", 
      element:<Home/>
    },
    {
      path:"Login",
     element:<Login saveUserData={saveUserData}/>
    },
    {
      path:"Register",
     element:<Register/>
    },
    {
      path:'brands',
      element:<ProtectedRoute><Brands/></ProtectedRoute>
    },
    {
      path:'wishlist',
      element:<ProtectedRoute><Wishlist/></ProtectedRoute>
    },
    {
      path:'cart',
      element:<ProtectedRoute><Cart/></ProtectedRoute>
    },
    {path:"checkout", 
    element:<ProtectedRoute><CheckOut/></ProtectedRoute>
  },
    {path:"allorders", 
    element:<ProtectedRoute><AllOrders/></ProtectedRoute>
},
{path:"products", 
element:<ProtectedRoute><Products/></ProtectedRoute>
},
{path:"products/:productId", 
element:<ProtectedRoute><Product/></ProtectedRoute>},

    {
      path:"*", 
      element:<Home/>
    },
    
  ] }
])
  return (
<>
<CartContextProvider>
  <WishContextProvider>
  <RouterProvider router={routers}></RouterProvider>
<ToastContainer/>
  </WishContextProvider>

</CartContextProvider>

</>  
);
}

export default App;
