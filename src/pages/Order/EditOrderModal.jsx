import React, { useState } from 'react';
import { Modal, Button, Box, TextField } from '@mui/material';

const EditOrderModal = ({ open, onClose, onUpdateStatus }) => {
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    onUpdateStatus(status);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <label>Order status</label>
        <TextField
          id="status"
          
          variant="outlined"
          value={status}
          onChange={handleChange}
          fullWidth
          select
          SelectProps={{
            native: true,
          }}
        >
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </TextField>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>Update Status</Button>
      </Box>
    </Modal>
  );
};

export default EditOrderModal;
