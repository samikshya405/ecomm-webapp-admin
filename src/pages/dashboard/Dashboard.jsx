import React, { useEffect } from "react";
import Adminlayout from "../../Component/layout/Adminlayout";
import { Box, Grid, Paper, Typography } from "@mui/material";

import client from "../../assets/img/client.png";
import order from "../../assets/img/order.png";
import sales from "../../assets/img/sales.png";
import prod from "../../assets/img/prod.png";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../Redux/product/prouctAction";
import { getAllCustomers } from "../../Redux/customers/customerAction";
import SalesChart from "../../Component/chart/SalesChart";
import RecentOrder from "../../Component/Order/RecentOrder";
import { getAllOrderHistory } from "../../Redux/order/orderHistoryAction";
const Dashboard = () => {
  const { productList } = useSelector((state) => state.product);
  const { customers } = useSelector((state) => state.customer);
  const {allOrder} =useSelector((state)=>state.order)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductAction());
    dispatch(getAllCustomers());
    dispatch(getAllOrderHistory())
  }, []);
  const totalSales = allOrder.reduce((a, b) => {
    return a + b.totalPrice;
  }, 0);
  return (
    <Adminlayout title={"dashboard"}>
      {/* <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={9} > */}
        <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={6} lg={3}>
          <Paper
            elevation={5}
            sx={{
              height: "100px",
              background: "var(--purple)",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                width={"70px"}
                style={{ objectFit: "contain" }}
                src={sales}
                alt=""
              />
            </Box>
            <Box padding={2}>
              <Typography variant="h5">Sales</Typography>
              <h2 style={{ textAlign: "center" }}>${parseFloat(totalSales.toFixed(2))}</h2>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={3}>
          <Paper
            elevation={5}
            sx={{
              height: "100px",
              background: "var(--pink)",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                width={"70px"}
                style={{ objectFit: "contain" }}
                src={order}
                alt=""
              />
            </Box>
            <Box padding={2}>
              <Typography variant="h5">Orders</Typography>
              <h2 style={{ textAlign: "center" }}>{allOrder.length}</h2>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={6} md={6} lg={3}>
          <Paper
            elevation={5}
            sx={{
              height: "100px",
              background: "var(--activeItem)",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                width={"70px"}
                style={{ objectFit: "contain" ,
              overflow:'hidden'}}
                src={prod}
                alt=""
              />
            </Box>
            <Box padding={2}>
              <Typography variant="h5">Products</Typography>
              <h2 style={{ textAlign: "center" }}>{productList.length}</h2>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={3}>
          <Paper
            elevation={5}
            sx={{
              height: "100px",
              background: "var(--orange)",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                width={"70px"}
                style={{ objectFit: "contain" }}
                src={client}
                alt=""
              />
            </Box>
            <Box padding={2}>
              <Typography variant="h5">Clients</Typography>
              <h2 style={{ textAlign: "center" }}>{customers.length}</h2>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <SalesChart/>
      <h2 style={{margin:'30px 0'}}>Recent Orders</h2>
      <RecentOrder/>
        {/* </Grid> */}

       {/* </Grid> */}
     
    </Adminlayout>
  );
};

export default Dashboard;
