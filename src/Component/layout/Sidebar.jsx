import { AppBar, Box, IconButton, List, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";


const Sidebar = () => {
    const {userInfo} = useSelector(state=>state.auth)
  return (
    <>
      <Box position='sticky' top={0} style={{ backgroundColor: 'skyblue', width: '200px', height: '100vh' }} padding={2} >
      <Typography padding={2}>Hello {userInfo.fullName}!</Typography>
      <hr />

        <Stack  direction={"column"} spacing={5} sx={{ paddingTop: 3}}>
            <NavLink to='/' style={{ textDecoration: 'none'}}> Dashboard</NavLink>
            <NavLink to='/orders' style={{ textDecoration: 'none' }}> Orders</NavLink>

            <NavLink to='/categories' style={{ textDecoration: 'none' }}>Categories</NavLink>
            {/* <NavLink to='/subCategories' style={{ textDecoration: 'none' }}>Sub-Categories</NavLink> */}
            <NavLink to='/product' style={{ textDecoration: 'none' }}>Product</NavLink>
            <NavLink to='/imageSlider' style={{ textDecoration: 'none' }}> Image Slider</NavLink>
            <NavLink to='/flashSale' style={{ textDecoration: 'none' }}> Flash Sale</NavLink>
            <NavLink to='/featuredProduct' style={{ textDecoration: 'none' }}>Featured Products</NavLink>

            <NavLink to='/users' style={{ textDecoration: 'none' }}>Users</NavLink>
            <NavLink to='/customers' style={{ textDecoration: 'none' }}>Customers</NavLink>


        </Stack>
      </Box>
    </>
  );
};

export default Sidebar;
