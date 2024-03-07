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
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../../Redux/customers/customerAction";

const Customers = () => {
  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);
  return (
    <Adminlayout title={"Customer"}>
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
          {customers.map((item, index) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
              </TableRow>
            );
          })}
         
        </TableBody>
      </Table>
    </Adminlayout>
  );
};

export default Customers;
