import React from 'react'
import Navbar from './Components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './Components/Footer.jsx'
import Login from './Components/Login.jsx'
import AllProducts from './pages/AllProducts.jsx'
import { useAppContext } from './context/AppContext.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import AddAddress from './pages/AddAddress.jsx'
import MyOrders from './pages/MyOrders.jsx'
import SellerLogin from './Components/seller/SellerLogin.jsx'
import SellerLayout from './pages/seller/SellerLayout.jsx'
import AddProduct from './pages/seller/AddProduct.jsx'
import ProductList from './pages/seller/ProductList.jsx'
import Orders from './pages/seller/Orders.jsx'
import Loading from './Components/Loading.jsx'



const App = () => {

  const isSellerPath = useLocation().pathname.includes('seller')
  const {showUserLogin, isSeller} = useAppContext();


  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar /> }
      {showUserLogin ? <Login /> : null}
       
      <Toaster />

      <div className=  {`${isSellerPath ? "":'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/loader' element={<Loading />} />
          <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
          <Route index element={isSeller ? <AddProduct/> : null} />
          <Route path='product-list' element={<ProductList/>} />
          <Route path='orders' element={<Orders/>} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App