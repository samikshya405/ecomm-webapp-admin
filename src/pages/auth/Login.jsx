import React, {  useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import CustomInput from "../../Component/form/CustomInput";
import { Link, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { getUserInfoAction } from "../../Redux/Auth/authAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const inputs = [
  { name: "email", label: "Email", type: "email", required: true },
  { name: "password", label: "Password", type: "password", required: true },
];
const Login = () => {
  
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userInfo} = useSelector(state=>state.auth)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {email, password} = formData

    try{
      const signinPromise = signInWithEmailAndPassword(auth, email, password)
      toast.promise(signinPromise, {
        pending: "In progress..."
      });
      const userCredential = await signinPromise
      const {uid} = userCredential.user
      dispatch(getUserInfoAction(uid))

    }catch(error){
      console.log(error)

    }
  };

  useEffect(()=>{
    if (userInfo.uid) {
      navigate('/');
    }

  },[userInfo.uid])
  
  return (
    <>
      <Stack className="form-wrapper">
        <Box
          
          borderRadius={2}
          padding={3}
          elevation={5}
          className="form"
        >
          <form onSubmit={handleSubmit}>
            <Typography textAlign='center' >Admin login</Typography>
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
              Log in
            </Button>
            <Box padding={2}>
            <Typography>Email: test1122@gmail.com</Typography>
            <Typography>Password: 123123</Typography>
            </Box>
          </form>
          
        </Box>
      </Stack>
    </>
  );
};

export default Login;
