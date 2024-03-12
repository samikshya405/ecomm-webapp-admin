import React, { useEffect, useState } from "react";
import Adminlayout from "../../Component/layout/Adminlayout";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
 
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderHistory } from "../../Redux/order/orderHistoryAction";
import { getAllCustomers } from "../../Redux/customers/customerAction";

import MyModal from "../../Component/Categories/MyModal";

const OrderHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { allOrder } = useSelector((state) => state.order);
  const { customers } = useSelector((state) => state.customer);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    dispatch(getAllOrderHistory());
    dispatch(getAllCustomers());
  }, []);
  return (
    <Adminlayout title={"Order History"}>
      <TableContainer component={Paper} className="tableContainer">
        <Table className="table">
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
            {allOrder.map((order, index) => {
              const customerInfo = customers.filter(
                (customer) => customer.id === order.userId
              );
              return (
                <TableRow key={order.orderNumber}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                  <Box
                    sx={{
                      background:
                        order.status === "processing"
                          ? "yellow"
                          : order.status === "shipped"
                          ? "blue"
                          : order.status === "delivered"
                          ? "green"
                          : "",

                      width: "fit-content",
                      padding:'10px',
                      color:order.status==='processing' ? 'black':'white'
                    }}
                  >
                    {order.status}
                  </Box>
                  </TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order?.orderNumber}</TableCell>
                  <TableCell>
                    <Typography>{customerInfo?.fullName}</Typography>
                    <Typography>{customerInfo?.address}</Typography>
                  </TableCell>
                  <TableCell>
                    {order.orderDetails.map((product, index) => {
                      return (
                        <Typography key={index}>
                          {product?.productName}-{product?.quantity}
                        </Typography>
                      );
                    })}
                  </TableCell>
                  <TableCell>$1245</TableCell>
                  <TableCell>
                    <MyModal order={order}/>
                    
                    
                  </TableCell>
                </TableRow>
              );
            })}
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
