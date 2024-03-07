import React, { useEffect, useState } from "react";
import Adminlayout from "../../Component/layout/Adminlayout";
import {
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

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const getCustomers = async () => {
    try {
      const q = query(collection(db, "users"), where("role", "==", 'customer'));

      const querySnapshot = await getDocs(q);
      const allCustomers =[]
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const id=doc.id
        allCustomers.push({id,...doc.data()})
        // console.log(doc.id, " => ", doc.data());
      });
      setCustomers(allCustomers)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCustomers()
  }, []);
  return (
    <Adminlayout title={'Customer'}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {
           customers.map((item,index)=>{
            return <TableRow key={item.id}>
              <TableCell>{index+1}</TableCell>
            <TableCell>{item.fullName}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phone}</TableCell>
            
          </TableRow>
           })
          }
          {/* <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>30</TableCell>
            <TableCell>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </Adminlayout>
  );
};

export default Customers;
