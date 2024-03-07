import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const RecentOrder = () => {
  return (
    <>
      <TableContainer component={Paper}>
      <div align="end" style={{ paddingRight: "20px" }}>
                <Link>
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>fragnance</TableCell>
              <TableCell>0090990</TableCell>
              <TableCell>09/78/90</TableCell>
              <TableCell>Recieved</TableCell>
              <TableCell>
                <Button>View Details</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>fragnance</TableCell>
              <TableCell>0090990</TableCell>
              <TableCell>09/78/90</TableCell>
              <TableCell>Recieved</TableCell>
              <TableCell>
                <Button>View Details</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>fragnance</TableCell>
              <TableCell>0090990</TableCell>
              <TableCell>09/78/90</TableCell>
              <TableCell>Recieved</TableCell>
              <TableCell>
                <Button>View Details</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>fragnance</TableCell>
              <TableCell>0090990</TableCell>
              <TableCell>09/78/90</TableCell>
              <TableCell>Recieved</TableCell>
              <TableCell>
                <Button>View Details</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecentOrder;
