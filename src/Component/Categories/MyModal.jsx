import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  InputLabel,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../Redux/order/orderHistoryAction";

const MyModal = ({ order }) => {
  const [open, setOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState(order.status);
  const dispatch=useDispatch()

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const handleAdd=()=>{
  const updateddata ={...order,status:selectedValue}
  dispatch(updateStatus(order.uid,updateddata))

  setOpen(false);

}
  return (
    <div>
      <IconButton color="primary" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
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
            // height: "200px",
          }}
        >
          <h2>Update Order</h2>
          <InputLabel>Order-Number</InputLabel>
          <TextField value={order.orderNumber} fullWidth />
          <InputLabel>Status</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={selectedValue}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="processing">processing</MenuItem>
            <MenuItem value="shipped">shipped</MenuItem>
            <MenuItem value="delivered">delivered</MenuItem>
          </Select>

          <Box>
            <Button
              sx={{ margin: "5px" }}
              type="submit"
              onClick={handleAdd}
              variant="contained"
            >
              update status
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MyModal;
