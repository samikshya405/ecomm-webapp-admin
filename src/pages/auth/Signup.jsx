import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomInput from "../../Component/form/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";

const inputs = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "phone", label: "Phone", type: "number", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "createPassword",
    label: "Create Password",
    type: "password",
    required: true,
  },
  {
    name: "password",
    label: "Re-enter Password",
    type: "password",
    required: true,
  },
];
const initialstate = {
  fullName: "",
  phone: "",
  email: "",
  createPassword: "",
  password: "",
};
const Signup = () => {
  const [formData, setformData] = useState(initialstate);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { createPassword, password, ...restFormData } = formData;
    const { email } = formData;
    if (createPassword != password) {
      return toast.error("password didnot match");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = userCredential.user;
      

      await setDoc(doc(db, "users", uid), {
        ...restFormData,
        uid,
        role:'admin'
      });
      toast.success("user created successfully!");
      navigate('/users')
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
  return (
    <>
      <Stack className="form-wrapper">
        <Box borderRadius={3} padding={2} elevation={5} className="form">
          <form onSubmit={handleSubmit}>
            <Typography textAlign="center">Admin Signup</Typography>

            {inputs.map((input) => {
              return (
                <CustomInput
                  key={input.name}
                  {...input}
                  
                  onChange={handleChange}
                />
              );
            })}
            <Button variant="contained" type="submit" fullWidth>
              Create an Account
            </Button>
          </form>
         
        </Box>
      </Stack>
    </>
  );
};

export default Signup;
