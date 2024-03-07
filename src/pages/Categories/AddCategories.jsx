import React, { useEffect, useState } from "react";
import Adminlayout from "../../Component/layout/Adminlayout";
import CustomInput from "../../Component/form/CustomInput";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCategory,
  addSubCategory,
  categoryAction,
  getAllSubCategory,
} from "../../Redux/Categories/categoryAction";

import { storage } from "../../Firebase";

import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";



const AddCategories = () => {
  const { categoriesList, selectedSubCategoriesList, subCategoryList } =
    useSelector((state) => state.categories);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryOption, setCategoryOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState({ imageSrc: "", categoryImage: "" });
  const handleImageChange = (e) => {
    const { files } = e.target;
    setImage({
      imageSrc: URL.createObjectURL(files[0]),
      categoryImage: files[0],
    });
  };
  const handleCategoryChange = (event) => {
    const selection = event.target.value;
    setCategoryOption(selection);
    if (selection !== "No Parent Category") {
      const selected = categoriesList.find((item) => item.name === selection);
      setSelectedCategory(selected);
    }
  };
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage(image.categoryImage);
    const docData = {
      name: categoryName,
      categoryImage: imageUrl,
    };
    if (selectedCategory?.id) {
      docData.parentCat = selectedCategory.name;
      docData.parentCatId = selectedCategory.id;
      dispatch(addSubCategory(selectedCategory.id, docData));
      navigate("/categories");
    } else {
      dispatch(addCategory(docData));
      navigate("/categories");
    }
  };
  const uploadImage = async (image) => {
    const imageRef = storageRef(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);
    return getDownloadURL(imageRef);
  };

  useEffect(() => {
    dispatch(categoryAction());
  }, []);

  useEffect(() => {
    dispatch(getAllSubCategory(categoriesList));
  }, [categoriesList]);

  return (
    <Adminlayout title={"Add Category"}>
      <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
        <InputLabel id="category-label">Select Parent Category*</InputLabel>
        <Select
          labelId="category-label"
          value={categoryOption}
          onChange={handleCategoryChange}
          fullWidth
          required
        >
          <MenuItem value="No Parent Category">No Parent Category</MenuItem>
          {categoriesList.map((category, index) => (
            <MenuItem key={index} value={category.name} sx={{textTransform:'capitalize'}}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <CustomInput
          label="Category Name"
          type={"text"}
          value={categoryName}
          onChange={handleCategoryNameChange}
        />
        <CustomInput
          label="Category Image"
          type={"file"}
          onChange={handleImageChange}
        />
        <img width={"100px"} src={image.imageSrc} alt="" /> <br />
        <Button variant="contained" type="submit">
          Update
        </Button>
      </form>
    </Adminlayout>
  );
};

export default AddCategories;
