import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './privateRoute/PrivateRoute'
import Categories from './pages/Categories/Categories'
import OrderHistory from './pages/Order/OrderHistory'
import Product from './pages/product/Product'
import Users from './pages/user/Users'
import AddProduct from './pages/product/AddProduct'
import EditProduct from './pages/product/EditProduct'
import Customers from './pages/Customer/Customers'
// import SubCategories from './pages/Categories/SubCategories'
import FlashSale from './pages/flashsale/FlashSale'
import FeaturedProduct from './pages/Featured/FeaturedProduct'
import Imageslider from './pages/imageslider/Imageslider'
import AddCategories from './pages/Categories/AddCategories'
import EditCategory from './pages/Categories/EditCategory'
import Reviews from './pages/reviews/Reviews'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      <Route path='/categories' element={<PrivateRoute><Categories/></PrivateRoute>}/>
      <Route path='/addCategory' element={<PrivateRoute><AddCategories/></PrivateRoute>}/>
      {/* <Route path='/subcategories' element={<PrivateRoute><SubCategories/></PrivateRoute>}/> */}
      <Route path='/editCatgeory/:id' element={<PrivateRoute><EditCategory/></PrivateRoute>}/>

      <Route path='/orders' element={<PrivateRoute><OrderHistory/></PrivateRoute>}/>
      <Route path='/product' element={<PrivateRoute><Product/></PrivateRoute>}/>
      <Route path='/users' element={<PrivateRoute><Users/></PrivateRoute>}/>
      <Route path='/customers' element={<PrivateRoute><Customers/></PrivateRoute>}/>
      <Route path='/addProduct' element={<PrivateRoute><AddProduct/></PrivateRoute>}/>
      <Route path='/product/edit/:id' element={<PrivateRoute><EditProduct/></PrivateRoute>}/>
      <Route path='/flashSale' element={<PrivateRoute><FlashSale/></PrivateRoute>}/>
      <Route path='/featuredProduct' element={<PrivateRoute><FeaturedProduct/></PrivateRoute>}/>
      <Route path='/imageSlider' element={<PrivateRoute><Imageslider/></PrivateRoute>}/>
      <Route path='/reviews' element={<PrivateRoute><Reviews/></PrivateRoute>}/>
      <Route path='*' element={<Navigate to='/'/>}/>







    </Routes>
    </>
  )
}

export default App