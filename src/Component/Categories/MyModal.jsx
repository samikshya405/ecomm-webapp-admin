import React, { useState } from "react";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";

const MyModal = ({ title, id }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = async () => {
    if (inputValue.trim() == "") {
      return;
    }
    if (title === "category") {
      try {
        const docRef = await addDoc(collection(db, "categories"), {
          name: inputValue,
        });
        toast.success("categories added");
        setOpen(false);
        setInputValue('')
        
      } catch (error) {
        console.log(error);
      }
    } else if (title === "subCategory") {
      const parentDocRef = doc(db, "categories", id);
      const subcollectionRef = collection(parentDocRef, "subCategories");

    
      const subcollectionData = {
        name: inputValue,
      };

      try {
        const newSubDocRef = await addDoc(subcollectionRef, subcollectionData);

        toast.success("subcategories added");
        setOpen(false);
        setInputValue('')
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{ color: "black", fontWeight: "600" }}>
        <AddIcon /> Add Categories
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 2,
            width: "500px",
            height: "200px",
          }}
        >
          <TextField
            value={inputValue}
            fullWidth
            label="categories"
            onChange={handleChange}
          />
          
          <Box>
            <Button
              sx={{ margin: "5px" }}
              type="submit"
              onClick={handleAdd}
              variant="contained"
            >
              ADD
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MyModal;
