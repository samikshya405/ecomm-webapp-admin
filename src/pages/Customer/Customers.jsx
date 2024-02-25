import React from "react";
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
const Customers = () => {
  return (
    <Adminlayout>
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>30</TableCell>
            <TableCell>
                <IconButton color="primary"><EditIcon/></IconButton>
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          
        </TableBody>
      </Table>
    </Adminlayout>
  );
};

export default Customers;
