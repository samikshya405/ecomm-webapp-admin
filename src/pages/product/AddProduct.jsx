import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Adminlayout from "../../Component/layout/Adminlayout";
import CustomInput from "../../Component/form/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryAction,
  getCategorySubcollection,
} from "../../Redux/Categories/categoryAction";
import { addDoc, collection } from "firebase/firestore";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../../Firebase";

import AddCircleIcon from "@mui/icons-material/AddCircle";

const inputs = [
  // { name: "productName", label: "Product Name*", type: "radio", required: true },
  { name: "productName", label: "Product Name*", type: "text", required: true },
  { name: "price", label: "Price*", type: "number", required: true },
  { name: "image", label: "Image*", type: "file", required: true },
  {
    name: "description",
    label: "Description*",
    type: "textarea",
    required: true,
  },
];

const initialState = {
  productName: "",
  description: "",
  price: "",
  image: null,
};

const AddProduct = () => {
  const { categoriesList, selectedSubCategoriesList } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const [categoryOption, setCategoryOption] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [typeValue, setTypeValue] = useState("cloth/shoes");
  const [stock, setStock] = useState("");

  const handleCategoryChange = (event) => {
    const selection = event.target.value;
    setCategoryOption(selection);
    const selected = categoriesList.find(
      (category) => category.name === selection
    );
    setSelectedCategory(selected);
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const typechange = (e) => {
    setTypeValue(e.target.value);
  };
  const [boxes, setBoxes] = useState([{ size: "", stock: "" }]); // Initial state with one box

  const handleAddBox = () => {
    setBoxes([...boxes, { size: "", stock: "" }]); // Add a new box to the state
  };
  const handleInputChange = (index, fieldName, value) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index][fieldName] = value;
    setBoxes(updatedBoxes);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage(formData.image);
      const docData = {
        category: categoryOption,
        subcategory: subCategory,
        ...formData,
        image: imageUrl,
        type: typeValue,
      };
      if (stock !== "") {
        docData.stock = stock;
      }
      if (boxes[0].size !== "") {
        docData.sizes = boxes;
      }
      const docRef = await addDoc(collection(db, "products"), docData);
      toast.success("Product added");
      setFormData(initialState);

      setCategoryOption("");
      setSubCategory("");
    } catch (error) {
      console.log(error);
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
    if (selectedCategory?.id) {
      dispatch(getCategorySubcollection(selectedCategory.id));
    }
  }, [categoryOption]);

  return (
    <Adminlayout title="Add Product">
      <Stack padding={2}>
        <Box borderRadius={2} padding={3} elevation={5}>
          <form onSubmit={handleSubmit}>
            <InputLabel id="category-label">Select Categories*</InputLabel>
            <Select
              labelId="category-label"
              value={categoryOption}
              onChange={handleCategoryChange}
              fullWidth
              required
            >
              {categoriesList.map((category, index) => (
                <MenuItem key={index} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="sub-category-label">
              Select Sub-categories*
            </InputLabel>
            <Select
              labelId="sub-category-label"
              value={subCategory}
              onChange={handleSubCategoryChange}
              fullWidth
              required
            >
              {selectedSubCategoriesList.map((subcategory, index) => (
                <MenuItem key={index} value={subcategory.name}>
                  {subcategory.name}
                </MenuItem>
              ))}
            </Select>
            <FormControl component="fieldset">
              <FormLabel component="legend">Product type</FormLabel>
              <RadioGroup
                aria-label="option"
                name="option"
                value={typeValue}
                onChange={typechange}
              >
                <FormControlLabel
                  value="cloth/shoes"
                  control={<Radio />}
                  label="Cloth/shoes"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            {typeValue === "cloth/shoes" ? (
              <div>
                {boxes.map((box, index) => (
                  <Box key={index} sx={{ display: "flex" }}>
                    <TextField
                      label="Size"
                      value={box.size}
                      onChange={(e) =>
                        handleInputChange(index, "size", e.target.value)
                      }
                    />
                    <TextField
                      label="Stock"
                      value={box.stock}
                      onChange={(e) =>
                        handleInputChange(index, "stock", e.target.value)
                      }
                    />
                    {index === boxes.length - 1 && (
                      <IconButton onClick={handleAddBox}>
                        <AddCircleIcon sx={{ fontSize: "40px" }} />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </div>
            ) : (
              <>
                <InputLabel>Stock*</InputLabel>
                <TextField
                  name="stock"
                  type="number"
                  onChange={(e) => setStock(e.target.value)}
                  required:true
                />
              </>
            )}

            {inputs.map((input) => (
              <CustomInput
                key={input.name}
                {...input}
                onChange={handleChange}
              />
            ))}
            <Button variant="contained" type="submit" fullWidth>
              Add
            </Button>
          </form>
        </Box>
      </Stack>
    </Adminlayout>
  );
};

export default AddProduct;
