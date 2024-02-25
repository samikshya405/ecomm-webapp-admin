import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../Redux/Auth/authSlice'
import { signOut } from 'firebase/auth'
import { auth } from '../../Firebase'

const Header = () => {
  const dispatch = useDispatch()
  const handleLogout=()=>{
    signOut(auth).then(() => {
      dispatch(setUserInfo({}));
    }).catch((error) => {
      toast.error(error.message)
    });

  }
  return (
    <AppBar position='sticky' className='navbar' >
      <Toolbar>
        <Typography variant='h6' conponent='div' sx={{ flexGrow: 1 }}>Shop</Typography>
        <Stack direction={'row'} spacing={2}>
        <Button  color='inherit'>Profile</Button>
        <Button color='inherit' onClick={handleLogout}>Logout</Button>
      </Stack>
      </Toolbar>
      
    </AppBar>
  )
}

export default Header