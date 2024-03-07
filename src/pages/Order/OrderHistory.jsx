import React, { useEffect, useState } from "react";
import Adminlayout from "../../Component/layout/Adminlayout";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  
  
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase";
import TablePagination from '@mui/material/TablePagination';

const OrderHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };
  
  return (
    <Adminlayout title={'Order History'}>
      
      <TableContainer component={Paper} className='tableContainer'>
      <Table  className='table'>
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Order Number</TableCell>
            <TableCell>Customers Details</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Processing</TableCell>
            <TableCell>03/10/2024</TableCell>
            <TableCell>78787887</TableCell>
            <TableCell>
              <Typography>sam k</Typography>
              <Typography>1 park road</Typography>
              <Typography>Auburn , nsw</Typography>
              <Typography>Australia, 2144</Typography>
            </TableCell>
            <TableCell>
              <Typography>tablet -6</Typography>
              <Typography>calculator -4</Typography>
            </TableCell>
            <TableCell>$1245</TableCell>
            <TableCell>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
              
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Shipped</TableCell>
            <TableCell>03/10/2024</TableCell>
            <TableCell>78787887</TableCell>
            <TableCell>
              <Typography>sam k</Typography>
              <Typography>1 park road</Typography>
              <Typography>Auburn , nsw</Typography>
              <Typography>Australia, 2144</Typography>
            </TableCell>
            <TableCell>
              <Typography>tablet -6</Typography>
              <Typography>calculator -4</Typography>
            </TableCell>
            <TableCell>$1245</TableCell>
            <TableCell>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
              
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Delivered</TableCell>
            <TableCell>03/10/2024</TableCell>
            <TableCell>78787887</TableCell>
            <TableCell>
              <Typography>sam k</Typography>
              <Typography>1 park road</Typography>
              <Typography>Auburn , nsw</Typography>
              <Typography>Australia, 2144</Typography>
            </TableCell>
            <TableCell>
              <Typography>tablet -6</Typography>
              <Typography>calculator -4</Typography>
            </TableCell>
            <TableCell>$1245</TableCell>
            <TableCell>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
              
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={3}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </TableContainer>
    </Adminlayout>
  );
};

export default OrderHistory;
