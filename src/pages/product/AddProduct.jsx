import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
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
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

const inputs = [
  // { name: "productName", label: "Product Name*", type: "radio", required: true },
  { name: "productName", label: "Product Name*", type: "text", required: true },
  { name: "price", label: "Price*", type: "number", required: true },
  // { name: "image", label: "Main Image*", type: "file", required: true },
  
  {
    name: "description",
    label: "Description*",
    type: "textarea",
    required: true,
  },
  { name: "image", label: "Main Image*", type: "file", required: true },
];

const initialState = {
  productName: "",
  description: "",
  price: "",
  image: "",
};

const AddProduct = () => {
  const { categoriesList, selectedSubCategoriesList } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [categoryOption, setCategoryOption] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [typeValue, setTypeValue] = useState("cloth/shoes");
  const [stock, setStock] = useState("");
  const [boxes, setBoxes] = useState([{ size: "", stock: "" }]);
  const [photos, setPhotos] = useState([{optional:''}])
 

  //category
  const handleCategoryChange = (event) => {
    const selection = event.target.value;
    setCategoryOption(selection);
    const selected = categoriesList.find(
      (category) => category.name === selection
    );
    setSelectedCategory(selected);
  };
  //subcategory
  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  //formdata change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0]});
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  //for the types of product either shoes/cloth or other
  const typechange = (e) => {
    setTypeValue(e.target.value);
  };

  //adding size and stock as required
  const handleAddBox = () => {
    setBoxes([...boxes, { size: "", stock: "" }]); // Add a new box to the state
  };
  const handleDeleteBox=(index)=>{
    const updatedBoxes = [...boxes];
  updatedBoxes.splice(index, 1);
  setBoxes(updatedBoxes);

  }

  //taking sizes and stock from users
  const handleInputChange = (index, fieldName, value) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index][fieldName] = value;
    setBoxes(updatedBoxes);
  };

  

  //form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage(formData.image);
      const optionalImageUrl = []
      for (const item of photos){
        const a = await uploadImage(item.optional)
        optionalImageUrl.push(a)
      }
     
      const docData = {
        category: categoryOption,
        subcategory: subCategory,
        ...formData,
        image: imageUrl,
        optionalImages :optionalImageUrl,
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
      navigate('/product')

      
    } catch (error) {
      console.log(error);
    }
  };



  //uploading image
  const uploadImage = async (image) => {
    const imageRef = storageRef(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);
    return getDownloadURL(imageRef);
  };


  const handleImageChange=(index,fieldName,value)=>{
    const updatedPhotos = [...photos];
    updatedPhotos[index][fieldName] = value;
    updatedPhotos[index].imageSrc =URL.createObjectURL(value);
    setPhotos(updatedPhotos);
    console.log(photos)

  }
  const handleAddImage=()=>{
    setPhotos([...photos, {optional:''}])

  }
  const handleDeleteImage=(index)=>{
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);

  }

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
        <Paper sx={{padding:'10px'}} >
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
                <MenuItem key={index} value={category.name} sx={{textTransform:'capitalize'}}>
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
                <MenuItem key={index} value={subcategory.name} sx={{textTransform:'capitalize'}}>
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
                    {
                    index!=0 && (
                      <IconButton onClick={()=>handleDeleteBox(index)}><ClearIcon/></IconButton>
                      
                    )
                  }
                  
                    
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
                  required
                />
              </>
            )}

            {inputs.map((input) => (
              <CustomInput
                key={input.name}
                {...input}
                onChange={handleChange}
                // value={formData[input.name]}
              />
            ))}
            <InputLabel>Optional Image</InputLabel>
            {photos.length==0 && (
              <IconButton onClick={handleAddImage}>
              <AddCircleIcon sx={{ fontSize: "40px" }} />
            </IconButton>

            )}
            {
              photos.map((photo,index)=>{
                return <Box p={2}  key={index}>
                <IconButton onClick={()=>handleDeleteImage(index)}><ClearIcon/></IconButton>
                {
                  photo.imageSrc && (
                    <img width={'50px'} src={photo.imageSrc} alt='No image'/>
                  )
                }
                  
                  <TextField  type="file" onChange={(e)=>handleImageChange(index,"optional", e.target.files[0])} />
                  {index === photos.length - 1 && (
                      <IconButton onClick={handleAddImage}>
                        <AddCircleIcon sx={{ fontSize: "40px" }} />
                      </IconButton>
                    )}
                    
                
                </Box>
              })
            }
            <br />

           
            <Button sx={{marginTop:'10px'}} variant="contained" type="submit" >
              Add Product
            </Button>
          </form>
        </Paper>
      </Stack>
    </Adminlayout>
  );
};

export default AddProduct;
