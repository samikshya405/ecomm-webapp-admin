import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  TableContainer,
  Paper,
  
} from "@mui/material";
import { useSelector } from "react-redux";
import EachRow from "./TableRow";
import TablePagination from '@mui/material/TablePagination';

const ProductTable = () => {
  const { productList } = useSelector((state) => state.product);
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
    <Box padding={2}>
      <TableContainer  component={Paper}>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell sx={{ fontWeight: 'bold' }}>S/N</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>IMG</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>SubCat</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>ProductName</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product,index) => {
            
            return (
              <EachRow key={product.uid} product={product} index={index}/>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={productList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
