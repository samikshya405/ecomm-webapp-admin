import React, { useEffect, useState } from "react";
import Adminlayout from "../../Component/layout/Adminlayout";
import AddCategory from "../../Component/Categories/AddCategory";
import SubCategories from "../../Component/Categories/SubCategories";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryAction,
  getCategorySubcollection,
} from "../../Redux/Categories/categoryAction";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import MyModal from "../../Component/Categories/MyModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { deleteDoc, doc,collection } from "firebase/firestore";
import { db } from "../../Firebase";


const Categories = () => {
  const dispatch = useDispatch();
  const { categoriesList, selectedSubCategoriesList } = useSelector(
    (state) => state.categories
  );
  const [selectedCategory, setselectedCategory] = useState({});
  const [hoveredItem, setHoveredItem] = useState({});

  const handleCategory = (category) => {
    setselectedCategory(category);
  };
  const handleCatgeoryEdit = (event, category) => {
    event.stopPropagation();

    console.log("hello");
  };
  const handleCategoryDelete = async (e, category) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "categories", category.id));
        toast.success("Deleted successfully");
        console.log("item deleted");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSubCatgeoryEdit = (event, category) => {
    event.stopPropagation();

    console.log("hello");
  };
  const handleSubCategoryDelete = async (e, subcategory, selectedCategory) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        const parentDocRef = doc(db, "categories", selectedCategory.id); // Assuming 'parentId' is the ID of the parent category document
        const subcategoryDocRef = doc(
          parentDocRef.collection("subCategories").doc(subcategory.id)
        );
        await deleteDoc(subcategoryDocRef);
        toast.success("Deleted successfully");
        console.log("item deleted");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleMouseEnter = (category) => {
    setHoveredItem(category);
  };
  const handleMouseLeave = () => {
    setHoveredItem({});
  };

  useEffect(() => {
    dispatch(categoryAction());
  }, [categoriesList]);

  useEffect(() => {
    if (selectedCategory.id) {
      dispatch(getCategorySubcollection(selectedCategory.id));
    }
  }, [selectedCategory, selectedSubCategoriesList]);

  return (
    <Adminlayout title="categories">
      <Grid container marginLeft={2}>
        <Grid item xs={12} sm={4} md={6}>
          <Paper>
            <Typography sx={{ marginBottom: "10px" }}>Categories</Typography>
            <MyModal title="category" />

            {categoriesList.map((category, index) => {
              return (
                <Box
                  sx={{
                    padding: "5px",
                    textTransform: "capitalize",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  key={category.name + index}
                  onMouseEnter={() => handleMouseEnter(category)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Box
                    onClick={() => handleCategory(category)}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "5px",

                      color:
                        selectedCategory.id === category.id ? "white" : "black",
                      background:
                        selectedCategory.id === category.id ? "black" : "white",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography>{category.name}</Typography>
                      {hoveredItem.id === category.id ? (
                        <>
                          <EditIcon
                            onClick={(event) =>
                              handleCatgeoryEdit(event, category)
                            }
                          />
                          <DeleteIcon
                            onClick={(e) => handleCategoryDelete(e, category)}
                          />
                        </>
                      ) : null}
                    </Box>
                    <ArrowForwardIosIcon />
                  </Box>
                </Box>
              );
            })}
          </Paper>
        </Grid>
        {selectedCategory.id && (
          <Grid item xs={12} sm={4} md={4}>
            <Paper sx={{ minHeight: "40vh" }}>
              <Typography
                sx={{
                  marginBottom: "10px",
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                {selectedCategory.name}
              </Typography>
              <MyModal title="subCategory" id={selectedCategory.id} />
              {selectedSubCategoriesList.length > 0 ? (
                selectedSubCategoriesList.map((category, index) => {
                  return (
                    <Box
                      sx={{
                        padding: "5px",
                        textTransform: "capitalize",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      key={category.name + index}
                      onMouseEnter={() => handleMouseEnter(category)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "5px",

                          width: "100%",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <MoreVertIcon sx={{ cursor: "pointer" }} />

                          <Typography>{category.name}</Typography>
                          {hoveredItem.id === category.id ? (
                            <>
                              <EditIcon
                                onClick={(event) =>
                                  handleSubCatgeoryEdit(event, category)
                                }
                              />
                              <DeleteIcon
                                onClick={(e) =>
                                  handleSubCategoryDelete(
                                    e,
                                    category,
                                    selectedCategory
                                  )
                                }
                              />
                            </>
                          ) : null}
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Typography padding={2}>
                  No sub-categories has been added yet
                </Typography>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Adminlayout>
  );
};

export default Categories;
