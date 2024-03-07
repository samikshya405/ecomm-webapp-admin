import React, { useEffect, useState } from "react";
import Adminlayout from "../../Component/layout/Adminlayout";
import CustomInput from "../../Component/form/CustomInput";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../Firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getSliderImage } from "../../Redux/imageslider/imageSliderAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const inputs = [
  { name: "image", label: "Image*", type: "file", required: true },
];

const Imageslider = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.imageSlider);
  const handleChange = (e) => {
    const { files } = e.target;

    setImage(files[0]);
  };
  const handleUplaod = async () => {
    try {
      const imageUrl = await uploadImage(image);
      const docData = {
        image: imageUrl,
      };
      const docRef = await addDoc(collection(db, "imageSlider"), docData);
      toast.success("Image added");
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
    dispatch(getSliderImage());
  }, [images]);
  return (
    <Adminlayout title="Image Slider">
      <Box padding={2}>
        <InputLabel>Image</InputLabel>
        <TextField
          type="file"
          margin="normal"
          onChange={handleChange}
          required
        />
        <Box>
          <Button variant="contained" onClick={handleUplaod}>
            Upload Image
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Image</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.map((image) => {
              return (
                <TableRow key={image.id}>
                  <TableCell>{image.id}</TableCell>
                  <TableCell>
                    <img width={200} src={image.image} alt="" />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {/* <TableRow>
            
          </TableRow> */}
          </TableBody>
        </Table>
      </Box>
    </Adminlayout>
  );
};

export default Imageslider;
