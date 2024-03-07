import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SubCategoriesTable = ({subCategoryList,handleCatgeoryEdit,handleSubCategoryDelete}) => {
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [categoryActive, setcategoryActive] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Parent Cat</TableCell>
            <TableCell>SubCat Image</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subCategoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.parentCat}</TableCell>
                <TableCell>
                  <img width={"50px"} src={item.categoryImage} alt="" />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={(event) => handleCatgeoryEdit(event, item)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleSubCategoryDelete(item.parentCatId,item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          
        </TableBody>
      </Table>
      <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={subCategoryList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
    </TableContainer>
  );
};

export default SubCategoriesTable;
