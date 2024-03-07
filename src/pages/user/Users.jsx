import React, { useEffect, useState } from "react";
import Adminlayout from "../../Component/layout/Adminlayout";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';


const users = () => {
  const [admins, setAdmins] = useState([]);
  const getAdmins = async () => {
    try {
      const q = query(collection(db, "users"), where("role", "==", 'admin'));

      const querySnapshot = await getDocs(q);
      const allAdmins =[]
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const id=doc.id
        allAdmins.push({id,...doc.data()})
        // console.log(doc.id, " => ", doc.data());
      });
      setAdmins(allAdmins)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdmins()
  }, []);
  return (
    <Adminlayout title={'Admin'}>
     <div align='end' style={{paddingRight:'50px'}}>
    <Link to='/signup'><Button variant='contained' className='btn'> <AddIcon/>Create user</Button></Link>
    </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {
           admins.map((item,index)=>{
            return <TableRow key={item.id}>
              <TableCell>{index+1}</TableCell>
            <TableCell>{item.fullName}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>
              <IconButton color="error" >
                <DeleteIcon/>
              </IconButton>
            </TableCell>
            
          </TableRow>
           })
          }
          
        </TableBody>
      </Table>

     
    </Adminlayout>
  );
};

export default users;
