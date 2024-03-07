import React, { useEffect, useState } from "react";
import Adminlayout from "../../Component/layout/Adminlayout";

import { useDispatch, useSelector } from "react-redux";
import {
  categoryAction,
  deleteCategory,
  deleteSubCategory,
  getAllSubCategory,
  getCategorySubcollection,
} from "../../Redux/Categories/categoryAction";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TablePagination from "@mui/material/TablePagination";

import { Link, useNavigate } from "react-router-dom";

import AccordionContent from "../../Component/Categories/AccordianContent";
import SubCategoriesTable from "../../Component/Categories/SubCategoriesTable";


const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoriesList, selectedSubCategoriesList, subCategoryList } =
    useSelector((state) => state.categories);
  const [selectedCategory, setselectedCategory] = useState({});
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

  const handleCatgeoryEdit = (category) => {
    navigate(`/editCatgeory/${category.id}`);
  };
  const handleCategoryDelete = (e, category) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      dispatch(deleteCategory(category.id));
    }
  };

  const handleSubCategoryDelete = async (parentCatId, id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      dispatch(deleteSubCategory(parentCatId, id));
    }
  };

  const [expandedRow, setExpandedRow] = useState(null);

  const handleViewSubCat = (category) => {
    setExpandedRow(expandedRow === category.id ? null : category.id);
    setselectedCategory(category);
  };

  const showCategory = () => {
    setcategoryActive(true);
  };
  const showSubCategory = () => {
    setcategoryActive(false);
  };
  useEffect(() => {
    dispatch(categoryAction());
  }, []);
  useEffect(() => {
    dispatch(getAllSubCategory(categoriesList));
  }, [categoriesList]);

  useEffect(() => {
    if (selectedCategory.id) {
      dispatch(getCategorySubcollection(selectedCategory.id));
    }
  }, [selectedCategory.id]);

  return (
    <Adminlayout title="categories">
      <div align="end" style={{ paddingRight: "20px", margin: "20px 0" }}>
        <Link to={"/addCategory"}>
          <Button variant="contained" className="btn">
            {" "}
            <AddIcon />
            Add category
          </Button>
        </Link>
      </div>
      <Stack direction={"row"} spacing={3} marginBottom={2}>
        <Button
          style={{ color: categoryActive ? "blue" : "black" }}
          onClick={showCategory}
        >
          Category
        </Button>
        <Button
          style={{ color: categoryActive ? "black" : "blue" }}
          onClick={showSubCategory}
        >
          Sub Category
        </Button>
      </Stack>

    
      {categoryActive ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>CategoryName</TableCell>
                <TableCell>CategoryImage</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  const isRowExpanded = expandedRow === item.id;

                  return (
                    <React.Fragment key={item.id}>
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell sx={{ textTransform: "capitalize" }}>
                          {item.name}
                        </TableCell>
                        <TableCell>
                          <img width={"60px"} src={item.categoryImage} alt="" />
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleViewSubCat(item)}>
                            View SubCat
                          </Button>
                          <IconButton
                            color="primary"
                            onClick={() => handleCatgeoryEdit(item)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={(e) => handleCategoryDelete(e, item)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      {isRowExpanded && (
                        <TableRow>
                          <TableCell colSpan={4}>
                            <AccordionContent
                              details={selectedSubCategoriesList}
                              handleSubCategoryDelete={handleSubCategoryDelete}
                              handleCatgeoryEdit={handleCatgeoryEdit}
                            />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={categoriesList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <SubCategoriesTable
          subCategoryList={subCategoryList}
          handleCatgeoryEdit={handleCatgeoryEdit}
          handleSubCategoryDelete={handleSubCategoryDelete}
        />
      )}
      
      

    </Adminlayout>
  );
};

export default Categories;
