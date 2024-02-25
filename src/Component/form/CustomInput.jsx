import { InputLabel, TextField } from '@mui/material'
import React from 'react'

const CustomInput = ({type,label,value, ...rest}) => {
  if (type === 'textarea') {
    return (
      <>
      <InputLabel >{label}</InputLabel>
      <TextField
        {...rest}
        
        fullWidth
        multiline
        rows={4} // Adjust rows as needed
        margin="normal"
      />
      </>
    );
  } else {
    return (
      <>
      <InputLabel >{label}</InputLabel>
      <TextField
      type={type}
        {...rest}
        
        fullWidth
        margin="normal"
      />
      </>
    );
  }
}

export default CustomInput