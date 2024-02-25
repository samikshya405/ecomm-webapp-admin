import React, { useState } from "react";
import CustomInput from "../form/CustomInput";
import { Box, Button, Stack, Typography } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
const inputs = [{ name: "category", label: "Enter a Category", type: "text" }];

const AddCategory = () => {
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(category.trim()==''){
     
      return
    }
    try {
      const docRef = await addDoc(collection(db, "categories"), {
        name: category,
      });
      toast.success("categories added");
      setCategory("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <Stack>
      <Box
        borderRadius={2}
        border={1}
        padding={3}
        elevation={5}
        className="form"
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" align="center">
            Add categories
          </Typography>
          {inputs.map((input) => {
            return (
              <CustomInput
                key={input.name}
                label={input.label}
                {...input}
                value={category}
                onChange={handleChange}
                
              />
            );
          })}

          <Button variant="contained" type="submit" fullWidth>
            Add categories
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default AddCategory;
