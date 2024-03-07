import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import './sidebar.css'
import { SiderbarData } from "../../data/Data";
import PersonIcon from '@mui/icons-material/Person';
import { motion } from "framer-motion";
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from "firebase/auth";
import { setUserInfo } from "../../Redux/Auth/authSlice";
import { auth } from "../../Firebase";

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [selected, setSelected] = useState('Dashboard');

  const [expanded, setExpaned] = useState(true)
  const navigate= useNavigate()
  const dispatch= useDispatch()

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  const handleSignout=()=>{
    signOut(auth).then(() => {
      dispatch(setUserInfo({}));
    }).catch((error) => {
      toast.error(error.message)
    });
  }
  
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <MenuIcon />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        {/* <img src='' alt="logo" /> */}
        <span>
          Sh<span>o</span>ps
        </span>
      </div>

      <div className="menu">
        {SiderbarData.map((item, index) => {
          return (
            
            <NavLink to={item.link}
              className='menuItem'
              key={index}
             

               
            >
              <item.icon />
              <span>{item.heading}</span>
            </NavLink>
            
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem" onClick={handleSignout}>
          <PersonIcon />
          <span>Signout</span>
        </div>
      </div>
    </motion.div>
    </>
   
  );
};

export default Sidebar;
