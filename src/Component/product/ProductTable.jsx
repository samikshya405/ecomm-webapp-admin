import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  
} from "@mui/material";
import { useSelector } from "react-redux";
import EachRow from "./TableRow";

const ProductTable = () => {
  const { productList } = useSelector((state) => state.product);
  
  return (
    <Box padding={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>IMG</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>SubCat</TableCell>
            <TableCell>ProductName</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((product) => {
            
            return (
              <EachRow key={product.uid} product={product}/>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ProductTable;
