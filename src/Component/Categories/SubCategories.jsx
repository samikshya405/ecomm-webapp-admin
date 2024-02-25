import React, { useEffect, useState } from "react";
import CustomInput from "../form/CustomInput";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { db } from "../../Firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { toast } from "react-toastify";
const inputs = [
  { name: "subCategory", label: "Enter a Sub Category", type: "text" },
];

const SubCategories = () => {
  const { categoriesList } = useSelector((state) => state.categories);
  const [selectedOption, setSelectedOption] = useState("");
  const [subCategory, setsubCategory] = useState("");
  const selectedCategory = categoriesList.find(
    (item) => item.name === selectedOption
  );

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    
  };
  const handleSubCategoriesChange = (e) => {
    setsubCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parentDocRef = doc(db, "categories", selectedCategory.id);

    // Reference to the subcollection
    const subcollectionRef = collection(parentDocRef, "subCategories");

    // Data to be added to the subcollection document
    const subcollectionData = {
      name:subCategory
      
    };

    // Add a new document to the subcollection
    try {
      const newSubDocRef = await addDoc(subcollectionRef, subcollectionData);
     
      toast.success('subcategories added')
      setsubCategory('')
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <Stack padding={5}>
      <Box
        borderRadius={2}
        border={1}
        padding={3}
        elevation={5}
        className="form"
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" align="center">
            Add Sub-categories
          </Typography>

          <InputLabel id="demo-simple-select-outlined-label">
            Select Categories
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={selectedOption}
            onChange={handleChange}
            label="Select Option"
            fullWidth
          >
            {categoriesList.map((category, index) => {
              return (
                <MenuItem key={index} value={category.name}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
          {inputs.map((input) => {
            return (
              <CustomInput
                key={input.name}
                {...input}
                value={subCategory}
                onChange={handleSubCategoriesChange}
              />
            );
          })}

          <Button variant="contained" type="submit" fullWidth>
            Add sub categories
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default SubCategories;
