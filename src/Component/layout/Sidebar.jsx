import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import './sidebar.css'
import { SiderbarData } from "../../data/Data";
import PersonIcon from '@mui/icons-material/Person';
import { motion } from "framer-motion";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { signOut } from "firebase/auth";
import { setUserInfo } from "../../Redux/Auth/authSlice";
import { auth } from "../../Firebase";

const Sidebar = () => {
 

  const [expanded, setExpaned] = useState(false)

  const dispatch= useDispatch()


  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-90%'
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
    {
      !expanded && 
      <div className="bars" style={{left: '5%'}} onClick={()=>setExpaned(!expanded)}>

        
        <MenuIcon />
      </div>
    }
      
    <motion.div  className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <Box textAlign={'end'} className='hidemenu'>
      <CloseIcon className="cross" onClick={()=>setExpaned(!expanded)}/>

      </Box>
      
      {/* <h1 style={{textAlign:'right', cursor:'pointer'}} onClick={()=>setExpaned(!expanded)}>X</h1> */}
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
              onClick={()=>setExpaned(false)}
             

               
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
