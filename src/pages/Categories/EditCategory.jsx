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
  updateCategory,
  updateSubCategory,
} from "../../Redux/Categories/categoryAction";
import { addDoc, collection, doc } from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { toast } from "react-toastify";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

const inputs = [
  {
    name: "category",
    label: "Category Name",
    type: "text",
    required: true,
  },
  {
    name: "categoryImage",
    label: "Thumbnail ",
    type: "file",
    required: true,
  },
];

const EditCategory = () => {
  const { id } = useParams();
  // console.log(id)
  const { categoriesList, selectedSubCategoriesList, subCategoryList } =
    useSelector((state) => state.categories);
  const category = [...categoriesList, ...subCategoryList].find(
    (category) => category.id === id
  );
  // console.log(category)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryOption, setCategoryOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState({ imageSrc: "", categoryImage: "" });
  const [imageUploaded, setImageUploaded] = useState(false);
  const handleImageChange = (e) => {
    const { files } = e.target;
    setImage({
      ...image,
      imageSrc: URL.createObjectURL(files[0]),
      categoryImage: files[0],
    });
    setImageUploaded(true);
  };
  const handleCategoryChange = (event) => {
    const selection = event.target.value;
    setCategoryOption(selection);
  };
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (imageUploaded) {
      imageUrl = await uploadImage(image.categoryImage);
    } else {
      imageUrl = image.imageSrc;
    }

    const docData = {
      name: categoryName,
      categoryImage: imageUrl,
    };

    if (!selectedCategory) {
      dispatch(updateCategory(category.id, docData));
    } else {
      docData.parentCat = categoryOption;
      dispatch(
        updateSubCategory(
          selectedCategory.parentCatId,
          selectedCategory.id,
          docData
        )
      );
    }
    navigate('/categories')
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
  useEffect(() => {
    if (category?.id) {
      if (category?.categoryImage) {
        setImage((prevImage) => ({
          ...prevImage,
          imageSrc: category.categoryImage,
        }));
      }

      if (category?.parentCat) {
        setCategoryOption(category.parentCat);
        const selection = category.name;
        const selected = subCategoryList.find(
          (category) => category.name === selection
        );
        setSelectedCategory(selected);
      } else {
        setCategoryOption("No Parent Category");
      }

      setCategoryName(category.name);
    }
  }, [category]);
  return (
    <Adminlayout title={"Edit Category"}>
      <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
        <InputLabel id="category-label">Select Parent Category*</InputLabel>
        <Select
          labelId="category-label"
          value={categoryOption}
          onChange={handleCategoryChange}
          fullWidth
          required
        >
          <MenuItem value="No Parent Category">No parent Category</MenuItem>
          {categoriesList.map((category, index) => (
            <MenuItem key={index} value={category.name}>
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

export default EditCategory;
