import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrderHistory } from "../../Redux/order/orderHistoryAction";
import { getAllCustomers } from "../../Redux/customers/customerAction";

const RecentOrder = () => {
  const dispatch = useDispatch();
  const { allOrder } = useSelector((state) => state.order);
  const { customers } = useSelector((state) => state.customer);



  

  
  useEffect(() => {
    dispatch(getAllOrderHistory());
    dispatch(getAllCustomers());
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
      <div align="end" style={{ paddingRight: "20px" }}>
                <Link to='/orders'>
                  <Button>See more</Button>
                </Link>
              </div>
        <Table>
         
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Order Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Price</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
          {allOrder.slice(0,4).map((order, index) => {
              
              return (
                <TableRow key={order.orderNumber}>
                  <TableCell>{index + 1}</TableCell>
                 
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order?.orderNumber}</TableCell>
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

                      minWidth: 'fit-content',
                      maxWidth:'70%',
                      padding:'10px',
                      color:order.status==='processing' ? 'black':'white'
                      ,
                      textTransform:'capitalize',
                      textAlign:'center'
                    }}
                  >
                    {order.status}
                  </Box>
                  </TableCell>
                 
                 
                  <TableCell>$1245</TableCell>
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecentOrder;
