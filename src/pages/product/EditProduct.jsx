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
  Typography,
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
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductAction,
  updateProductAction,
} from "../../Redux/product/prouctAction";

const inputs = [
  // { name: "productName", label: "Product Name*", type: "radio", required: true },
  { name: "productName", label: "Product Name*", type: "text", required: true },
  { name: "price", label: "Price*", type: "number", required: true },

  {
    name: "description",
    label: "Description*",
    type: "textarea",
    required: true,
  },
  // { name: "image", label: "Image*", type: "file", required: true },
];
const initialState = {
  productName: "",
  description: "",
  price: "",
};

const EditProduct = () => {
  const { id } = useParams();
  const { productList } = useSelector((state) => state.product);
  const productSelected = productList.find((product) => product.uid === id);
  console.log(productSelected)

  const { categoriesList, selectedSubCategoriesList } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [categoryOption, setCategoryOption] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [typeValue, setTypeValue] = useState("cloth/shoes");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState('')
  const [photos, setPhotos] = useState([{optional:''}])

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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file)
    
  };
  const handleImageDelete=(index)=>{
    const updatedPhotos = [...photos];
  updatedPhotos.splice(index, 1);
  setPhotos(updatedPhotos);

  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageSrc = productSelected.image
      if(image){
        imageSrc = await uploadImage(image);

      }
      const optionalImageUrl = []
      for (const item of photos){
        if(item.recentlyAdded){
          const imgUrl = await uploadImage(item.optional)
          optionalImageUrl.push(imgUrl)

        }else{
          const imgUrl = item.imageSrc
          optionalImageUrl.push(imgUrl)
        }
        
        
      }
      
      // const imageSrc = await uploadImage(image);
      const docData = {
        uid: id,
        category: categoryOption,
        subcategory: subCategory,
        image:imageSrc,
        optionalImages :optionalImageUrl,
        ...formData,
        type: typeValue,
      };
     
      if (stock !== "") {
        docData.stock = stock;
      }
      if (boxes[0].size !== "") {
        docData.sizes = boxes;
      }
      dispatch(updateProductAction(docData));
      navigate('/product')
      
      
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (image) => {
    const imageRef = storageRef(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);
    return getDownloadURL(imageRef);
  };
  const handleOptionalImageChange=(index,fieldName,value)=>{
    const updatedPhotos = [...photos];
    updatedPhotos[index][fieldName] = value;
    updatedPhotos[index].imageSrc =URL.createObjectURL(value);
    updatedPhotos[index].recentlyAdded = true;
    setPhotos(updatedPhotos);
    console.log(photos)

  }
  const handleAddImage=()=>{
    setPhotos([...photos, {optional:''}])

  }
  useEffect(() => {
    dispatch(categoryAction());
    dispatch(getProductAction());
  }, []);
  useEffect(() => {
    if (productSelected?.uid) {
      setTypeValue(productSelected.type);
      const category = categoriesList.find(
        (category) => category.name === productSelected.category
      );
      setCategoryOption(category?.name);
      setSelectedCategory(category);
      setSubCategory(productSelected.subcategory);
      setImageUrl(productSelected.image);
      initialState.productName = productSelected.productName;
      initialState.price = productSelected.price;
      initialState.description = productSelected.description;
      if (productSelected.type === "other") {
        setStock(productSelected.stock);
      }
      if(productSelected.type==='cloth/shoes'){
        setBoxes(productSelected.sizes)
      }
      if(productSelected.optionalImages){
        const imageArr =[]
        for(const item of productSelected.optionalImages){
          let a = {optional:'', imageSrc:item}
          imageArr.push(a)
        }
        setPhotos(imageArr)
      }
    }
  }, [productSelected]);

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
              value={categoryOption || ""}
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
              value={subCategory || ""}
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
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </>
            )}

            {inputs.map((input) => (
              <CustomInput
                key={input.name}
                {...input}
                value={formData[input.name]}
                onChange={handleChange}
              />
            ))}
            <InputLabel  >Main Image *</InputLabel>
            <img width={"100px"} src={imageUrl} alt="" /> 
            <TextField type="file"  onChange={handleImageChange} margin="normal" />
            <InputLabel>Optional Image</InputLabel>
            {photos.length==0 && (
              <IconButton onClick={handleAddImage}>
              <AddCircleIcon sx={{ fontSize: "40px" }} />
            </IconButton>

            )}
            {
              photos.map((photo,index)=>{
                return <Box padding={2} key={index}>
                  <IconButton onClick={()=>handleImageDelete(index)}><ClearIcon/></IconButton>
                  <img width={'50px'} src={photo.imageSrc} alt='No image'/>
                  
                  <TextField type="file" onChange={(e)=>handleOptionalImageChange(index,"optional", e.target.files[0])} /> 
                  {index === photos.length - 1 && (
                      <IconButton onClick={handleAddImage}>
                        <AddCircleIcon sx={{ fontSize: "40px" }} />
                      </IconButton>
                    )}
                
                </Box>
              })
            }

            <Button variant="contained" type="submit" fullWidth>
              Update
            </Button>
           

          </form>
        </Box>
      </Stack>
    </Adminlayout>
  );
};

export default EditProduct;





