import React from 'react'

import Sidebar from './Sidebar'
import { Box } from '@mui/material'
import './adminlayout.css'

const Adminlayout = ({title,children}) => {
  return (


    <div className='App'>
      <div className='AppGlass'>
        <Sidebar />
        {/* <main>
       <h2 align='center' style={{ padding: 10, textTransform:'capitalize' }} >{title}</h2>
      {children}
      </main> */}
      <main >
        <Box height={'10vh'} width={'100%'} sx={{background:'var(--glass)'}}></Box>
        <h1>{title}</h1>
        {children}
      </main>
      


      </div>


    </div>
    // <Box display='flex' >
    // <Sidebar/>
    // <div  style={{width:'100%'}} >
    // {/* <Header /> */}
    // <main>
    //   <h2 align='center' style={{ padding: 10, textTransform:'capitalize' }} >{title}</h2>
    //   {children}
    //   </main>
    // </div>
    
    
    
    
    // </Box>
  )
}

export default Adminlayout