import {Button, Box, InputAdornment, TextField } from "@mui/material";
import { Form } from "react-router";
import style from './Login.module.css'
import { AccountCircle, CalendarToday, Email, Password } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import axios from "axios";

import { Link } from 'react-router';



export default function Login() {
  const {register,handleSubmit} = useForm();

  const LoginUser = async (values) =>{
    const response = await axios.post(`https://mytshop.runasp.net/api/Account/Login`,values);
    localStorage.setItem("userToken",response.data.token);
    console.log(response);
  }
  return (

    <Box component={Form} 
    className={style.formC}
    onSubmit={handleSubmit(LoginUser)}
>
       

           <TextField
           {...register('email')}
          label="user email"
          type="email"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <Email/>
              </InputAdornment>,
            },
          }}
        />

           <TextField
           {...register('password')}
          label="user password"
         type="password"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <Password/>
              </InputAdornment>,
            },
          }}
        />

        

        <Button variant="outlined" type="submit" >Login </Button>
        
   </Box>
  )
}
