import React, { useEffect } from 'react'
import Adminlayout from '../../Component/layout/Adminlayout'
import { Link } from 'react-router-dom'
import { Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ProductTable from '../../Component/product/ProductTable';
import { useDispatch } from 'react-redux';
import { getProductAction } from '../../Redux/product/prouctAction';

const Product = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProductAction())

  },[])
  
  return (
    <Adminlayout title='product'>
    <div align='end' style={{paddingRight:'50px'}}>
    <Link to='/addproduct'><Button variant='contained' className='btn'> <AddIcon/>Add Product</Button></Link>
    </div>
    <ProductTable/>
    
    
  </Adminlayout>
  )
}

export default Product