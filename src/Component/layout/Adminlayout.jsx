import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { Box } from '@mui/material'


const Adminlayout = ({title,children}) => {
  return (
    <Box display='flex' >
    <Sidebar/>
    <div  style={{width:'100%'}} >
    <Header />
    <main>
      <h2 align='center' style={{ padding: 10, textTransform:'capitalize' }} >{title}</h2>
      {children}
      </main>
    </div>
    
    
    
    
    </Box>
  )
}

export default Adminlayout